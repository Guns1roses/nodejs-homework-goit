const express = require("express");
const { ctrlWrapper } = require("../../helpers");
const { users: ctrl } = require("../../controlers");
const { validation, auth, upload } = require("../../middlwares");
const { joiUserSchema, verifyEmailSchema } = require("../../models/user");

const router = express.Router();

router.post("/register", validation(joiUserSchema), ctrlWrapper(ctrl.register));

router.post("/login", validation(joiUserSchema), ctrlWrapper(ctrl.login));

router.get("/verify/:verificationToken",  ctrlWrapper(ctrl.verifyEmail))

router.post("/verify",  validation(verifyEmailSchema), ctrlWrapper(ctrl.resendVerifyEmail))

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.get("/logout", auth, ctrlWrapper(ctrl.logout));

router.patch("/", auth, ctrlWrapper(ctrl.updateStatusSubscription));

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;