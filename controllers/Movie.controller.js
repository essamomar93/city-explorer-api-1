"use strict";
const axios = require("axios");
const Moviecast = require("../models/Movie.model")
const Cashe = require("../helper/Cache")

let cache = new Cache();

const handleMovie = async (req, res) => {

  const movie_name = req.query.query;

  const cityNameMovies = `movies-${movie_name}`;

  let urlMove = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIES_API_KEY}&query=${movie_name}`


  if (cache[cityNameMovies] !== undefined) {
    res.send(cache[cityNameMovies]);
  }
  else {


    let axiosRes = await axios.get(urlMove);
    let movieData = axiosRes.data;
    let cleanedData = movieData.results.map(item => {
      return new Moviecast(item.release_date, item.title, item.overview, item.vote_average, item.vote_count, item.poster_path);
    })
    res.status(200).json(cleanedMovie);

    cache[cityNameMovies] = cleanedMovie;
  }
}

module.exports = handleMovie;
