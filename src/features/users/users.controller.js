const bcrypt = require("bcrypt");

const User = require("./users.model");
const { createUserValidator } = require("./users.validator");

// Example comments for an API endpoint
/// @desc    Create a new user
/// @route   POST /api/users
/// @access  Public
/// @returns {Object} - Created user object with token
/// @throws  400 - Bad Request if validation fails
/// @throws  409 - Conflict if user already exists
/// @throws  500 - Internal Server Error if user creation fails
/// @throws  201 - Created if user creation is successful
/// @required {Object} user - the user object
/// @required {string} user.username - The username of the user
/// @required {string} user.email - The email of the user
/// @required {string} user.password - The password of the user
const createUser = async (req, res) => {
  const { error, value } = createUserValidator.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { username, email, password } = value.user;

  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    return res.status(409).json({ error: "User already exists" });
  }

  const saltRounds = 10;
  const passwordHash = bcrypt.hashSync(password, saltRounds);
  const newUser = new User({ email, username, passwordHash });
  const createdUser = await User.create(newUser);

  if (!createdUser) {
    return res.status(500).json({ error: "User creation failed" });
  }

  return res.status(201).json({ user: createdUser.toUserResponse() });
};

module.exports = {
  createUser,
};
