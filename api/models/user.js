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
      name: {
        allowNull: false,
        type:DataTypes.STRING(100),
      },
      email: {
        allowNull: false,
        type:DataTypes.STRING(100),
      },
      type: {
        allowNull: false,
        type:DataTypes.STRING(100),
      },
      birth_date: {
        allowNull: false,
        type:DataTypes.DATE,
      },
      password: {
        allowNull: false,
        type:DataTypes.STRING(100),
      },
      crated_at: {
        allowNull: false,
        type:DataTypes.DATE,
      },
      updated_at: {
        allowNull: false,
        type:DataTypes.DATE,
      },
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
