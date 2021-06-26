const fs = require("fs").promises;
const { getPath } = require("../db");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(getPath, "contacts.json");

const getList = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    throw error;
  }
};
const getContactById = async (id) => {
  const convertId = Number(id);
  try {
    const contacts = await getList();
    const findContact = await contacts.find((item) => item.id === convertId);

    if (!findContact) {
      throw new Error("Id incorrect");
    }
    return findContact;
  } catch (error) {
    error.message = "Contacts not found";
    throw error;
  }
};

const addContact = async (name, email, phone) => {
  const newContact = { name, email, phone, id: v4() };
  try {
    const contacts = await getList();
    const newContacts = [...contacts, newContact];
    const str = JSON.stringify(newContacts);

    return await fs.writeFile(contactsPath, str);
  } catch (error) {
    throw error;
  }
};
const removeContact = async (id) => {
  const convertId = Number(id);
  try {
    const contacts = await getList();
    const filtredContacts = contacts.filter((item) => item.id !== convertId);
    const str = JSON.stringify(filtredContacts);
    return await fs.writeFile(contactsPath, str);
  } catch (error) {
    throw error;
  }
};

module.exports = { getList, getContactById, addContact, removeContact };
