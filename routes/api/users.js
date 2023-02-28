const express = require("express");

const { cntrWrapper } = require("../../helpers");
const { auth } = require("../../midlwares");
const users = require("../../controlers/users");

const router = express.Router();

// router.get("/current", auth, cntrWrapper(users.getCurrent));

module.exports = router;