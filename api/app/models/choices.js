module.exports = (sequelize, DataTypes) => {
  const Choices = sequelize.define('Choices', {
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
    value: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [2, 50],
          msg: 'Choice value is required.',
        },
      },
    },
    type: {
      type: DataTypes.ENUM('correct', 'incorrect'),
      validate: {
        isIn: {
          args: [['correct', 'incorrect']],
          msg: 'Choice must be either correct or incorrect.',
        },
      },
    },
    questionId: {
      type: DataTypes.UUID,
      onDelete: 'CASCADE',
      references: {
        model: 'Questions',
        key: 'id',
      },
      validate: {
        isUUID: {
          args: 4,
          msg: 'Question ID is not valid. Please try again.',
        },
      },
    },
  }, {});
  Choices.associate = (models) => {
    Choices.belongsTo(models.Questions, { foreignKey: 'questionId' });
  };
  return Choices;
};
