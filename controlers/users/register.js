const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const { User } = require("../../models");
const { RequestError, sendEmail } = require("../../helpers");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }
  
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();
  

  const result = await User.create({
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });
  const mail = {
    to: email,
    subject: "Підтвердження email",
    html: `<a href = "http://localhost:3000/api/users/verify/:${verificationToken}" target="_blank">Підтвердити email</>`,
  };
  await sendEmail(mail);
  res.status(201).json({
    status: "success",
    cod: 201,
    data: {
      user: {
        email: result.email,
        subscription: result.subscription,
        avatar: result.avatarURL,
        verificationToken: result.verificationToken,
      },
    },
  });
};

module.exports = register;