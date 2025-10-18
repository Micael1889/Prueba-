const { Router } = require("express");
const {
  postOffersHandler,
  deleteOfferHandler,
  getOffersHandler,
} = require("../handlers/offersHandlers");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { roleMiddleware } = require("../middlewares/roleMiddleware");
const offersRouter = Router();

offersRouter.post(
  "/",
  authMiddleware,
  roleMiddleware(["sysadmin", "admin"]),
  postOffersHandler
);
offersRouter.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["sysadmin", "admin"]),
  deleteOfferHandler
);
offersRouter.get("/", getOffersHandler);
module.exports = offersRouter;
