module.exports = (models) => {
  const { Producto, Orden, Usuario, OrdenProducto, Categoria } = models;

  Usuario.belongsToMany(Producto, {
    through: "Favoritos",
    foreignKey: "usuario_id",
  });
  Producto.belongsToMany(Usuario, {
    through: "Favoritos",
    foreignKey: "producto_id",
  });

  // Usuario -> Orden
  Usuario.hasMany(Orden, { foreignKey: "usuario_id" });
  Orden.belongsTo(Usuario, { foreignKey: "usuario_id" });

  // Orden -> Producto (muchos a muchos)
  Orden.belongsToMany(Producto, {
    through: OrdenProducto,
    foreignKey: "orden_id",
    onDelete: "CASCADE",
  });
  Producto.belongsToMany(Orden, {
    through: OrdenProducto,
    foreignKey: "producto_id",
  });

  Producto.belongsTo(Categoria, { foreignKey: "categoriaId" });
  Categoria.hasMany(Producto, { foreignKey: "categoriaId" });
};
