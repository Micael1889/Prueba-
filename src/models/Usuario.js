const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Usuario",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nombre: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      apellido: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
      telefono: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: true,
      },
      contrasena: {
        type: DataTypes.TEXT,
        allowNull: true, // null si se registra con Google
      },
      rol: {
        type: DataTypes.ENUM("cliente", "admin", "sysadmin"),
        allowNull: false,
        defaultValue: "cliente",
      },
      googleId: {
        type: DataTypes.STRING, // ID único que Google da al usuario
        allowNull: true,
        unique: true,
      },
      fotoPerfil: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "usuarios",
    }
  );
};
