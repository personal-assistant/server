const tokenHandler = require('../helpers/tokenHandler');
const User = require('../models/user');

module.exports = {
    authentication : function(req,res,next){
        try{
            let user = tokenHandler.decodeToken(req.headers.authorization)
            User.findOne({_id:user._id})
            .then(result=>{
                if(result){
                    req.user = result                   
                    next()
                }else{
                    throw new Error('User not found')
                }
            })
            .catch(err=>{
                next(err)
            })
        }catch(err){
            next(err)
        }
       
    }
}