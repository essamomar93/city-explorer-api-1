"use strict";

const express = require("express");

require("dotenv").config();

const cors = require("cors");

const app = express();
app.use(cors());

const axios = require("axios");

const weatherData = require("./data/weather.json");
const PORT = process.env.PORT;

console.log(weatherData);
class Forecast {
  constructor(date, description) {
    this.date = date;
    this.description = description;

  }
}

let handleWeather = async (req, res) => {
  let city_name = req.query.city;
  let lat = req.query.lat;
  let lon = req.query.lon;
  let url = `https://api.weatherbit.io/v2.0/forecast/daily?city_name${city_name}&lat=${lat}&lon=${lon}&key=${process.env.WEATHERBIT_API_KEY}`;
  let axios = await axios.get(url);
  let weatherData = axios.data;
  let cleanedData = weatherData.data.map(item => {
    return new Forecast(item.datetime, item.weather.description);
  })
  res.status(200).json(cleanedData);
}
app.get('/weather', handleWeather)

app.listen(PORT, () => { });
