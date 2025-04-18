const { User, getProfileResponse } = require("../common/users.model");

const getProfile = async (req, res) => {
  const { username } = req.params;
  const profile = await User.findOne({ username });
  if (!profile) {
    return res.status(404).json({ error: "Profile not found" });
  }

  const currentUser = req.user.isAuthenticated ? await User.findById(req.user.id) : null;

  return res.status(200).json({ profile: getProfileResponse(profile, currentUser) });
};

const followUser = async (req, res) => {
  const currentUser = req.user;
  const { username } = req.params;

  const targetUser = await User.findOne({ username });
  if (!targetUser) {
    return res.status(404).json({ error: "User not found" });
  }

  if (targetUser._id.toString() === currentUser.id) {
    return res.status(422).json({ error: "You cannot follow yourself" });
  }

  await User.findByIdAndUpdate(currentUser.id, {
    $addToSet: { following: targetUser._id },
  });

  await User.findByIdAndUpdate(targetUser._id, {
    $addToSet: { followers: currentUser.id },
  });

  return res.status(200).json({ profile: { ...getProfileResponse(targetUser, currentUser), following: true } });
};

const unfollowUser = async (req, res) => {
  const currentUser = req.user;
  const { username } = req.params;

  const targetUser = await User.findOne({ username });
  if (!targetUser) {
    return res.status(404).json({ error: "User not found" });
  }

  if (targetUser._id.toString() === currentUser.id) {
    return res.status(422).json({ error: "You cannot unfollow yourself" });
  }

  await User.findByIdAndUpdate(currentUser.id, {
    $pull: { following: targetUser._id },
  });

  await User.findByIdAndUpdate(targetUser._id, {
    $pull: { followers: currentUser.id },
  });

  return res.status(200).json({ profile: { ...getProfileResponse(targetUser, currentUser), following: false } });
};

module.exports = {
  getProfile,
  followUser,
  unfollowUser,
};
