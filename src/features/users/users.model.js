const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

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

userSchema.methods.toUserResponse = () => {
  return {
    email: this.email,
    username: this.username,
    bio: this.bio,
    image: this.image,
    token: this.getAccessToken(),
  };
};

userSchema.methods.getAccessToken = () => {
  const accessToken = jwt.sign(
    {
      user: {
        id: this._id,
        email: this.email,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: 60 * 60 * 24 }
  );
  return accessToken;
};

module.exports = mongoose.model("User", userSchema);
