module.exports = (sequelize, DataTypes) => {
  const caixa = sequelize.define(
    "caixas",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false,
      },
      name: DataTypes.STRING(32),
      description: DataTypes.TEXT,
      price: DataTypes.REAL,
    },
    {
      underscored: true,
      paranoid: true,
      timestamps: false,
    }
  );
  caixa.associate = function (models) {
    caixa.hasMany(models.userCaixas, {
     foreignKey: 'id_caixa',
     as:"assinantes"
    });
 }
  return caixa;
};
