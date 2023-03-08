const { User } = require("../../models");
const { RequestError, sendEmail } = require("../../helpers");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(404, "Not Found");
  }
  if (user.verify) {
    throw RequestError(400, "Verification has already been passed");
  }
  const mail = {
    to: email,
    subject: "Підтвердження email",
    html: `<a href = "http://localhost:3000/api/users/verify/:${user.verificationToken}" target="_blank">Підтвердити email</>`,
  };
  await sendEmail(mail);
  res.status(200).json({
    status: "success",
    cod: 200,
    data: {
      message: "Verification email sent",
    },
  });
};

module.exports = resendVerifyEmail;