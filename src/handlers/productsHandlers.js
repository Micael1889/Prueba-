const {
  postProducts,
  getProducts,
  putProducts,
  deleteProducts,
} = require("../controllers/productsControllers");

const postProductsHandlers = async (req, res) => {
  try {
    const { nombre, descripcion, precio, categoria, imagen, disponible } =
      req.body;
    const respuesta = await postProducts({
      nombre,
      descripcion,
      precio,
      categoria,
      imagen,
      disponible,
    });
    res.status(200).send(respuesta);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getProductsHandlers = async (req, res) => {
  try {
    const productos = await getProducts();
    res.status(200).send(productos);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const putProductsHandlers = async (req, res) => {
  try {
    const { id } = req.params;
    const campos = req.body;
    const productoActualizado = await putProducts(id, campos);
    res.status(200).json(productoActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteProductsHandlers = async (req, res) => {
  try {
    const { id } = req.params;

    const productoBorrado = await deleteProducts(id);
    res.status(200).json(productoBorrado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  postProductsHandlers,
  getProductsHandlers,
  putProductsHandlers,
  deleteProductsHandlers,
};
