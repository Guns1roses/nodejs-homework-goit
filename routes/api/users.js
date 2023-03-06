const express = require("express");

const { cntrWrapper } = require("../../helpers");
const { auth, upload } = require("../../midlwares");
const users = require("../../controlers/users");

const router = express.Router();

router.get("/current", auth, cntrWrapper(users.getCurrent));
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  cntrWrapper(users.updateAvatar)
);
module.exports = router;