import * as MessageManager from '../../db/managers/messagesManger';
import { SENT, UNREAD } from '../../utils/constants';

import {
  errorResponse,
  jsonResponse,
  serverError,
  checkMessage,
  checkNumber,
} from '../helpers';


export async function getContactMessages(req, res) {
  const { phoneNumber } = req.params;
  await checkNumber(phoneNumber, res);
  try {
    const messages = await MessageManager.getMessagesByPhoneNumber(phoneNumber);
    return jsonResponse(res, 200, messages);
  } catch (err) {
    console.log(err);

    return serverError(res);
  }
}

export async function sendMessage(req, res) {
  const { from, to, text } = req.body;
  await checkNumber(from, res);
  await checkNumber(to, res);

  try {
    const senderMessage = await MessageManager.sendMesage(from, to, text, SENT, from);
    // save receivers message
    await MessageManager.sendMesage(from, to, text, UNREAD, to);
    return jsonResponse(res, 201, senderMessage, 'Message Sent');
  } catch (err) {
    return errorResponse(res, 400, 'Message not sent');
  }
}

export async function getMessage(req, res) {
  const { messageId } = req.params;
  try {
    await checkMessage(messageId, res);
    const message = await MessageManager.getMessage(messageId);
    return jsonResponse(res, 200, message);
  } catch (err) {
    return serverError(res);
  }
}

export async function updateMessage(req, res) {
  const { messageId } = req.params;

  try {
    await checkMessage(messageId, res);
    const message = MessageManager.udpateMessage(messageId, req.body);
    return jsonResponse(res, 201, message, 'Message updated successfully');
  } catch (err) {
    return serverError(res);
  }
}

export async function deleteMessage(req, res) {
  const { messageId } = req.params;

  try {
    await checkMessage(messageId, res);
    await MessageManager.removeMessage(messageId);
    return jsonResponse(res, 200, null, 'Message successfully deleted');
  } catch (err) {
    return serverError(res);
  }
}
