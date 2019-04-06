export default (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    phoneNumber: {
      type: DataTypes.STRING,
    },
  }, {});

  Contact.associate = () => {
    // Associations goes here
  };
};
