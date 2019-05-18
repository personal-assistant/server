const axios = require('axios')

module.exports = class RestoController {
  // get popular nearby restaurant (hardcode coordinate hacktiv8)
  static getNearbyRestaurant(req, res) {
    axios
      .get('https://developers.zomato.com/api/v2.1/geocode?lat=-6.260697&lon=106.781616', {
        headers: {
          'user-key': 'd7f449d4fba3514b665a38fd94abadcf'
        }
      })
      .then(({data}) => {
        let popularResto = []
        data.popularity.nearby_res.forEach(resto => {
          popularResto.push(axios.get(`https://developers.zomato.com/api/v2.1/restaurant?res_id=${resto}`, {
              headers: { 'user-key': 'd7f449d4fba3514b665a38fd94abadcf' }
            }))
        })
        return Promise.all(popularResto)
      })
      .then(restaurants => {
        let dataResto = []
        restaurants.forEach(resto => {
          dataResto.push(resto.data)
        })
        res.status(200).json(dataResto)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json(err)
      })
  }
}