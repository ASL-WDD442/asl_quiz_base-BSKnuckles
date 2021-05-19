module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Choices', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      value: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.ENUM('correct', 'incorrect'),
      },
      questionId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Questions',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface) => queryInterface.dropTable('Choices'),
};
