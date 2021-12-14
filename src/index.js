require("./db/conn");

const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const Player = require("./models/player");
const Video = require("./models/video");
const Genres = require("./models/genres");
const Hints = require("./models/hints");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", async (req, res) => {
  const currWebsite = await Video.find().sort({releaseDate:-1});
  res.json(currWebsite);
});

app.get('/player/:id',async (req,res)=>{
    const data = await Player.findOne({_id: req.params.id})
    res.json(data)
})

app.get('/player/video/:id',async(req,res)=>{
    const data = await Video.find()// exclud req.params.id || data that excludes the id
    res.json(data)
})

app.listen(port, console.log(`http://localhost:${port}`));
