const Song = require("../models/songModel");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");
const path = require("path");

const songController = {
  addSong: async (req, res) => {
    try {
      const { title, artist, album, year, duration } = req.body;
      const songFile = req.files.song[0];
      const albumPhoto = req.files.albumPhoto[0];

      // Upload song file
      const songUploadResponse = await cloudinary.uploader.upload(songFile.path, {
        resource_type: "video",
        folder: "songs",
      });

      // Upload album photo
      const photoUploadResponse = await cloudinary.uploader.upload(albumPhoto.path, {
        folder: "album_photos",
        resource_type: "image",
      });

      const newSong = await Song.create({
        title,
        artist,
        album,
        year,
        duration,
        src: songUploadResponse.secure_url,
        albumPhoto: photoUploadResponse.secure_url,
      });

      // Clean up temporary files
      fs.unlinkSync(songFile.path);
      fs.unlinkSync(albumPhoto.path);

      res.status(201).json({
        success: true,
        message: "Song added successfully",
        data: newSong,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error adding song",
        error: error.message,
      });
    }
  },

  updateSong: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, artist, album, year, duration } = req.body;
      const songFile = req.files?.song?.[0];
      const albumPhoto = req.files?.albumPhoto?.[0];

      const song = await Song.findById(id);
      if (!song) {
        return res.status(404).json({
          success: false,
          message: "Song not found",
        });
      }

      let updateData = {
        title,
        artist,
        album,
        year,
        duration,
      };

      // Update song file if provided
      if (songFile) {
        const songUploadResponse = await cloudinary.uploader.upload(songFile.path, {
          resource_type: "video",
          folder: "songs",
        });
        updateData.src = songUploadResponse.secure_url;
        fs.unlinkSync(songFile.path);
      }

      // Update album photo if provided
      if (albumPhoto) {
        const photoUploadResponse = await cloudinary.uploader.upload(albumPhoto.path, {
          folder: "album_photos",
          resource_type: "image",
        });
        updateData.albumPhoto = photoUploadResponse.secure_url;
        fs.unlinkSync(albumPhoto.path);
      }

      const updatedSong = await Song.findByIdAndUpdate(id, updateData, { new: true });

      res.status(200).json({
        success: true,
        message: "Song updated successfully",
        data: updatedSong,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error updating song",
        error: error.message,
      });
    }
  },

  deleteSong: async (req, res) => {
    try {
      const { id } = req.params;
      const song = await Song.findById(id);

      if (!song) {
        return res.status(404).json({
          success: false,
          message: "Song not found",
        });
      }

      // Delete song file from Cloudinary
      const songPublicId = song.src.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`songs/${songPublicId}`, {
        resource_type: "video",
      });

      // Delete album photo from Cloudinary
      const photoPublicId = song.albumPhoto.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`album_photos/${photoPublicId}`, {
        resource_type: "image",
      });

      await Song.findByIdAndDelete(id);

      res.status(200).json({
        success: true,
        message: "Song deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error deleting song",
        error: error.message,
      });
    }
  },

  getAllSongs: async (req, res) => {
    try {
      const songs = await Song.find().sort({ createdAt: -1 });
      res.status(200).json({
        success: true,
        data: songs,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching songs",
        error: error.message,
      });
    }
  },

  getSongById: async (req, res) => {
    try {
      const { id } = req.params;
      const song = await Song.findById(id);

      if (!song) {
        return res.status(404).json({
          success: false,
          message: "Song not found",
        });
      }

      res.status(200).json({
        success: true,
        data: song,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching song",
        error: error.message,
      });
    }
  },
};

module.exports = songController; 