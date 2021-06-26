const contacts = require("./contacts");
const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();
const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contactsList = await contacts.getList();
      console.table(contactsList);
      break;

    case "get":
      const contactId = await contacts.getContactById(id);
      console.log(contactId);
      break;

    case "add":
      await contacts.addContact(name, email, phone);
      console.log("done");
      break;

    case "remove":
      await contacts.removeContact(id);
  
      console.log("Done");
      console.table(await contacts.getList());
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
