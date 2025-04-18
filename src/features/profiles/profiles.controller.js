const { User, getProfileResponse } = require("../common/users.model");

const getProfile = async (req, res) => {
  const { username } = req.params;
  const profile = await User.findOne({ username });
  if (!profile) {
    return res.status(404).json({ error: "Profile not found" });
  }

  const currentUser = await User.findById(req.user.id);

  return res.status(200).json({ profile: getProfileResponse(profile, currentUser) });
};

module.exports = {
  getProfile,
};