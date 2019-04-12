export default {
  up: queryInterface => queryInterface.bulkInsert('Contact', [
    {
      name: 'John',
      phoneNumber: '00111',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Ada',
      phoneNumber: '00222',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Wendy',
      phoneNumber: '00333',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),

  down: queryInterface => queryInterface.bulkDelete('Contact', null, {}),
};
