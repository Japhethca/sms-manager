export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Message', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    from: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    to: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    text: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    ownerNumber: {
      type: Sequelize.STRING,
      allowNull: true,
      onDelete: 'CASCADE',
      references: {
        model: 'Contact',
        key: 'phoneNumber',
      },
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  }),
  down: queryInterface => queryInterface.dropTable('Message'),
};
