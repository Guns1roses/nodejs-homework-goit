const express = require("express");

const { cntrWrapper } = require("../../helpers");

const { auth, validation } = require("../../midlwares");
const cntr = require("../../controlers/auth");
const { joiRegisterSchema, joiLoginSchema } = require("../../models/user");

const router = express.Router();

router.post(
  "/signup",
  validation(joiRegisterSchema),
  cntrWrapper(cntr.register)
);
router.post("/login", validation(joiLoginSchema), cntrWrapper(cntr.login));
router.get("/logout", auth, cntrWrapper(cntr.logout));

module.exports = router;