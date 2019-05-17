const routes = require('express').Router();

routes.post("/login", UserController.login)
routes.post("/register", UserController.register)


module.exports = routes