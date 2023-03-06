const { Conflict } = require("http-errors");
const { User } = require("../../models");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");

const register = async (req, res) => {
  console.log(req.body);
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(` Email ${email} in use`);
  }
  const avatarURL = gravatar.url(email, { s: 250 });
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const result = await User.create({
    email,
    password: hashPassword,
    subscription,
    avatarURL,
  });
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      user: {
        email,
        subscription: "starter",
        avatarURL,
      },
    },
  });
};

module.exports = register;