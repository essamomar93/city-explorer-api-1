"use strict";
const Forecast=require("../models/Weather.model")

const handleWeather = async (req, res) => {
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

  module.exports=handleWeather;