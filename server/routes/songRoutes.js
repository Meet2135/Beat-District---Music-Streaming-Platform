const express = require("express");
const router = express.Router();
const songController = require("../controllers/songController");
const multer = require("multer");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
  },
  fileFilter: function (req, file, cb) {
    if (file.fieldname === "song") {
      if (!file.mimetype.startsWith("audio/")) {
        return cb(new Error("Only audio files are allowed for songs"));
      }
    } else if (file.fieldname === "albumPhoto") {
      if (!file.mimetype.startsWith("image/")) {
        return cb(new Error("Only image files are allowed for album photos"));
      }
    }
    cb(null, true);
  },
});

// Routes
router.post(
  "/add",
  upload.fields([
    { name: "song", maxCount: 1 },
    { name: "albumPhoto", maxCount: 1 },
  ]),
  songController.addSong
);

router.put(
  "/update/:id",
  upload.fields([
    { name: "song", maxCount: 1 },
    { name: "albumPhoto", maxCount: 1 },
  ]),
  songController.updateSong
);

router.delete("/delete/:id", songController.deleteSong);
router.get("/get-all", songController.getAllSongs);
router.get("/get/:id", songController.getSongById);

module.exports = router; 