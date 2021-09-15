"use strict";

const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const axios = require("axios");

const PORT = process.env.PORT || 8000;

require("dotenv").config();

// console.log(Forecast);
class Forecast {
  constructor(date, description) {
    this.date = date,
      this.description = description
  }
}

let handleWeather = async (req, res) => {
  try {
    let city_name = req.query.city;
    let lat = req.query.lat;
    let lon = req.query.lon;
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city_name}&key=${process.env.WEATHER_API_KEY}&Lat=${lat}&lon=${lon}`;
    let axiosRes = await axios.get(url);
    let weatherData = axiosRes.data;
    let cleanedData = weatherData.data.map(item => {
      return new Forecast(item.datetime, item.weather.description);
    })
    res.json(cleanedData);
  } catch (error) {
    res.send(error)

  }
}
app.get('/weather', handleWeather)

class Moviecast {
  constructor(date, title, overview, vote_average, vote_count, poster_path) {
    this.date = date,
      this.title = title,
      this.overview = overview,
      this.vote_average = vote_average,
      this.vote_count = vote_count,
      this.poster_path = poster_path

  }
}

let handleMovie = async (req, res) => {
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
app.get('/movie', handleMovie)

app.listen(PORT, () => {
  console.log("app.listen", PORT);
});


