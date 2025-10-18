const { Orden, Producto, Usuario } = require("../models");

const postOrders = async (usuario_id, productos) => {
  // 1. Calcular el total
  let total = 0;
  for (const item of productos) {
    const producto = await Producto.findByPk(item.id);
    if (!producto) throw new Error(`Producto con id ${item.id} no existe`);
    total += producto.precio * item.cantidad;
  }

  // 2. Crear la orden
  const orden = await Orden.create({
    usuario_id,
    total,
    estado: "pendiente",
  });

  // 3. Asociar productos
  for (const item of productos) {
    const producto = await Producto.findByPk(item.id);
    await orden.addProducto(producto, {
      through: { cantidad: item.cantidad, precio: producto.precio },
    });
  }

  // 4. Buscar la orden con productos (filtrando atributos)
  const ordenConProductos = await Orden.findByPk(orden.id, {
    attributes: ["id", "fecha", "estado", "total", "usuario_id"],
    include: [
      {
        model: Producto,
        attributes: ["id", "nombre", "precio"], // solo estas columnas
        through: {
          attributes: ["cantidad", "precio"], // recuperamos para transformarlo
        },
      },
    ],
  });

  // 5. Transformar la respuesta
  const ordenFinal = {
    ...ordenConProductos.toJSON(),
    Productos: ordenConProductos.Productos.map((prod) => ({
      id: prod.id,
      nombre: prod.nombre,
      precio: prod.precio,
      OrdenProducto: {
        cantidad: prod.OrdenProducto.cantidad,
        subtotal: prod.OrdenProducto.cantidad * prod.precio, // calculamos subtotal
      },
    })),
  };

  return ordenFinal;
};

const getOrders = async () => {
  const orders = await Orden.findAll({
    attributes: ["id", "fecha", "estado", "total"],
    include: [
      {
        model: Usuario,
        attributes: ["id", "nombre", "email"], // solo datos del usuario necesarios
      },
      {
        model: Producto,
        attributes: ["id", "nombre", "precio"], // unitarios
        through: {
          attributes: ["cantidad", "precio"], // precio guardado en OrdenProducto (unitario)
        },
      },
    ],
  });

  // Transformar salida
  const result = orders.map((orden) => ({
    id: orden.id,
    fecha: orden.fecha,
    estado: orden.estado,
    total: orden.total,
    usuario: {
      id: orden.Usuario.id,
      nombre: orden.Usuario.nombre,
      email: orden.Usuario.email,
    },
    productos: orden.Productos.map((prod) => ({
      id: prod.id,
      nombre: prod.nombre,
      precio: prod.precio, // unitario
      cantidad: prod.OrdenProducto.cantidad,
      subtotal: prod.OrdenProducto.cantidad * prod.precio, // cantidad * precio unitario
    })),
  }));

  return result;
};

const getOrder = async (id) => {
  const orders = await Orden.findAll({
    where: { usuario_id: id }, // filtra solo las del usuario
    attributes: ["id", "fecha", "estado", "total"],
    include: [
      {
        model: Usuario,
        attributes: ["id", "nombre", "email"], // datos básicos del usuario
      },
      {
        model: Producto,
        attributes: ["id", "nombre", "precio"], // precio unitario
        through: {
          attributes: ["cantidad", "precio"], // cantidad y precio en OrdenProducto
        },
      },
    ],
  });

  // Si no tiene órdenes, devolvemos array vacío
  if (!orders.length) return [];

  // Transformamos salida
  const result = orders.map((orden) => ({
    id: orden.id,
    fecha: orden.fecha,
    estado: orden.estado,
    total: orden.total,
    usuario: {
      id: orden.Usuario.id,
      nombre: orden.Usuario.nombre,
      email: orden.Usuario.email,
    },
    productos: orden.Productos.map((prod) => ({
      id: prod.id,
      nombre: prod.nombre,
      precio: prod.precio, // precio unitario
      cantidad: prod.OrdenProducto.cantidad,
      subtotal: prod.OrdenProducto.cantidad * prod.precio, // cantidad * precio unitario
    })),
  }));

  return result;
};

const putOrder = async (id, estadoBoolean) => {
  // 1. Buscar la orden
  const orden = await Orden.findByPk(id);
  if (!orden) throw new Error(`La orden con id ${id} no existe`);

  // 2. Convertir boolean a estado
  let nuevoEstado;
  if (estadoBoolean === true) {
    nuevoEstado = "aceptado";
  } else if (estadoBoolean === false) {
    nuevoEstado = "cancelado";
  } else {
    throw new Error("El estado debe ser true o false");
  }

  // 3. Actualizar orden
  orden.estado = nuevoEstado;
  await orden.save();

  // 4. Buscar orden con relaciones
  const ordenActualizada = await Orden.findByPk(id, {
    attributes: ["id", "fecha", "estado", "total"],
    include: [
      {
        model: Usuario,
        attributes: ["id", "nombre", "email"],
      },
      {
        model: Producto,
        attributes: ["id", "nombre", "precio"],
        through: {
          attributes: ["cantidad", "precio"],
        },
      },
    ],
  });

  // 5. Transformar respuesta
  const result = {
    id: ordenActualizada.id,
    fecha: ordenActualizada.fecha,
    estado: ordenActualizada.estado,
    total: ordenActualizada.total,
    usuario: {
      id: ordenActualizada.Usuario.id,
      nombre: ordenActualizada.Usuario.nombre,
      email: ordenActualizada.Usuario.email,
    },
    productos: ordenActualizada.Productos.map((prod) => ({
      id: prod.id,
      nombre: prod.nombre,
      precio: prod.precio,
      cantidad: prod.OrdenProducto.cantidad,
      subtotal: prod.OrdenProducto.cantidad * prod.precio,
    })),
  };

  return result;
};

const deleteOrder = async (id) => {
  // 1. Buscar la orden
  const orden = await Orden.findByPk(id);
  if (!orden) {
    throw new Error(`La orden con id ${id} no existe`);
  }

  // 2. Eliminar la orden
  await orden.destroy();

  // 3. Retornar mensaje de éxito
  return `La orden con id ${id} fue eliminada correctamente`;
};

module.exports = { postOrders, getOrders, getOrder, putOrder, deleteOrder };
