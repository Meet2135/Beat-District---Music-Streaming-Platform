const mongoose = require("mongoose");

const songSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
    album: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    src: {
      type: String,
      required: true,
    },
    albumPhoto: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Song", songSchema); 