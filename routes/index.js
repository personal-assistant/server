const routes = require('express').Router();

routes.use('/users', require('./users'));
routes.use('/movies', require('./movie'));
routes.use('/resto', require('./resto'));

module.exports = routes