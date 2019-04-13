import * as ContactManager from '../../db/managers/contactsManager';
import {
  errorResponse,
  jsonResponse,
  serverError,
  checkNumber,
} from '../helpers';


export async function createContact(req, res) {
  const { name, phoneNumber } = req.body;
  const number = await ContactManager.getContactByPhoneNumber(phoneNumber);

  if (number) {
    return errorResponse(res, 409, `Contact with '${phoneNumber}' phone number already exists`);
  }

  try {
    const contact = await ContactManager.createNewContact({ name, phoneNumber });
    return jsonResponse(res, 201, contact);
  } catch (error) {
    return errorResponse(res, 400, 'Bad request data');
  }
}

export async function getContacts(req, res) {
  try {
    const contacts = await ContactManager.getAllContacts();
    return res.status(200).json({ status: 'success', data: contacts });
  } catch (error) {
    return serverError(res);
  }
}

export async function getContact(req, res) {
  const { phoneNumber } = req.params;
  await checkNumber(phoneNumber, res);

  try {
    const contact = await ContactManager.getContactByPhoneNumber(phoneNumber);
    return jsonResponse(res, 200, contact);
  } catch (err) {
    return serverError(res);
  }
}

export async function deleteContact(req, res) {
  const { phoneNumber } = req.params;
  await checkNumber(phoneNumber, res);

  try {
    await ContactManager.removeContact(phoneNumber);
    return jsonResponse(res, 200, null, 'Contact deleted successfully');
  } catch (err) {
    return serverError(res);
  }
}
