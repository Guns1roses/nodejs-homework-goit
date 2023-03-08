const { Schema, model } = require("mongoose");
const Joi = require("joi");
const {handleSchemaValidationErrors} = require("../helpers")

const contactSchema = new Schema(
  {
    name: {
      type: String,
      unique: [true, 'Contact with this name already exists'],
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      unique: true,     
    },
    phone: {
      type: String,      
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleSchemaValidationErrors)

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.bool(),
});

const joiSchemaForFavorite = Joi.object({
  favorite: Joi.bool().required({ message: "missing field favorite" }),
});

const Contact = model("contact", contactSchema);

module.exports = { Contact, joiSchema, joiSchemaForFavorite };