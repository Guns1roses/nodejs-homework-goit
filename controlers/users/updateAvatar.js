const Jimp = require("jimp");
const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");

const avatarDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  
  const { path: tmpUpload, originalname } = req.file;

  const resizeAvatar = await Jimp.read(tmpUpload);
  await resizeAvatar.resize(250, 250).write(tmpUpload);

  const { _id } = req.user;
  const extension = originalname.split(".").pop();
  const filename = `${_id}.${extension}`;

  try {
    const resultUploud = path.join(avatarDir, filename);
    await fs.rename(tmpUpload, resultUploud);
    
    const avatarURL = path.join("public", "avatars", filename);
    await User.findByIdAndUpdate(_id, { avatarURL });
    res.status(200).json({
      status: "success",
      cod: 200,
      data: {
        user: {
          avatarURL,
        },
      },
    });
  } catch (error) {
    await fs.unlink(tmpUpload);
    throw error;
  }
};

module.exports = updateAvatar;