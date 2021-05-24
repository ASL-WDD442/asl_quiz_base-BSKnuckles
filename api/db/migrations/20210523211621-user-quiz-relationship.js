module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('Quizzes', 'userId', {
      type: Sequelize.UUID,
      references: {
        model: 'Users',
        key: 'id',
      },
    });
  },

  down: async (queryInterface) => {
    queryInterface.removeColumn('Quizzes', 'userId');
  },
};
