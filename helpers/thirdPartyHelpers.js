const axiosHelper = require ("./axiosHelper")
const vision = require('@google-cloud/vision')

const client = new vision.ImageAnnotatorClient({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
  })

function thirdPartyHelper(code, location, photoUrl){
    switch(code){
        case "food": {

            let url, lat, long;
            if(location === undefined){
                lat = -6.260697
                long =  106.781616
            }else{    
                lat = location.lat || -6.260698
                long = location.long ||  106.781617
            } 

            url =  `https://developers.zomato.com/api/v2.1/geocode?lat=${lat}&lon=${long}`
            let headers = {
                'user-key': 'd7f449d4fba3514b665a38fd94abadcf'
            }
            return axiosHelper(url, headers)
            .then(data=>{
                return data.nearby_restaurants
            })  
        }
        case "movie" : {
            let url = `https://api.themoviedb.org/3/movie/now_playing?region=ID&page=1&api_key=89935f82b605a99e3e42642ab9aca081`
            let headers = {}
            return axiosHelper(url, headers)
            .then(data=>{
                return data.results
            })
        }
        case "photo" : {
            return client.labelDetection(photoUrl)
            .then(results=>{
                let labels = results[0].labelAnnotations;
                let labelName = labels.map(label => label.description)
                return labelName
            })
        }
    }
}

module.exports = thirdPartyHelper
