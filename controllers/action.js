const thirdPartyHelper = require("../helpers/thirdPartyHelpers")  

class MessageController {
    static handleRequest(req,res,next){
        let code = req.body.code
        switch(code){
            case "movie":
            case "food": {    
                thirdPartyHelper(code, req.body.payload)
                .then(data=>{
                    if(req.body.test){
                        throw new Error("")
                    }
                    let filteredData =[]

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
            
                    res.status(200).json(composeMessage(filteredData,code))
                })
                .catch(err=>{
                    next(err)
                })
                break;
            }
            case "photo": {
                thirdPartyHelper(code, null, req.file.cloudStoragePublicUrl)
                .then(data=>{
                    if(req.body.test === "catch"){
                        throw new Error("")
                    }
                    res.status(200).json(composeMessage(data, code,req.file.cloudStoragePublicUrl))
                })
                .catch(err=>{
                    next(err)
                })
                break;
            }
            default : {         
               if(req.body.relationshipPoint){
                   res.status(200).json(composeMessage(undefined,undefined,undefined,req.body.relationshipPoint))
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