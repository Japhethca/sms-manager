import db from '../models';

const { Contact, Message } = db;

export async function getAllContacts() {
  const contacts = await Contact.findAll();
  return contacts;
}

export async function createNewContact(contactInfo) {
  const { name, phoneNumber } = contactInfo;
  const contact = await Contact.create({ name, phoneNumber });
  return contact;
}

export async function getContactByPhoneNumber(phoneNumber) {
  const contact = await Contact.findOne({
    where: {
      phoneNumber,
    },
    include: {
      model: Message,
      as: 'messages',
    },
  });
  return contact;
}

export async function removeContact(phoneNumber) {
  await Contact.destroy({ where: { phoneNumber } });
}
