"use strict";

const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const axios = require("axios");

const PORT = process.env.PORT || 8000;

require("dotenv").config();

const handleWeather=require("./controllers/Weather.controller")
const handleMovie=require("./controllers/Movie.controller")


app.get('/weather', handleWeather)

app.get('/movie', handleMovie)

app.listen(PORT, () => {});