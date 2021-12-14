const mongoose = require("mongoose");

const hintSchema = new mongoose.Schema({
  hint: {
    type: String,
  },
  views: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Hints", hintSchema);
