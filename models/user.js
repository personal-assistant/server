const mongoose = require('mongoose');
const Schema  = mongoose.Schema;
const encryption = require('../helpers/encryption');

var userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required:true
    },
    email: {
        type: String,
        required: true,
        validate: function (email) {
                var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{1,4})?$/
                return emailRegex.test(email)
        }
    },
    expoNotificationToken : [{
        type: String,
        required: true
    }],
    relationshipPoint :{
        type: Number
    }

}, { versionKey: false })
userSchema.pre('save', function(next){
    this.password = encryption.getHashedPassword(this.password)
    if(!this.relationshipPoint){
        this.relationshipPoint = 0;
    }
    next()
})
userSchema.path('email').validate(async (value) => {
    try{
        let user =  await mongoose.models.User.findOne({email:value});
        return !user;
    }catch(err){
        console.log(err)
    }
  
}, 'Email already exists');

const User = mongoose.model('User', userSchema)
module.exports = User