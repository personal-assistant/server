const routes = require('express').Router();

routes.use('/users', require('./users'));
// routes.use('/movies', require('./movie'));
// routes.use('/resto', require('./resto'));
// routes.use('/upload', require('./upload'))
routes.use("/action", require("./action"))

module.exports = routes