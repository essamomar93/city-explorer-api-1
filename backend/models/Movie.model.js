"use strict";

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

module.exports = Moviecast;
