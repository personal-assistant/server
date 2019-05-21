const User = require('../models/user');
const tokenHelper = require('../helpers/tokenHandler')
const encryption = require('../helpers/encryption')
class UserController{

    static login(req,res,next){
        let token =""
        User.findOne({email: req.body.email})
        .then(result=>{
            if(!result){
                throw new Error('Email is Invalid!')
            }else{
                token = tokenHelper.createToken({
                    _id: result._id,
                    email: result.email
                })
                if(encryption.validatePassword(req.body.password,result.password)){
                    if(!result.expoNotificationToken.includes(req.body.expoNotificationToken)){
                        return User.findByIdAndUpdate(result._id,
                            { "$push": { "expoNotificationToken": req.body.expoNotificationToken } },
                            { "new": true })
                    }
                    return result
                }else{
                    throw new Error('Password is Invalid!')
                }
            }
        })
        .then(result=>{
            res.status(200).json(composeReturn(token,result))
        })
        .catch(err=>{
            next(err);
        })
    }

    static register(req,res,next){
        let body = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            expoNotificationToken: [req.body.expoNotificationToken]
        }
        User.create(body)
        .then(result=>{
            let token = tokenHelper.createToken({
                _id: result._id,
                email: result.email
            })
 
            res.status(201).json(composeReturn(token,result))
        })
        .catch(err=>{
            next(err)
        })
    }
    static updatePoint(req,res,next){
        if(!req.body.relationshipPoint){
            next()
        }else{
            let newPoint = req.user.relationshipPoint + Number(req.body.relationshipPoint)
            if(newPoint < 0) newPoint = 0;
            if(newPoint > 100) newPoint = 100;
            User.findByIdAndUpdate(req.user._id, {relationshipPoint: newPoint}, {new:true})
            .then(result=>{
                req.relationshipPoint = result.relationshipPoint
                next()
            })
            .catch(err=>{
                next(err)
            })
        }
    }
    static getUser(req,res,next){
        let token = req.headers.authorization
        res.status(200).json(composeReturn(token, req.user))
    }
}

function composeReturn(token,result){
  
    return {
        token:token,
        user: result
    }  
}
module.exports = UserController;