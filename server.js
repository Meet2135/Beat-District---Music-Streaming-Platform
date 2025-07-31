/**
 * BEAT-DISTRICT Music Streaming Application
 * Copyright (c) 2024 Meet2135
 * All rights reserved.
 */

const express = require("express");
const app = express();
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
const path = require("path");
const cors = require("cors");

// Add CORS middleware with more permissive settings for development
app.use(cors({
  origin: "*", // Allow all origins in development
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// Ensure proper body parsing with error handling
app.use(express.json({ 
  limit: '10mb',
  verify: (req, res, buf) => {
    try {
      JSON.parse(buf);
    } catch (e) {
      console.error('JSON Parse Error:', {
        error: e.message,
        body: buf.toString()
      });
      res.status(400).json({ 
        message: "Invalid JSON payload", 
        success: false,
        error: e.message
      });
      throw new Error("Invalid JSON");
    }
  }
}));

app.use(express.urlencoded({ 
  extended: true, 
  limit: '10mb' 
}));

// Add request body debugging middleware
app.use((req, res, next) => {
  console.log('Incoming Request:', {
    method: req.method,
    url: req.url,
    headers: req.headers,
    body: req.body
  });
  next();
});

const userRoute = require("./routes/userRoute");
const songsRoute = require("./routes/songsRoute");
const adminRoute = require("./routes/adminRoute");

// Mount routes
app.use("/api/users", userRoute);
app.use("/api/songs", songsRoute);
app.use("/api/admin", adminRoute);

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    message: "Route not found", 
    success: false 
  });
});

// Error handling middleware (should be last)
app.use((err, req, res, next) => {
  console.error('Error:', {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method
  });

  // Handle specific error types
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: "Validation error",
      success: false,
      errors: err.errors
    });
  }

  if (err.name === 'MongoError') {
    return res.status(500).json({
      message: "Database error",
      success: false
    });
  }

  // Default error
  res.status(500).json({ 
    message: "Internal server error",
    success: false,
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(port, () => {
  console.log(`Node js server started at port ${port}!`);
  console.log('MongoDB URL:', process.env.MONGO_URL);
});
