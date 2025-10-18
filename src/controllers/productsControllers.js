const { Producto, Categoria, sequelize } = require("../models");

const postProducts = async ({
  nombre,
  descripcion,
  precio,
  categoria,
  imagen,
  disponible,
}) => {
  // 1. Validaciones obligatorias
  if (!nombre || !precio || disponible === undefined) {
    throw new Error("Los campos nombre, precio y disponible son obligatorios.");
  }

  if (typeof disponible !== "boolean") {
    throw new Error("El campo disponible debe ser true o false.");
  }

  if (isNaN(precio) || Number(precio) <= 0) {
    throw new Error("El precio debe ser un número mayor a 0.");
  }

  // 2. Chequear si ya existe un producto con ese nombre (case insensitive)
  const existeProducto = await Producto.findOne({
    where: { nombre: nombre.trim() },
  });

  if (existeProducto) {
    throw new Error("Ya existe un producto con ese nombre.");
  }

  // 3. Manejar la categoría
  let categoriaDB = null;
  if (categoria) {
    const nombreCategoria = categoria.trim().toLowerCase();
    categoriaDB = await Categoria.findOne({
      where: sequelize.where(
        sequelize.fn("lower", sequelize.col("nombre")),
        nombreCategoria
      ),
    });

    if (!categoriaDB) {
      categoriaDB = await Categoria.create({
        nombre: categoria.trim(),
      });
    }
  }

  // 4. Crear producto
  const nuevoProducto = await Producto.create({
    nombre: nombre.trim(),
    descripcion: descripcion || null,
    precio: parseFloat(precio),
    disponible,
    imagen: imagen || null,
    categoriaId: categoriaDB ? categoriaDB.id : null,
    //categoriaId: categoriaDB.id,
  });

  return nuevoProducto;
};

const getProducts = async () => {
  // Traemos los productos tal cual están en la tabla
  const productos = await Producto.findAll({
    attributes: [
      "id",
      "nombre",
      "descripcion",
      "imagen",
      "precio",
      "disponible",
      "categoriaId",
    ],
  });

  // Verificamos si no hay productos
  if (!productos || productos.length === 0) {
    return [];
  }

  // Convertimos a JSON simple (opcional)
  return productos.map((prod) => ({
    id: prod.id,
    nombre: prod.nombre,
    descripcion: prod.descripcion,
    imagen: prod.imagen,
    precio: prod.precio,
    disponible: prod.disponible,
    categoriaId: prod.categoriaId, // se mantiene tal cual en la tabla
  }));
};

const putProducts = async (id, campos) => {
  // 1. Verificar existencia del producto
  const producto = await Producto.findByPk(id);
  if (!producto) throw new Error("Producto no encontrado");

  // 2. Validaciones de campos enviados
  if (campos.nombre !== undefined) {
    if (typeof campos.nombre !== "string" || !campos.nombre.trim()) {
      throw new Error("El nombre debe ser un texto válido");
    }
  }

  if (campos.descripcion !== undefined) {
    if (typeof campos.descripcion !== "string" || !campos.descripcion.trim()) {
      throw new Error("La descripción debe ser un texto válido");
    }
  }

  if (campos.precio !== undefined) {
    if (isNaN(campos.precio) || Number(campos.precio) <= 0) {
      throw new Error("El precio debe ser un número mayor a 0");
    }
  }

  if (campos.disponible !== undefined) {
    if (typeof campos.disponible !== "boolean") {
      throw new Error("Disponible debe ser true o false");
    }
  }

  if (campos.imagen !== undefined) {
    if (typeof campos.imagen !== "string" || !campos.imagen.trim()) {
      throw new Error("La URL de la imagen debe ser un string válido");
    }
  }

  // 3. Manejo de categoría
  if (campos.categoria !== undefined) {
    let categoriaDB = await Categoria.findOne({
      where: { nombre: campos.categoria },
    });

    if (!categoriaDB) {
      // Si no existe, la creo
      categoriaDB = await Categoria.create({ nombre: campos.categoria });
    }

    // Asigno el id de la categoría al producto
    campos.categoriaId = categoriaDB.id;
    delete campos.categoria; // eliminamos el campo original para evitar conflicto
  }

  // 4. Actualizar producto solo con los campos enviados
  await producto.update(campos);

  return producto;
};

const deleteProducts = async (id) => {
  //verifico si existe el producto
  const producto = await Producto.findByPk(id);
  if (!producto) throw new Error("Producto no encontrado");

  // 2. Borrar el producto

  const categoriaId = producto.categoriaId;

  await producto.destroy();
  const productosRestantes = await Producto.count({
    where: { categoriaId },
  });

  if (productosRestantes === 0) {
    await Categoria.destroy({ where: { id: categoriaId } });
    //Eliminamos la categoria si no existen mas productos con esa misma
  }

  return `Producto con id ${id} eliminado correctamente`;
};
module.exports = { postProducts, getProducts, putProducts, deleteProducts };
