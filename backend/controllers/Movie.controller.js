"use strict";
const axios = require("axios");

const Moviecast = require("../models/Movie.model")

const handleMovie = async (req, res) => {
  try {
    let movie_name = req.query.query;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIES_API_KEY}&query=${movie_name}`
    let axiosRes = await axios.get(url);
    let movieData = axiosRes.data;
    let cleanedData = movieData.results.map(item => {
      if (item.poster_path !== "null") {
        return new Moviecast(item.release_date, item.title, item.overview, item.vote_average, item.vote_count, item.poster_path);

      }
    })
    res.json(cleanedData);
  } catch (error) {
    res.send(error)

  }
}

module.exports = handleMovie;