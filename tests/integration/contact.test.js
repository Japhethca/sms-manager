import { expect } from 'chai';
import superTest from 'supertest';

import server from '../../src/server';

const request = superTest(server);

const contactsUrl = '/api/v1/contacts';

describe('POST /contacts', () => {
  it('should create new contact', async () => {
    const payload = { name: 'chidex', phoneNumber: '00155555513' };
    const res = await request.post(contactsUrl).send(payload);
    expect(res.body.status).to.be.equal('success');
    expect(res.body.data.name).to.be.equal(payload.name);
    expect(res.body.data.phoneNumber).to.be.equal(payload.phoneNumber);
  });
});

describe('GET /contacts/:phoneNumber', () => {
  it('should return a contact with phone number', async () => {
    const phoneNumber = '00155555513';
    const res = await request.get(`${contactsUrl}/${phoneNumber}`);
    expect(res.status).to.equal(200);
    expect(res.body.data.phoneNumber).to.be.equal(phoneNumber);
  });
});

describe('DELETE /contacts/:phoneNumber', () => {
  const newContactPayload = { name: 'Lovelace', phoneNumber: '01234567' };

  before(async () => {
    await request.post(contactsUrl).send(newContactPayload);
  });

  it('should delete a contact with phone number', async () => {
    const res = await request
      .delete(`${contactsUrl}/${newContactPayload.phoneNumber}`);
    expect(res.status).to.equal(200);
  });
});

describe('GET /contacts/:phoneNumber/messages', () => {
  it('should get messages for a contact', async () => {
    const phoneNumber = '00222';
    const res = await request
      .get(`${contactsUrl}/${phoneNumber}/messages`);
    expect(res.status).to.equal(200);
    expect(res.body.data[0].ownerNumber).to.equal(phoneNumber);
  });
});
