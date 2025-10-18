const { Router } = require("express");
const {
  postFavoritesHandler,
  getFavoritesHandler,
  deleteFavoritesHandler,
} = require("../handlers/favoritesHandlers");
const { authMiddleware } = require("../middlewares/authMiddleware");

const favoritesRouter = Router();

favoritesRouter.post("/:id", authMiddleware, postFavoritesHandler);
favoritesRouter.get("/", authMiddleware, getFavoritesHandler);
favoritesRouter.delete("/:id", authMiddleware, deleteFavoritesHandler);
module.exports = favoritesRouter;
