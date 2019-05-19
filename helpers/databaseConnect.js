
module.exports = async function(mongoose,user,password, environment){
    console.log("Environtment: ", environment)
    if(environment === undefined){
        environment = 'development'
    }
    try{
        await mongoose.connect(`mongodb+srv://${user}:${password}@cluster0-xigat.gcp.mongodb.net/eve-${environment}?retryWrites=true`, {useNewUrlParser:true})
        return true
        
    }catch(err){
        return false
    }
   
}
