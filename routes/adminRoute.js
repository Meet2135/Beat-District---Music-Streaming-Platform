const express = require("express");
const router = express.Router();
const multer = require("multer");
const authMiddleware = require("../middlewares/authMiddleware");
const cloudinary = require("../cloudinary");
const Song = require("../models/songModel");

// Configure Multer to store files in memory
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'file') {
      if (!file.mimetype.startsWith('audio/')) {
        return cb(new Error('Please upload an audio file'));
      }
    } else if (file.fieldname === 'albumPhoto') {
      if (!file.mimetype.startsWith('image/')) {
        return cb(new Error('Please upload an image file'));
      }
    }
    cb(null, true);
  }
}).fields([
  { name: 'file', maxCount: 1 },
  { name: 'albumPhoto', maxCount: 1 }
]);

// Helper function to upload file to Cloudinary
const uploadToCloudinary = async (file, options) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    uploadStream.end(file.buffer);
  });
};

// Route to get all songs
router.get("/get-all-songs", async (req, res) => {
  try {
    const songs = await Song.find().sort({ createdAt: -1 });
    res.status(200).send({
      message: "Songs fetched successfully",
      success: true,
      data: songs,
    });
  } catch (error) {
    console.error("Error fetching songs:", error);
    res.status(500).send({
      message: "Error fetching songs",
      success: false,
      error: error.message,
    });
  }
});

// Route to add a new song
router.post("/add-song", authMiddleware, upload, async (req, res) => {
  try {
    console.log("Request received:", {
      body: req.body,
      files: req.files ? Object.keys(req.files) : 'No files'
    });

    // Validate required fields
    if (!req.body.title || !req.body.artist || !req.body.album || !req.body.duration || !req.body.year) {
      return res.status(400).send({
        message: "Please provide all required fields: title, artist, album, duration, and year",
        success: false
      });
    }

    if (!req.files || !req.files.file || !req.files.albumPhoto) {
      return res.status(400).send({
        message: "Both song file and album photo are required",
        success: false
      });
    }

    let songUrl = null;
    let albumPhotoUrl = null;

    try {
      // Upload song file
      console.log("Uploading song file to Cloudinary...");
      const songResult = await uploadToCloudinary(req.files.file[0], {
        folder: "MUSICA",
        resource_type: "raw",
      });
      console.log("Song file uploaded successfully:", songResult.url);
      songUrl = songResult.url;

      // Upload album photo
      console.log("Uploading album photo to Cloudinary...");
      const photoResult = await uploadToCloudinary(req.files.albumPhoto[0], {
        folder: "MUSICA/ALBUM_PHOTOS",
      });
      console.log("Album photo uploaded successfully:", photoResult.url);
      albumPhotoUrl = photoResult.url;

      // Create and save new song
      const newsong = new Song({
        title: req.body.title,
        artist: req.body.artist,
        src: songUrl,
        album: req.body.album,
        duration: req.body.duration,
        year: req.body.year,
        albumPhoto: albumPhotoUrl,
      });

      await newsong.save();
      const allSongs = await Song.find().sort({ createdAt: -1 });
      
      res.status(200).send({
        message: "Song added successfully",
        success: true,
        data: allSongs,
      });
    } catch (error) {
      console.error("Error during upload or save:", error);
      return res.status(500).send({
        message: "Error during upload or save: " + error.message,
        success: false
      });
    }
  } catch (error) {
    console.error("Error in add-song route:", error);
    res.status(500).send({
      message: "Server error: " + error.message,
      success: false
    });
  }
});

// Route to edit an existing song
router.post("/edit-song", authMiddleware, upload, async (req, res) => {
  try {
    console.log("Request received:", {
      body: req.body,
      files: req.files ? Object.keys(req.files) : 'No files'
    });

    // Validate required fields
    if (!req.body.title || !req.body.artist || !req.body.album || !req.body.duration || !req.body.year) {
      return res.status(400).send({
        message: "Please provide all required fields: title, artist, album, duration, and year",
        success: false
      });
    }

    let songUrl = null;
    let albumPhotoUrl = null;

    try {
      // Upload song file if provided
      if (req.files && req.files.file && req.files.file[0]) {
        console.log("Uploading song file to Cloudinary...");
        const songResult = await uploadToCloudinary(req.files.file[0], {
          folder: "MUSICA",
          resource_type: "raw",
        });
        console.log("Song file uploaded successfully:", songResult.url);
        songUrl = songResult.url;
      }

      // Upload album photo if provided
      if (req.files && req.files.albumPhoto && req.files.albumPhoto[0]) {
        console.log("Uploading album photo to Cloudinary...");
        const photoResult = await uploadToCloudinary(req.files.albumPhoto[0], {
          folder: "MUSICA/ALBUM_PHOTOS",
        });
        console.log("Album photo uploaded successfully:", photoResult.url);
        albumPhotoUrl = photoResult.url;
      }

      // Get existing song to preserve album photo if not updated
      const existingSong = await Song.findById(req.body._id);
      if (!existingSong) {
        return res.status(404).send({
          message: "Song not found",
          success: false
        });
      }

      // Prepare update data
      const updateData = {
        title: req.body.title,
        artist: req.body.artist,
        album: req.body.album,
        duration: req.body.duration,
        year: req.body.year,
      };

      if (songUrl) updateData.src = songUrl;
      if (albumPhotoUrl) {
        updateData.albumPhoto = albumPhotoUrl;
      } else {
        updateData.albumPhoto = existingSong.albumPhoto;
      }

      // Update song
      const updatedSong = await Song.findByIdAndUpdate(
        req.body._id,
        updateData,
        { new: true }
      );
      
      const allSongs = await Song.find().sort({ createdAt: -1 });
      
      res.status(200).send({
        message: "Song edited successfully",
        success: true,
        data: allSongs,
      });
    } catch (error) {
      console.error("Error during upload or update:", error);
      return res.status(500).send({
        message: "Error during upload or update: " + error.message,
        success: false
      });
    }
  } catch (error) {
    console.error("Error in edit-song route:", error);
    res.status(500).send({
      message: "Server error: " + error.message,
      success: false
    });
  }
});

module.exports = router;
