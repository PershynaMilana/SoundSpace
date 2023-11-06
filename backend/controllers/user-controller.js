const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const JWT_SECRET_KEY =  'MyKey';

const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists! Login instead" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    return res.status(201).json({ message: user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      return res.status(400).json({ message: "User not found. Signup please" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid Email / Password' });
    }

    const token = jwt.sign({ id: existingUser._id }, JWT_SECRET_KEY, {
      expiresIn: "1h"
    });

    console.log("Generated Token\n", token);

    if (req.cookies[`${existingUser._id}`]) {
      req.cookies[`${existingUser._id}`] = "";
    }

    res.cookie(String(existingUser._id), token, {
      path: '/',
      expires: new Date(Date.now() + 1000 * 60 * 60),
      httpOnly: true,
      sameSite: 'lax'
    });

    return res.status(200).json({ message: 'Successfully Logged in', user: existingUser, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
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

const refreshToken = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(400).json({ message: "Couldn't find token" });
  }

  const prevToken = authorizationHeader.split(' ')[1];

  if (!prevToken) {
    return res.status(400).json({ message: "Couldn't find token" });
  }

  jwt.verify(prevToken, JWT_SECRET_KEY, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Authentication failed" });
    }

    res.clearCookie(`${user.id}`);
    req.cookies[`${user.id}`] = "";

    const token = jwt.sign({ id: user.id }, JWT_SECRET_KEY, {
      expiresIn: "1h"
    });

    console.log("Regenerated Token\n", token);

    res.cookie(String(user.id), token, {
      path: '/',
      expires: new Date(Date.now() + 1000 * 60 * 60),
      httpOnly: true,
      sameSite: 'lax'
    });

    req.id = user.id;
    next();
  });
};

const logout = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(400).json({ message: "Couldn't find token" });
  }

  const prevToken = authorizationHeader.split(' ')[1];

  if (!prevToken) {
    return res.status(400).json({ message: "Couldn't find token" });
  }

  jwt.verify(prevToken, JWT_SECRET_KEY, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Authentication failed" });
    }

    res.clearCookie(`${user.id}`);
    req.cookies[`${user.id}`] = "";
    return res.status(200).json({ message: "Successfully Logged Out" });
  });
};

const updateProfile = async (req, res, next) => {
  const userId = req.id;
  const { name, email } = req.body;

  try {
    const user = await User.findByIdAndUpdate(userId, { name, email }, { new: true });

    return res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateProfile = updateProfile;



exports.logout = logout;
exports.signup = signup;
exports.login = login;
exports.verifyToken = verifyToken;
exports.getUser = getUser;
exports.refreshToken = refreshToken;
