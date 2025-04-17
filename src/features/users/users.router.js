const express = require("express");

const { createUser, loginUser, getUser, updateUser } = require("./users.controller");
const auth = require("../../middlewares/auth.middleware");

const usersRouter = express.Router();

usersRouter.post("/users", createUser);
usersRouter.post("/users/login", loginUser);
usersRouter.get("/user", auth, getUser);
usersRouter.put("/user", auth, updateUser);

module.exports = usersRouter;
