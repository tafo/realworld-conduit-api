const express = require('express');

const public = require('../../middlewares/public.middleware');
const auth = require('../../middlewares/auth.middleware');
const { getProfile, followUser, unfollowUser } = require('./profiles.controller');

const profilesRouter = express.Router();

profilesRouter.get('/:username', public, getProfile);
profilesRouter.post('/:username/follow', auth, followUser);
profilesRouter.delete('/:username/follow', auth, unfollowUser);

module.exports = profilesRouter;