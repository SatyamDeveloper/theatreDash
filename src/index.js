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

app.post('/upload/:id',async(req,res)=>{
    try {
        const {src,duration,title}=req.body
        const currVideo = await Player.findOne({_id:req.params.id})
        currVideo.playlist = currVideo.playlist.concat({
            src,duration,title
        })

        await currVideo.save()
        res.redirect('/')
    } catch (error) {
        console.log(error);
    }
})

app.post("/upload", async (req, res) => {
  try {
    const {
      src,
      duration,
      title,
      description,
      img,
      trailer,
      language,
      releaseDate,
      directors,
      actors,
      genres,
    } = req.body;

    const allDirectors = directors.split(",");
    const allActors = actors.split(",");
    const allGenres = genres.split(",");
    const year = new Date(releaseDate).getFullYear()

    const playerData = await new Player({
      src,
      duration,
      title,
      description,
      img,
      trailer,
      language,
      releaseDate,
      directors: allDirectors,
      actors: allActors,
      genres: allGenres,
    }).save();

    await new Video({
      _id: playerData._id,
      img,
      duration,
      title,
      details: `${allGenres[0]} • ${language} • ${year}`,
      releaseDate,
      uploadedDate: playerData.uploadedDate,
      genres: allGenres,
    }).save();

    allGenres.forEach(async (data) => {
      const genreExists = await Genres.findOne({ genre: data });

      if (!genreExists) {
        await new Genres({ genre: data }).save();
      }
    });

    const lowerTitle = title.toLowerCase();

    const hintExists = await Hints.findOne({ hint: lowerTitle });

    if (!hintExists) {
      await new Hints({ hint: lowerTitle }).save();
    }

    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, console.log(`http://localhost:${port}`));
