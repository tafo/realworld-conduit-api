const express = require("express");

const { createUser } = require("./users.controller");

const usersRouter = express.Router();

usersRouter.post("/", createUser);

module.exports = usersRouter;
