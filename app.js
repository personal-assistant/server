require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const errorHandler = require('./middlewares/errorHandler')
const app = express();
const cors = require('cors')
const PORT = process.env.PORT
const NODE_ENV = process.env.NODE_ENV;
const databaseConnect = require("./helpers/databaseConnect")
const CronJob = require('cron').CronJob;
const axios = require('axios')

app.use(cors())
app.use(express.urlencoded({extended:false}));
app.use(express.json());

databaseConnect(mongoose, process.env.ATLAS_USER, process.env.ATLAS_PASSWORD, NODE_ENV)
    
const title = 'Example title'
const body = 'Example body'
let pushMessage = JSON.stringify({
  to: 'ExponentPushToken[Y0Gq7BPC-vKGmgYQdKb-h9]',
  title: title,
  body: body,
  data: { message: `${title} - ${body}` },
})

// new CronJob('0 8 * * *', function() {
//   console.log('You will see this message every 8 am');
//   axios.post('https://exp.host/--/api/v2/push/send', pushMessage, {
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   })
// }, null, true, 'Asia/Jakarta');

app.use('/', require('./routes'));
app.use(errorHandler);

app.listen(PORT, function(){console.log('listen to port ' + PORT)})

module.exports = app;
