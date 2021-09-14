"use strict";

const express = require("express");

require("dotenv").config();

const cors = require("cors");

const app = express();
app.use(cors());

const weatherData = require("./data/weather.json");
const PORT = process.env.PORT;

console.log(weatherData);
class Forecast {
  constructor(date, description, lat, lon) {
    this.date = date;
    this.description = description;

  }
}

app.get("/witherData", (req, res) => {
  const searchQuery = req.query.city_name;
  let lat = Number(req.query.lat);
  let lon = Number(req.query.lon);
  
if (lat&&lon||searchQuery) {
  const checkArray = weatherData.find((item) => {
    return item.city_name.toLowerCase() === searchQuery.toLowerCase()|| item.lat===lat&&item.lon===lon;
  });

  if (checkArray) {
    let newArray = checkArray.data.map((item) => {
      return new Forecast(item.datetime, item.weather.description);
    });
    res.json(newArray);
  } else {
    res.status(404).send("city dose not exist")
  }
}else {
  res.status(400).send("pleas right city name")
}
  

});
app.listen(PORT, () => { });