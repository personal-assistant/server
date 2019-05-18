const routes = require('express').Router();

routes.use('/users', require('./users'));
routes.use("/messages", require("./messages"))
routes.use('/movies', require('./movie'));
routes.use('/resto', require('./resto'));
routes.use('/upload', require('./upload'))

module.exports = routes