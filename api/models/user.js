module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "users",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false,
      },
      name: DataTypes.STRING(100),
      email: DataTypes.STRING(100),
      birth_date: DataTypes.DATE,
    },
    {
      paranoid: true,
      timestamps: false,
    }
  );
  user.associate = function (models) {
    user.hasMany(models.userCaixas, {
        foreignKey: 'id_user'
    });
}
  return user;
};
