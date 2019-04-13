import { expect } from 'chai';
import sinon from 'sinon';
import joi from 'joi';

import * as contactManager from '../../src/db/managers/contactsManager';
import * as messageManager from '../../src/db/managers/messagesManager';
import validator from '../../src/routes/validator';
import {
  checkMessage,
  checkNumber,
  errorResponse,
  jsonResponse,
  serverError,
} from '../../src/routes/helpers';

const resMock = {
  status: sinon.fake.returns({
    json: sinon.fake(data => data),
  }),
};

describe('Helpers', () => {
  describe('jsonResponse', () => {
    it('should return success response in json', () => {
      const result = jsonResponse(
        resMock,
        200,
        null,
        'response successful',
      );
      expect(result.status).to.equal('success');
      expect(result.message).to.equal('response successful');
    });
  });

  describe('errorResponse', () => {
    it('should return error response in json', () => {
      const result = errorResponse(
        resMock,
        400,
        'something went wrong',
      );
      expect(result.status).to.equal('error');
      expect(result.message).to.equal('something went wrong');
    });
  });

  describe('serverError', () => {
    it('should return error response in json', () => {
      const result = serverError(
        resMock,
      );
      expect(result.status).to.equal('error');
      expect(result.message).to.equal('There was an internal server errror');
    });
  });

  describe('checkNumber', () => {
    it('should check if number exists', async () => {
      const phoneNumber = '0011';
      sinon.replace(contactManager, 'getContactByPhoneNumber', async number => number);
      const validNumber = await checkNumber(
        phoneNumber,
        resMock,
      );
      expect(validNumber).to.equal(phoneNumber);
    });
  });

  describe('checkMessage', () => {
    it('should check if message exists', async () => {
      const messageId = 2;
      sinon.replace(messageManager, 'getMessage', async message => message);
      const validMessage = await checkMessage(
        messageId,
        resMock,
      );
      expect(validMessage).to.equal(messageId);
    });
  });
});

describe('Validator', () => {
  it('should validate request fields', () => {
    const req = {
      body: {
        from: 'raad',
        to: 'toad',
      },
    };
    const validatorMiddleware = validator({
      body: {
        from: joi.number().required(),
        to: joi.number().required(),
      },
    });
    const hasError = validatorMiddleware(req, resMock);
    expect(hasError).to.be.equal(true);
  });
});
