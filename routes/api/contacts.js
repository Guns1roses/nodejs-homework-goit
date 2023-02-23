const express = require("express");


const { cntrWrapper } = require("../../helpers");

const controlers = require("../../controlers/contacts");

const router = express.Router();


router.get("/", cntrWrapper(controlers.listContacts));

router.get("/:contactId", cntrWrapper(controlers.getContactById));

router.post("/", cntrWrapper(controlers.addContact));

router.delete("/:contactId", cntrWrapper(controlers.removeContact));

router.put("/:contactId", cntrWrapper(controlers.updateContact));

router.patch("./:contactid/favorite", cntrWrapper(controlers.updateFavorite));


module.exports = router;
