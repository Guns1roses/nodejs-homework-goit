const express = require("express");
const router = express.Router();
const { validation, auth } = require("../../middlwares");
const { joiSchema, joiSchemaForFavorite } = require("../../models/contact");
const { contacts: ctrl } = require("../../controlers");
const {ctrlWrapper} = require("../../helpers");



const validateMiddleware = validation(joiSchema);

router.get("/", auth, ctrlWrapper(ctrl.getAllContacts));

router.get("/:contactId", auth, ctrlWrapper(ctrl.getContactById));

router.post("/", auth, validateMiddleware, ctrlWrapper(ctrl.addContact));

router.delete("/:contactId", auth, ctrlWrapper(ctrl.removeById));

router.put("/:contactId", auth, validateMiddleware, ctrlWrapper(ctrl.updateContact));

router.patch(
  "/:contactId/favorite",  auth,
  validation(joiSchemaForFavorite),
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
