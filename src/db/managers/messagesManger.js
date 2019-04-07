import db from '../models';

const { Message } = db;

export async function getAllMessagesFrom(phoneNumber) {
  const messages = await Message.findAll({ where: { from: phoneNumber } });
  return messages;
}

export async function getAllMessagesTo(PhoneNumber) {
  const messages = await Message.findAll({ where: { to: PhoneNumber } });
  return messages;
}

export async function getMessagesByPhoneNumber(ownerNumber) {
  const messages = await Message.findAll({ where: { ownerNumber } });
  return messages;
}

export async function sendMesage(from, to, text, status, ownerNumber) {
  const message = await Message.create({
    from, to, text, status, ownerNumber,
  });
  return message;
}

export async function getMessage(messageId) {
  const message = await Message.findByPk(messageId);
  return message;
}

export async function udpateMessage(messageId, fields) {
  const message = await Message.update(fields, {
    where: {
      id: messageId,
    },
  });
  return message;
}

export async function removeMessage(messageId) {
  await Message.destroy({ where: { id: messageId } });
}
