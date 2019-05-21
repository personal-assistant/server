const thirdPartyHelper = require("../helpers/thirdPartyHelpers")  

class MessageController {
    static handleRequest(req,res,next){
        let code = req.body.code
        let url = req.file ? req.file.cloudStoragePublicUrl : undefined
        switch(code){
            case "movie":
            case "food":
            case "photo": {    
                thirdPartyHelper(code, req.body.payload, url)
                .then(data=>{
                    let filteredData =[]

                    if(code === 'photo'){
                        filteredData = data
                    }else{
                        data.forEach(obj => {
                            let dataObj;
                            if(code === 'movie'){
                                dataObj = {
                                    id: obj.id,
                                    title: obj.title,
                                    poster_path: obj.poster_path,
                                }
                            }else{                      
                                dataObj = {
                                    id: obj.restaurant.id,
                                    name: obj.restaurant.name,
                                    url: obj.restaurant.url,
                                    thumb: obj.restaurant.thumb,
                                }
                            }
                            filteredData.push(dataObj)
                        });
                    }
                   
            
                    res.status(200).json(composeMessage(filteredData,code, url))
                })
                .catch(err=>{
                    next(err)
                })
                break;
            }
            // case "photo": {
            //     thirdPartyHelper(code, null, req.file.cloudStoragePublicUrl)
            //     .then(data=>{
            //         res.status(200).json(composeMessage(data, code,req.file.cloudStoragePublicUrl))
            //     })
            //     .catch(err=>{
            //         next(err)
            //     })
            //     break;
            // }
            default : {         
               if(req.relationshipPoint>=0){
                   res.status(200).json(composeMessage(undefined,undefined,undefined,req.relationshipPoint))
               }else{   
                   next(new Error("Code is invalid"));
               }
            }
        }
    }
}

function composeMessage(data, code, imageUrl, relationshipPoint){
    return{
        message : "success",
        code,
        data,
        imageUrl,
        relationshipPoint
    }
}


module.exports = MessageController