const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

const secretKey = process.env.JWT_SECRET || 'defaultSecretKey';

// Middleware to ensure user is authenticated
function ensureAuthenticated(req, res, next) {
  const token = req.cookies.authToken;
  if (token) {
    try {
      const user = jwt.verify(token, secretKey);
      req.user = user; // Attach user info to request
      return next();
    } catch (err) {
      console.error('Invalid or expired token:', err);
    }
  }
  res.redirect('/auth/login');
}

// Render pages
router.get('/register', (req, res) => res.render('register'));
router.get('/login', (req, res) => res.render('login'));

// Handle User Registration
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).render('error', {
        message: 'User already exists',
        error: 'Please choose a different username',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const role = username.toLowerCase() === 'admin' ? 'admin' : 'user';

    const newUser = new User({ username, password: hashedPassword, role });
    await newUser.save();
    res.redirect('/auth/login');
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).render('error', {
      message: 'Failed to register user',
      error: err.message,
    });
  }
});

// Handle User Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { id: user._id, username: user.username, role: user.role },
        secretKey,
        { expiresIn: '1h' }
      );
      res.cookie('authToken', token, { httpOnly: true });
      return res.redirect('/');
    } else {
      res.status(401).render('error', { message: 'Invalid username or password' });
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).render('error', { message: 'An error occurred during login' });
  }
});

// Logout route
router.post('/logout', (req, res) => {
  res.clearCookie('authToken');
  res.redirect('/auth/login');
});

module.exports = router;
