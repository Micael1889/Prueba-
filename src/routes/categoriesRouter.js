const { Router } = require("express");
const {
  postCategoriesHandlers,
  getCategoriesHandlers,
  deleteCategoriesHandler,
} = require("../handlers/categoriesHandlers");
const categoriesRouter = Router();

categoriesRouter.post("/", postCategoriesHandlers);
categoriesRouter.get("/", getCategoriesHandlers);
categoriesRouter.delete("/:id", deleteCategoriesHandler);
module.exports = categoriesRouter;
