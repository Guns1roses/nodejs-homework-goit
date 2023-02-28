const express = require("express");

const { cntrWrapper } = require("../../helpers");

const controlers = require("../../controlers/contacts");
const { auth, validation } = require("../../midlwares");
const { contactAddSchema, validateSchema } = require("../../models/contact");

const router = express.Router();

router.get("/", auth, cntrWrapper(controlers.listContacts));

router.get("/:contactId", cntrWrapper(controlers.getContactById));

router.post(
  "/",
  auth,
  validation(contactAddSchema),
  cntrWrapper(controlers.addContact)
);

router.delete("/:contactId", cntrWrapper(controlers.removeContact));

router.put(
  "/:contactId",
  validation(contactAddSchema),
  cntrWrapper(controlers.updateContact)
);

router.patch(
  "/:contactId/favorite",
  validation(validateSchema),
  cntrWrapper(controlers.updateFavorite)
);

module.exports = router;
