import { expect } from 'chai';

import db from '../../mocks/db';
import {
  getMessage,
  getAllMessagesFrom,
  getAllMessagesTo,
  getMessagesByPhoneNumber,
  removeMessage,
  sendMesage,
} from '../../../src/db/managers/messagesManager';


describe('Contact Managers', () => {
  describe('getMessage', () => {
    it('should return message by id', async () => {
      const messageId = 1;
      const message = await getMessage(messageId);
      expect(message.from).to.equal('110001');
      expect(message.text).to.equal('Yo man! xup?');
      expect(db.Message.findByPk.calledOnce).to.equal(true);
      expect(db.Message.findByPk.calledWith(messageId)).to.equal(true);
    });
  });

  describe('getAllMessagesFrom', () => {
    it('should return all messages sent by phone number', async () => {
      const phoneNumber = 1;
      const messages = await getAllMessagesFrom(phoneNumber);
      expect(messages).to.have.lengthOf(3);
      expect(db.Message.findAll.calledOnce).to.equal(true);
      expect(db.Message.findAll.calledWith({ where: { from: phoneNumber } })).to.equal(true);
    });
  });

  describe('getAllMessagesTo', () => {
    it('should return all messages sent phone number', async () => {
      const phoneNumber = 1;
      const messages = await getAllMessagesTo(phoneNumber);
      expect(messages).to.have.lengthOf(3);
      expect(db.Message.findAll.calledWith({ where: { to: phoneNumber } })).to.equal(true);
    });
  });

  describe('getMessagesByPhoneNumber', () => {
    it('should return all messages belonging to a contact', async () => {
      const phoneNumber = 1;
      const messages = await getMessagesByPhoneNumber(phoneNumber);
      expect(messages).to.have.lengthOf(3);
      expect(db.Message.findAll.calledWith({ where: { ownerNumber: phoneNumber } })).to.equal(true);
    });
  });

  describe('removeMessage', () => {
    it('should return all messages belonging to a contact', async () => {
      const messageId = 1;
      await removeMessage(messageId);
      expect(db.Message.destroy.calledWith({ where: { id: messageId } })).to.equal(true);
    });
  });

  describe('sendMesage', () => {
    it('should return all messages belonging to a contact', async () => {
      const payload = {
        from: '0011', to: '1100', text: 'hello', status: 'SENT', ownerNumber: '0011',
      };
      const message = await sendMesage(...Object.values(payload));
      expect(db.Message.create.calledWith(payload)).to.equal(true);
      expect(message.text).to.equal('Yo man!?');
      expect(message.status).to.equal('SENT');
    });
  });
});
