const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require("path");
const fs = require("fs");
const cloudinary = require("./config/cloudinary");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(
  fileUpload({
    createParentPath: true,
  })
);

// Create upload directories if they don't exist
const uploadDirs = ["uploads/songs"];
uploadDirs.forEach((dir) => {
  const dirPath = path.join(__dirname, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
});

// Serve static files
app.use("/uploads/songs", express.static(path.join(__dirname, "uploads/songs")));

// Routes
app.use("/api/songs", require("./routes/songRoutes"));

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/beat-district")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 