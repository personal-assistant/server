const axios = require("axios")

module.exports = function(url, headers){
    return axios.get(url, {headers})
    .then(({data})=>{
        return data
    })
}