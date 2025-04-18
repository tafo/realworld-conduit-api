const express = require('express');

const auth = require('../../middlewares/auth.middleware');
const { getProfile } = require('./profiles.controller');

const profilesRouter = express.Router();

profilesRouter.get('/:username', auth, getProfile);

module.exports = profilesRouter;