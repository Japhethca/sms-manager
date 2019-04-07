export default (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {});

  Contact.associate = (db) => {
    db.Contact.hasMany(db.Message, {
      onDelete: 'CASCADE',
      as: 'messages',
      foreignKey: 'ownerNumber',
      sourceKey: 'phoneNumber',
    });
  };
  return Contact;
};
