const { Router } = require("express");
const {
  postOrdersHanlders,
  getOrdersHandlers,
  getOrderHandlers,
  putOrderHandlers,
  deleteOrderHandlers,
} = require("../handlers/ordersHandlers");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { roleMiddleware } = require("../middlewares/roleMiddleware");

const ordersRouter = Router();

ordersRouter.post("/", authMiddleware, postOrdersHanlders);
ordersRouter.get(
  "/",
  authMiddleware,
  roleMiddleware(["sysadmin", "admin"]),
  getOrdersHandlers
);
ordersRouter.get("/:id", authMiddleware, getOrderHandlers);
ordersRouter.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["sysadmin", "admin"]),
  putOrderHandlers
);
ordersRouter.delete("/:id", authMiddleware, deleteOrderHandlers);
module.exports = ordersRouter;
