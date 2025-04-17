const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
});

const getCreateUserResponse = (user) => {
  return getUser(user);
};

const getLoginUserResponse = (user) => {
  return getUser(user);
}

const getUserResponse = (user) => {
  return getUser(user);
}

const getUpdateUserResponse = (user) => {
  return getUser(user);
};

const getUser = (user) => {
  return {
    email: user.email,
    username: user.username,
    bio: user.bio || null,
    image: user.image || null,
    token: getAccessToken(user),
  };
};

const getAccessToken = (user) => {
  const accessToken = jwt.sign(
    {
      user: {
        id: user._id,
        email: user.email,
      },
    },
    JWT_SECRET,
    { expiresIn: 60 * 60 * 24 }
  );
  return accessToken;
};

module.exports = {
  User: mongoose.model("User", userSchema),
  getCreateUserResponse,
  getLoginUserResponse,
  getUserResponse,
  getUpdateUserResponse,
}
