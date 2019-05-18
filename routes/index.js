const routes = require('express').Router();

routes.use('/users', require('./users'));
routes.use("/messages", require("./messages"))

module.exports = routes