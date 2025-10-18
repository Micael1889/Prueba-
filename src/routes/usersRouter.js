const { Router } = require("express");
const {
  postUserHandlers,
  getUserHandlers,
  getUsersHandlers,
  putUserHandlers,
  deleteUserHandler,
  googleUsersHandler,
} = require("../handlers/usersHandlers");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { roleMiddleware } = require("../middlewares/roleMiddleware");

const usersRouter = Router();

usersRouter.post("/login", getUserHandlers);
usersRouter.post("/signup", postUserHandlers);
usersRouter.get(
  "/",
  authMiddleware,
  roleMiddleware(["sysadmin", "admin"]),
  getUsersHandlers
);
usersRouter.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["sysadmin", "admin"]),
  putUserHandlers
);
usersRouter.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["sysadmin", "admin"]),
  deleteUserHandler
);
//usersRouter.post("/google-login", googleUsersHandlers);

module.exports = usersRouter;
