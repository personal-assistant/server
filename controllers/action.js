const thirdPartyHelper = require("../helpers/thirdPartyHelpers")  

class MessageController {
    static handleRequest(req,res,next){
        let code = req.body.code
        switch(code){
            case "movie":
                thirdPartyHelper(code)
                .then(data=>{
                    let filteredData =[]

                    data.forEach(obj => {
                        let dataObj = {
                            id: obj.id,
                            title: obj.title,
                            poster_path: obj.poster_path,
                        }
                        filteredData.push(dataObj)
                    });
                    res.status(200).json(composeMessage(filteredData))
                })
                .catch(err=>{
                    next(err)
                })
                break;
            case "food": {
                // console.log(code)
                // console.log(req.body.payload);
                
                thirdPartyHelper(code, req.body.payload)
                .then(data=>{
                    let filteredData =[]

                    data.forEach(obj => {
                        let dataObj = {
                            id: obj.restaurant.id,
                            name: obj.restaurant.name,
                            url: obj.restaurant.url,
                            thumb: obj.restaurant.name,
                        }
                        filteredData.push(dataObj)
                    });
                    res.status(200).json(composeMessage(filteredData))
                })
                .catch(err=>{
                    next(err)
                })
                break;
            }
            case "photo": {
                thirdPartyHelper(code, null, req.file.cloudStoragePublicUrl)
                .then(data=>{
                    res.status(200).json(composeMessage(data, req.file.cloudStoragePublicUrl))
                })
                .catch(err=>{
                    next(err)
                })
                break;
            }
        }
    }
}

function composeMessage(data, imageUrl){
    return{
        message : "success",
        data,
        imageUrl
    }
}


module.exports = MessageController