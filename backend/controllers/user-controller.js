const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET_KEY = 'MyKey';

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists. Login instead.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found. Signup please.' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid Email / Password.' });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET_KEY, { expiresIn: '1h' });

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000, 
    });

    return res.status(200).json({ message: 'Successfully Logged in.', user, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

const updateProfile = async (req, res, next) => {
  const userId = req.id;
  const { name, email, birthDate, country } = req.body;

  try {
    const updateFields = {
      name,
      email,
    };

    if (birthDate) {
      updateFields.birthDate = birthDate;
    }

    if (country) {
      updateFields.country = country;
    }

    const user = await User.findByIdAndUpdate(
      userId,
      updateFields,
      { new: true }
    );

    return res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const getUser = async (req, res, next) => {
  const userId = req.id;
  let user;

  try {
    user = await User.findById(userId, "-password");
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json({ user });
};

const verifyToken = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(404).json({ message: "No token found" });
  }
  const token = authorizationHeader.split(' ')[1];

  if (!token) {
    return res.status(404).json({ message: "No token found" });
  }

  jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(400).json({ message: "Invalid token" });
    }

    req.id = user.id;
    next();
  });
};


module.exports = {
  signup,
  login,
  updateProfile,
  getUser,
  verifyToken,
};
