const express = require("express");

const controlers = require("../../controlers/contacts");

const router = express.Router();

router.get("/", controlers.listContacts);

router.get("/:contactId", controlers.getContactById);

router.post("/", controlers.addContact);

router.delete("/:contactId", controlers.removeContact);

router.put("/:contactId", controlers.updateContact);

module.exports = router;
