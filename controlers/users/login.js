const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { RequestError } = require("../../helpers");
const { User } = require("../../models");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const passCompare = bcrypt.compareSync(password, user.password);
  if (!user || !passCompare) {
    throw RequestError(401, "Email or password is wrong");
  }

  if (user.verify) {
    throw RequestError(400, "Email not varify");
  }

  const { SECRET_KEY } = process.env;
  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    status: "success",
    cod: 200,
    data: {
      token,
      user: {
        email: user.email,
        subscription: user.subscription,       
      },
    },
  });
};

module.exports = login;