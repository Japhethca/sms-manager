import { Router } from 'express';
import joi from 'joi';

import {
  createContact,
  getContacts,
  getContact,
  sendMessage,
  getContactMessages,
  updateMessage,
  deleteMessage,
  getMessage,
  deleteContact,
} from './controllers';
import validate from './validator';


const router = Router();

// contact routes
router.post(
  '/contacts',
  validate({
    body: {
      name: joi.string().optional(),
      phoneNumber: joi.number().required(),
    },
  }),
  createContact,
);

router.get(
  '/contacts/:phoneNumber',
  validate({
    params: {
      phoneNumber: joi.number().required(),
    },
  }),
  getContact,
);

router.delete(
  '/contacts/:phoneNumber',
  validate({
    params: {
      phoneNumber: joi.number().required(),
    },
  }),
  deleteContact,
);

router.get(
  '/contacts/:phoneNumber/messages',
  validate({
    params: {
      phoneNumber: joi.number().required(),
    },
  }),
  getContactMessages,
);

router.get(
  '/contacts/:phoneNumber/messages/:messageId',
  validate({
    params: {
      phoneNumber: joi.number().required(),
      messageId: joi.string().required(),
    },
  }),
  getContactMessages,
);

router.get('/contacts', getContacts);
// end contact routes

// message routes
router.post('/messages',
  validate({
    body: {
      from: joi.number().required(),
      to: joi.number().required(),
      text: joi.string().required(),
    },
  }),
  sendMessage);

router.get('/messages/:messageId',
  validate({
    params: {
      messageId: joi.number().required(),
    },
  }),
  getMessage);

router.put('/messages/:messageId',
  validate({
    params: {
      messageId: joi.number().required(),
    },
    body: {
      text: joi.string().required(),
      to: joi.number().required(),
    },
  }),
  updateMessage);

router.delete('/messages/:messageId',
  validate({
    params: {
      messageId: joi.number().required(),
    },
  }),
  deleteMessage);

// end message routes
export default router;
