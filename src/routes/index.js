const { Router } = require("express");
const usersRouter = require("./usersRouter");
const productsRouter = require("./productsRouter");
const categoriesRouter = require("./categoriesRouter");
const favoritesRouter = require("./favoritesRouter");
const offersRouter = require("./offersRouter");
const ordersRouter = require("./ordersRouter");
const router = Router();

router.use("/user", usersRouter);
router.use("/products", productsRouter);
router.use("/categories", categoriesRouter);
router.use("/favorites", favoritesRouter);
router.use("/offers", offersRouter);
router.use("/orders", ordersRouter);
module.exports = router;
