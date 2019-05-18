
class MessageController {
    static postMessage(req,res,next){


       res.status(200).json({
           message: "success"
       })
    }
}


module.exports = MessageController