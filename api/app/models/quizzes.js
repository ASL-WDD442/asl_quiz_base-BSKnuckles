module.exports = (sequelize, DataTypes) => {
  const Quizzes = sequelize.define('Quizzes', {
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
    name: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [3, 50],
          msg: 'Quiz name must be at least 3 characters.',
        },
      },
    },
    type: {
      type: DataTypes.ENUM('public', 'private'),
      validate: {
        isIn: {
          args: [['public', 'private']],
          msg: 'Quiz must be public or private',
        },
      },
    },
  }, {});
  Quizzes.associate = (models) => {
    Quizzes.hasMany(models.Questions, { foreignKey: 'quizId' });
  };
  return Quizzes;
};
