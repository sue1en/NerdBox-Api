module.exports = (sequelize, DataTypes) => {
  const userCaixa = sequelize.define(
    "userCaixas",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false,
      },
      id_user: DataTypes.INTEGER,
      id_caixa: DataTypes.INTEGER,
    },
    {
      underscored: true,
      paranoid: true,
      timestamps: false,
    }
  );
  userCaixa.associate = function (models) {
    userCaixa.belongsTo(models.users, {
      foreignKey: "id_user",
    });
    userCaixa.belongsTo(models.caixas, {
      foreignKey: "id_caixa",
    });
  };
  return userCaixa;
};
