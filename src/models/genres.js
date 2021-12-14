const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: null,
  },
  genre: {
    type: String,
  },
  views: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Genre", genreSchema);
