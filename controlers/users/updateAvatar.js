const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;

  const avatarDir = path.join(__dirname, "../public/avatars");

  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;

  const resultUpload = path.join(avatarDir, originalname);

  await Jimp.read(tempUpload)
    .then((lenna) => lenna.resize(250, 250).write(resultUpload))
    .catch((e) => console.log(e));

  await fs.unlink(tempUpload);

  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });
  res.json({
    avatarURL,
  });
};


module.exports = updateAvatar;