const { Producto, Usuario } = require("../models");
const postFavorites = async (usuario_id, producto_id) => {
  // 1. Verifico que el producto exista
  const producto = await Producto.findByPk(producto_id);
  if (!producto) throw new Error("Producto no encontrado");

  // 2. Verifico que el usuario exista
  const usuario = await Usuario.findByPk(usuario_id);
  if (!usuario) throw new Error("Usuario no encontrado");

  // 3. Chequeo si ya está en favoritos
  const yaExiste = await usuario.hasProducto(producto);
  if (yaExiste) throw new Error("El producto ya está en favoritos");

  // 4. Agrego el producto a favoritos
  await usuario.addProducto(producto);

  // 5. Devuelvo el producto agregado (o un mensaje si preferís)
  return producto;
};
const getFavorites = async (usuario_id) => {
  // 1. Verifico si el usuario existe y traigo sus productos favoritos
  const usuario = await Usuario.findByPk(usuario_id, {
    include: [
      {
        model: Producto,
        attributes: [
          "id",
          "nombre",
          "disponible",
          "descripcion",
          "precio",
          "imagen",
          "categoriaId",
        ],
        through: { attributes: [] }, // oculta los campos de la tabla intermedia "Favorito"
      },
    ],
  });

  if (!usuario) throw new Error("Usuario no encontrado");

  // 2. Valido si tiene favoritos
  if (!usuario.Productos || usuario.Productos.length === 0) {
    throw new Error("El usuario no tiene favoritos");
  }

  // 3. Devuelvo solo los productos favoritos
  return usuario.Productos;
};

const deleteFavorite = async (usuario_id, producto_id) => {
  // 1. Verifico que el producto exista
  const producto = await Producto.findByPk(producto_id);
  if (!producto) throw new Error("Producto no encontrado");

  // 2. Verifico que el usuario exista
  const usuario = await Usuario.findByPk(usuario_id);
  if (!usuario) throw new Error("Usuario no encontrado");

  // 3. Chequeo si realmente está en favoritos
  const yaExiste = await usuario.hasProducto(producto);
  if (!yaExiste) throw new Error("El producto no está en favoritos");

  // 4. Lo elimino de favoritos
  await usuario.removeProducto(producto);

  // 5. Devuelvo confirmación o el producto eliminado
  return {
    message: "Producto eliminado de favoritos correctamente",
    producto,
  };
};

module.exports = { postFavorites, getFavorites, deleteFavorite };
