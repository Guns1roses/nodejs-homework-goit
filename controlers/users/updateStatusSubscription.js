const { User } = require("../../models");

const updateStatusSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  const result = await User.findByIdAndUpdate(_id, { subscription });
  res.status(200).json({
    status: "success",
    cod: 200,
    data: {
      user: {
        email: result.email,
        subscription: subscription,
      },
    },
  });
};

module.exports = updateStatusSubscription;