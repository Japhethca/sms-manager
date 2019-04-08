import { expect } from 'chai';

import db from '../../mocks/db';
import {
  getAllContacts,
  createNewContact,
  getContactByPhoneNumber,
  removeContact,
} from '../../../src/db/managers/contactsManager';


describe('Contact Managers', () => {
  describe('getAllContacts', () => {
    it('should return all created contacts', async () => {
      const contacts = await getAllContacts();
      expect(contacts).to.have.lengthOf(2);
      expect(db.Contact.findAll.calledOnce).to.equal(true);
    });
  });

  describe('createNewContact', () => {
    it('should create new contact', async () => {
      const payload = { name: 'John', phoneNumber: '0011' };
      const contact = await createNewContact(payload);
      expect(contact.name).to.equal('John');
      expect(db.Contact.create.calledWith(payload)).to.equal(true);
      expect(db.Contact.create.calledOnce).to.equal(true);
    });
  });

  describe('getContactByPhoneNumber', () => {
    it('should return a contact that has a given phone number', async () => {
      const phoneNumber = '0011';
      const contact = await getContactByPhoneNumber(phoneNumber);
      expect(db.Contact.findOne.calledOnce).to.equal(true);
      expect(contact.phoneNumber).to.equal('00112');
      expect(contact.name).to.equal('Ada');
    });
  });

  describe('removeContact', () => {
    it('should delete contact from database', async () => {
      const phoneNumber = '00112';
      await removeContact(phoneNumber);
      expect(db.Contact.destroy.calledOnce).to.equal(true);
      expect(db.Contact.destroy.calledWith({ where: { phoneNumber } })).to.equal(true);
    });
  });
});
