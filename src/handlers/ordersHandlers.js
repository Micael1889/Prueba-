const {
  postOrders,
  getOrders,
  getOrder,
  putOrder,
  deleteOrder,
} = require("../controllers/ordersControllers");

const postOrdersHanlders = async (req, res) => {
  try {
    const { id } = req.user;
    const { productos } = req.body;
    const orders = await postOrders(id, productos);
    res.status(200).send(orders);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getOrdersHandlers = async (req, res) => {
  try {
    const orders = await getOrders();
    res.status(200).send(orders);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getOrderHandlers = async (req, res) => {
  try {
    const { id } = req.params;
    const orders = await getOrder(id);
    res.status(200).send(orders);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const putOrderHandlers = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;
    const order = await putOrder(id, estado);
    res.status(200).send(order);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteOrderHandlers = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await deleteOrder(id);
    res.status(200).send(order);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  postOrdersHanlders,
  getOrdersHandlers,
  getOrderHandlers,
  putOrderHandlers,
  deleteOrderHandlers,
};
