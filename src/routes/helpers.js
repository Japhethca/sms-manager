import { getContactByPhoneNumber, getMessage } from '../db/managers';

export function jsonResponse(res, status, data, message) {
  return res.status(status).json({
    status: 'success',
    message,
    data,
  });
}

export function errorResponse(res, status, message, errors) {
  return res.status(status).json({
    status: 'error',
    message,
    errors,
  });
}

export function serverError(res, status = 500) {
  return res.status(status).json({
    status: 'error',
    message: 'There was an internal server errror',
  });
}

export async function checkNumber(phoneNumber, res) {
  const validNumber = await getContactByPhoneNumber(phoneNumber);
  if (!validNumber) {
    errorResponse(res, 404, `${phoneNumber} number does not exist`);
    return null;
  }
  return validNumber;
}

export async function checkMessage(messageId, res) {
  const message = await getMessage(messageId);
  if (!message) {
    errorResponse(res, 404, `Message with ID ${messageId} does not exist`);
    return null;
  }
  return message;
}

export function notImplemented(req, res) {
  return errorResponse(res, 405, `${req.method.toUpperCase()} method is not implemented on this endpoint`);
}
