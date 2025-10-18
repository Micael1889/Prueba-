const { Router } = require("express");
const {
  postProductsHandlers,
  getProductsHandlers,
  putProductsHandlers,
  deleteProductsHandlers,
} = require("../handlers/productsHandlers");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { roleMiddleware } = require("../middlewares/roleMiddleware");
const productsRouter = Router();

productsRouter.post(
  "/",
  authMiddleware,
  roleMiddleware(["sysadmin", "admin"]),
  postProductsHandlers
);
productsRouter.get("/", getProductsHandlers);
productsRouter.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["sysadmin", "admin"]),
  putProductsHandlers
);
productsRouter.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["sysadmin", "admin"]),
  deleteProductsHandlers
);
module.exports = productsRouter;
