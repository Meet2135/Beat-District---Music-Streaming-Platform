const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const authMiddleWare = require("../middlewares/authMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/register", async (req, res) => {
  try {
    console.log('Register request body:', req.body);
    
    // Validate required fields
    if (!req.body.name || !req.body.email || !req.body.password) {
      return res.status(400).send({ 
        message: "Name, email, and password are required", 
        success: false 
      });
    }

    // Trim whitespace from inputs
    const name = req.body.name.trim();
    const email = req.body.email.trim();
    const password = req.body.password.trim();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send({
        message: "Invalid email format",
        success: false
      });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).send({
        message: "Password must be at least 6 characters long",
        success: false
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).send({ 
        message: "User already exists", 
        success: false 
      });
    }

    // Hash password
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);

    // Create new user
    const user = new User({
      name: name,
      email: email,
      password: hashedPassword
    });

    // Save user
    await user.save();
    
    return res.status(201).send({ 
      message: "User registered successfully", 
      success: true 
    });
      
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).send({ 
      message: "Error during registration. Please try again.", 
      success: false,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User does not exist", success: false });
    }
    const passwordsMatched = await bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (passwordsMatched) {
      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
        expiresIn: "1d",
      });
      return res.status(200).send({
        message: "User logged in successfully",
        success: true,
        data: token,
      });
    } else {
      return res
        .status(200)
        .send({ message: "Password is incorrect", success: false });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message, success: false });
  }
});

router.post("/get-user-data", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    user.password = undefined;
    return res.status(200).send({
      message: "User data fetched successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message, success: false });
  }
});

module.exports = router;
