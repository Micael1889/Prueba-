const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Oferta",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      imagen: {
        type: DataTypes.STRING,
        // Guarda la URL o ruta de la imagen
        allowNull: true,
        unique: true,
      },
    },
    {
      tableName: "ofertas",
      timestamps: true, // Crea createdAt y updatedAt
    }
  );
};
