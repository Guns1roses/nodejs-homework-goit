const { Contact } = require("../../models");

const getAllContacts = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20, ...filter } = req.query;
  console.log(req.query);
  const skip = (page - 1) * limit;
  const result = await Contact.find(
    { owner: _id, ...filter },
    "-createdAt -updatedAt",
    { skip, limit: +limit }
  );
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getAllContacts;