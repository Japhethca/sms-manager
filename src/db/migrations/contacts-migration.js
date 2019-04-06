export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Contact', {
    firstName: {
      type: Sequelize.STRING,
    },
    lastName: {
      type: Sequelize.STRING,
    },
    phoneNumber: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  }),
  down: queryInterface => queryInterface.dropTable('Contact'),
};
