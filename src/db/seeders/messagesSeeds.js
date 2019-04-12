export default {
  up: queryInterface => queryInterface.bulkInsert('Message', [
    {
      from: '00222',
      to: '00111',
      status: 'SENT',
      text: 'hey man, how are you doing',
      ownerNumber: '00222',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      from: '00222',
      to: '00111',
      status: 'UNREAD',
      text: 'hey man, how are you doing',
      ownerNumber: '00111',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),

  down: queryInterface => queryInterface.bulkDelete('Message', null, {}),
};
