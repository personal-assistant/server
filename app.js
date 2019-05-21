require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const errorHandler = require('./middlewares/errorHandler')
const app = express();
const cors = require('cors')
const PORT = process.env.PORT
const NODE_ENV = process.env.NODE_ENV;
const databaseConnect = require("./helpers/databaseConnect")


app.use(cors())
app.use(express.urlencoded({extended:true}));
app.use(express.json());

databaseConnect(mongoose, process.env.ATLAS_USER, process.env.ATLAS_PASSWORD, NODE_ENV)

app.use('/', require('./routes'));
app.use(errorHandler);

app.listen(PORT, function(){console.log('listen to port ' + PORT)})

module.exports = app;