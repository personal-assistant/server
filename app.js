require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const errorHandler = require('./middlewares/errorHandler')
const app = express();
const cors = require('cors')
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.urlencoded({extended:false}));
app.use(express.json());

mongoose.connect(process.env.DB_URI, {useNewUrlParser:true})
.then(function(success){
    console.log('succesfully connect to database')
})
.catch(function(err){
    console.log(err)
})

app.use('/', require('./routes'));
app.use(errorHandler);

app.listen(PORT, function(){console.log('listen to port ' + PORT)})