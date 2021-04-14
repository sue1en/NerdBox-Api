"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(100),
      },
      type: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      birth_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      password: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      crated_at: {
        type: Sequelize.DATE,
        defaulValue: Sequelize.literal('NOW()')
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("users");
  },
};