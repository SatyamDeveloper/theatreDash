const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  _id:{
    type:String,
  },
  img: {
    type: String,
  },
  duration: {
    type: String,
    default: undefined,
  },
  title: {
    type: String,
  },
  details: {
    type: String,
  },
  releaseDate: {
    type: Date,
  },
  uploadedDate:{
    type: Date
  },
  genres: {
    type: Array,
  },
});

module.exports = mongoose.model("Video", videoSchema);
