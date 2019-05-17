const routes = require('express').Router();
const UserController = require("../controllers/users")

routes.post("/login", UserController.login)
routes.post("/register", UserController.register)


module.exports = routes