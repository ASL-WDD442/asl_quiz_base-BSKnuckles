module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    id: {
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID,
      validate: {
        isUUID: {
          args: 4,
          msg: 'ID is not valid. Please try again.',
        },
      },
    },
    username: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'Username is already in use.',
      },
      allowNull: {
        args: false,
        msg: 'Username is required.',
      },
    },
    access_token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Name is required',
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM('google', 'regular'),
      validate: {
        isIn: {
          args: [['google', 'regular']],
          msg: 'User type must be google or regular',
        },
      },
    },
  }, {});

  Users.associate = (models) => {
    Users.hasMany(models.Quizzes, { foreignKey: 'userId' });
  };

  return Users;
};
