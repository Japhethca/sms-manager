import { Router } from 'express';
import joi from 'joi';

import {
  createContact,
  getContacts,
  getContact,
  sendMessage,
  getContactMessages,
  deleteMessage,
  getMessage,
  deleteContact,
} from './controllers';
import { notImplemented } from './helpers';
import validate from './validator';


const router = Router();

// contact routes
router
  .post(
    '/contacts',
    validate({
      body: {
        name: joi.string().optional(),
        phoneNumber: joi.number().required(),
      },
    }),
    createContact,
  )
  .get('/contacts', getContacts)
  .all('/contacts', notImplemented);

router
  .get(
    '/contacts/:phoneNumber',
    validate({
      params: {
        phoneNumber: joi.number().required(),
      },
    }),
    getContact,
  )
  .delete(
    '/contacts/:phoneNumber',
    validate({
      params: {
        phoneNumber: joi.number().required(),
      },
    }),
    deleteContact,
  )
  .all('/contacts/:phoneNumber', notImplemented);

router
  .get(
    '/contacts/:phoneNumber/messages',
    validate({
      params: {
        phoneNumber: joi.number().required(),
      },
    }),
    getContactMessages,
  )
  .all('/contacts/:phoneNumber/messages', notImplemented);
// end contact routes

// message routes
router
  .post('/messages',
    validate({
      body: {
        from: joi.number().required(),
        to: joi.number().required(),
        text: joi.string().required(),
      },
    }),
    sendMessage)
  .all('/messages', notImplemented);

router.get('/messages/:messageId',
  validate({
    params: {
      messageId: joi.number().required(),
    },
  }),
  getMessage)
  .delete('/messages/:messageId',
    validate({
      params: {
        messageId: joi.number().required(),
      },
    }),
    deleteMessage)
  .all('/messages/:messageId', notImplemented);
// end message routes

export default router;
