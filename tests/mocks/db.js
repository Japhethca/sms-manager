import sinon from 'sinon';

import db from '../../src/db/models';

export const contacts = [
  {
    name: 'John',
    phoneNumber: '0011',
    createdAt: '2019-04-08T03:13:07.022Z',
    updatedAt: '2019-04-08T03:13:07.022Z',
  },
  {
    name: 'Ada',
    phoneNumber: '00112',
    createdAt: '2019-04-08T03:13:07.022Z',
    updatedAt: '2019-04-08T03:13:07.022Z',
  },
];

const messages = [
  {
    id: 1,
    from: '11000',
    to: '110001',
    text: 'Yo man!?',
    status: 'SENT',
    ownerNumber: '11000',
    updatedAt: '2019-04-08T03:13:07.022Z',
    createdAt: '2019-04-08T03:13:07.022Z',
  },
  {
    id: 2,
    from: '110001',
    to: '110001',
    text: 'Yo man! xup?',
    status: 'UNREAD',
    ownerNumber: '11000',
    updatedAt: '2019-04-08T03:13:07.022Z',
    createdAt: '2019-04-08T03:13:07.022Z',
  },
  {
    id: 3,
    from: '110002',
    to: '11000',
    text: 'Yo man! xup? How are you doing?',
    status: 'READ',
    ownerNumber: '11000',
    updatedAt: '2019-04-08T03:13:07.022Z',
    createdAt: '2019-04-08T03:13:07.022Z',
  },
];

db.Contact = {
  create: sinon.fake.resolves(contacts[0]),
  findOne: sinon.fake.resolves(contacts[1]),
  findAll: sinon.fake.resolves(contacts),
  destroy: sinon.fake(),
};

db.Message = {
  findAll: sinon.fake.resolves(messages),
  create: sinon.fake.resolves(messages[0]),
  findByPk: sinon.fake.resolves(messages[1]),
  destroy: sinon.fake(),
};

export default db;
