const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  src: {
    type: String,
  },
  duration: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  img: {
    type: String,
  },
  trailer: {
    type: String,
  },
  language: {
    type: String,
  },
  releaseDate: {
    type: Date,
  },
  uploadedDate: {
    type: Date,
    default: Date.now,
  },
  directors: {
    type: Array,
  },
  actors: {
    type: Array,
  },
  genres: {
    type: Array,
  },
  playlist: [
    {
      src: {
        type: String,
      },
      title: {
        type: String,
      },
      duration: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("Player", playerSchema);
