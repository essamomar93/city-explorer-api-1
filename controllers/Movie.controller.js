"use strict";
const axios = require("axios");
const Moviecast = require("../models/Movie.model")
const Cashe = require("../helper/Cache")

let cache = new Cache();

// const handleMovie = async (req, res) => {
//   try {
//     let movie_name = req.query.query;
//     let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIES_API_KEY}&query=${movie_name}`
//     let axiosRes = await axios.get(url);
//     let movieData = axiosRes.data;
//     let cleanedData = movieData.results.map(item => {

//       return new Moviecast(item.release_date, item.title, item.overview, item.vote_average, item.vote_count, item.poster_path);


//     })
//     res.json(cleanedData);
//   } catch (error) {
//     res.send(error)

//   }
// }
handleMovie.get("/data", (req, res) => {
  let currentDate = new Date()
  if (cache.data.length > 0 && cache.date.getDate() === currentDate.getDate()) {
    res.json({ "data": cache, "message": "data retrieved from the cache" });
  } else {
    // axios.get('https://jsonplaceholder.typicode.com/todos/')
    let axiosRes = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIES_API_KEY}&query=${movie_name}`)
    let movieData = axiosRes.data
    let cleanedData = movieData.results.map(item => {
      return new Moviecast(item.release_date, item.title, item.overview, item.vote_average, item.vote_count, item.poster_path)
    })
      .then(response => {
        cache.data = response.data;
        cache.date = currentDate;
        res.json({ "data": cache.data, "message": "data is coming from the api" });
      })
  }
})

module.exports = handleMovie;
