const sequelize = require("../db").conn;

// Importar modelos
const Producto = require("./Producto")(sequelize);
const Orden = require("./Orden")(sequelize);
const Usuario = require("./Usuario")(sequelize);
const Categoria = require("./Categoria")(sequelize);
const associate = require("./associations");
const OrdenProducto = require("./OrdenProducto")(sequelize);
const Oferta = require("./Oferta")(sequelize);
//const Notificacion = require("./Notificacion")(sequelize);
//const Mesa = require("./Mesa")(sequelize);
//const HistorialPedido = require("./Historial_Pedido")(sequelize);
//const Favorito = require("./Favorito")(sequelize);
// Importar asociaciones y ejecutarlas
associate({
  Producto,
  Orden,
  OrdenProducto,
  Usuario,
  Categoria,
  Oferta,
  //Mesa,
  //Notificacion,
  //HistorialPedido,
  //Favorito,
});

module.exports = {
  sequelize,
  Producto,
  Orden,
  OrdenProducto,
  Usuario,
  Categoria,
  Oferta,
};
