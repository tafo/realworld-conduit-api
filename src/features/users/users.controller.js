const bcrypt = require("bcrypt");

const {User, getCreateUserResponse, getLoginUserResponse, getUserResponse} = require("./users.model");
const { getValidationErrorResponse, createUserValidator, loginUserValidator } = require("./users.validator");

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
    return res.status(422).json(getValidationErrorResponse(error));
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

  return res.status(201).json({ user: getCreateUserResponse(createdUser) });
};

const loginUser = async (req, res) => {
  const { error, value } = loginUserValidator.validate(req.body);
  if (error) {
    return res.status(422).json(getValidationErrorResponse(error));
  }

  const { email, password } = value.user;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const passwordMatch = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatch) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  return res.status(200).json({ user: getLoginUserResponse(user) });
}

const getUser = async (req, res) => {
  const {id, email} = req.user;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  return res.status(200).json({ user: getUserResponse(user) });
};


module.exports = {
  createUser,
  loginUser,
  getUser,
};
