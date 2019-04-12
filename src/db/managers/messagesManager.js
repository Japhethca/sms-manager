import db from '../models';

const { Message } = db;

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

export async function removeMessage(messageId) {
  await Message.destroy({ where: { id: messageId } });
}
