
const { getList } = require("./contacts");
const { getContactById } = require("./contacts");
const { addContact } = require("./contacts");
const {removeContact} = require("./contacts")

module.exports = {
  getList,
  getContactById,
  addContact,
  removeContact,
};
