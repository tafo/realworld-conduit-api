const express = require("express");
const cors = require("cors");

const usersRouter = require('./features/users/users.router');
const profilesRouter = require('./features/profiles/profiles.router');

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", usersRouter);
app.use("/api/profiles", profilesRouter);

module.exports = app;