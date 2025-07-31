const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const Song = require("../models/songModel");
const User = require("../models/userModel");

router.post("/get-all-songs", authMiddleware, async (req, res) => {
  try {
    const songs = await Song.find();
    res.status(200).send({
      message: "Songs fetched successfully",
      success: true,
      data: songs,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error fetching songs", success: false, data: error });
  }
});

router.post("/add-playlist", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    const existingPlaylists = user.playlists;

    // Fetch complete song data for each song in the playlist
    const songsWithCompleteData = await Promise.all(
      req.body.songs.map(async (song) => {
        if (typeof song === 'string') {
          // If song is just an ID, fetch the complete song data
          const completeSong = await Song.findById(song);
          return completeSong;
        }
        return song; // If song already has complete data
      })
    );

    existingPlaylists.push({
      name: req.body.name,
      songs: songsWithCompleteData,
    });

    const updatedUser = await User.findByIdAndUpdate(
      req.body.userId,
      {
        playlists: existingPlaylists,
      },
      { new: true }
    );

    res.status(200).send({
      message: "Playlist created successfully",
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error creating playlist:", error);
    res.status(500).send({
      message: "Error creating playlist",
      success: false,
      data: error,
    });
  }
});

router.post("/update-playlist", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    let existingPlaylists = user.playlists;

    // Fetch complete song data for each song in the playlist
    const songsWithCompleteData = await Promise.all(
      req.body.songs.map(async (song) => {
        if (typeof song === 'string') {
          // If song is just an ID, fetch the complete song data
          const completeSong = await Song.findById(song);
          return completeSong;
        }
        return song; // If song already has complete data
      })
    );

    existingPlaylists = existingPlaylists.map((playlist) => {
      if (playlist.name === req.body.name) {
        playlist.songs = songsWithCompleteData;
      }
      return playlist;
    });

    const updatedUser = await User.findByIdAndUpdate(
      req.body.userId,
      {
        playlists: existingPlaylists,
      },
      { new: true }
    );

    res.status(200).send({
      message: "Playlist updated successfully",
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating playlist:", error);
    res.status(500).send({
      message: "Error updating playlist",
      success: false,
      data: error,
    });
  }
});

router.post("/delete-playlist", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    let existingPlaylists = user.playlists;
    existingPlaylists = existingPlaylists.filter((playlist) => {
      if (playlist.name === req.body.name) {
        return false;
      }
      return true;
    });

    const updatedUser = await User.findByIdAndUpdate(
      req.body.userId,
      {
        playlists: existingPlaylists,
      },
      { new: true }
    );

    res.status(200).send({
      message: "Playlist deleted successfully",
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error deleting playlist:", error);
    res.status(500).send({
      message: "Error deleting playlist",
      success: false,
      data: error,
    });
  }
});

module.exports = router;
