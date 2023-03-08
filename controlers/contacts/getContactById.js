const { Contact } = require("../../models");
const { RequestError } = require("../../helpers");

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  const result = await Contact.findById(contactId, _id);
  if (!result) {
    throw RequestError(404, `Contact with ID = ${contactId} does not exist`);
  }
  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      result
    }});
    
};

module.exports = getContactById;