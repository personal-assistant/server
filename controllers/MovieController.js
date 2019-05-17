const axios = require('axios')
module.exports = class MovieController {
 // get now playing movies in indonesia 
  static getNowPlaying(req, res) {
    axios
      .get('https://api.themoviedb.org/3/movie/now_playing?region=ID&page=1&api_key=89935f82b605a99e3e42642ab9aca081')
      .then(({data}) => {
        console.log(data.results)
        res.status(200).json(data.results)
      })
      .catch(err => {
        res.status(500).json(err)
        console.log(err)
      })
  }

}