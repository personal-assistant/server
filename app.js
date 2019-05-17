require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const errorHandler = require('./middlewares/errorHandler')
const app = express();
const cors = require('cors')
const PORT = process.env.PORT || 3000
const NODE_ENV = process.env.NODE_ENV || 'development';

app.use(cors())
app.use(express.urlencoded({extended:false}));
app.use(express.json());

mongoose.connect(`mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASSWORD}@cluster0-xigat.gcp.mongodb.net/eve${NODE_ENV}?retryWrites=true`, {useNewUrlParser:true})
.then(function(success){
    console.log('succesfully connect to database')
})
.catch(function(err){
    console.log(err)
})

app.use('/', require('./routes'));
app.use(errorHandler);

app.listen(PORT, function(){console.log('listen to port ' + PORT)})

module.exports = app;