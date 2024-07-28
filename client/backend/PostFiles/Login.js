const express = require('express');
const router = express.Router();
const AdminModel = require('../Model/AdminModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const loginSecretKey = process.env.loginsecretKey; // Ensure your .env file has this variable

router.post('/login1', (req, res) => {
  const { username, password } = req.body;
  console.log(username) // Ensure both username and password are received

  AdminModel.findOne({ username })
    .then((user) => {
      if (!user) {
        console.log("usernot found")
        return res.status(404).json({ status: 'error', message: 'User not found' });
      }

      // Compare the password directly (not recommended for production)
      if (user.password !== password) {
        console.log("incorrect password")
        return res.status(401).json({ status: 'error', message: 'Incorrect password' });

      }

      // Generate a token
      const token = jwt.sign({ adminId: user._id }, loginSecretKey, { expiresIn: '1h' });

      // Return success response with token and user ID
      res.json({ status: 'success', token, adminId: user._id });
    })
    .catch((err) => {
      // Handle any errors that occur during the process
      console.error('Error during login:', err);
      res.status(500).json({ status: 'error', message: 'Server error. Please try again later.' });
    });
});

module.exports = router;
