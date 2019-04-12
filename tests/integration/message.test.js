import { expect } from 'chai';
import superTest from 'supertest';

import server from '../../src/server';

const request = superTest(server);

const messagesUrl = '/api/v1/messages';

describe('POST /messages', () => {
  it('should send a message', async () => {
    const payload = { from: '00333', to: '00111', text: 'yo man!' };
    const res = await request.post(messagesUrl).send(payload);
    expect(res.body.status).to.be.equal('success');
    expect(res.body.data.to).to.be.equal(payload.to);
    expect(res.body.data.from).to.be.equal(payload.from);
    expect(res.body.data.text).to.be.equal(payload.text);
  });
});

describe('GET /messages/:messageId', () => {
  it('should return a single message with message Id', async () => {
    const messageId = 1;
    const res = await request.get(`${messagesUrl}/${messageId}`);
    expect(res.status).to.equal(200);
    expect(res.body.data.id).to.be.equal(messageId);
  });
});

describe('DELETE /messages/:messageId', () => {
  const messagePayload = { from: '00333', to: '00111', text: 'yo man!' };
  let messageResponse;

  before(async () => {
    messageResponse = await request.post(messagesUrl).send(messagePayload);
  });

  it('should delete a message with message id', async () => {
    const { id } = messageResponse.body.data;
    const res = await request
      .delete(`${messagesUrl}/${id}`);
    expect(res.status).to.equal(200);
  });
});
