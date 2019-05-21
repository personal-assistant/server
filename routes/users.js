const routes = require('express').Router();
const UserController = require("../controllers/users")
const auth = require("../middlewares/auth")

routes.post("/login", UserController.login)
routes.post("/register", UserController.register)
routes.get("/user", auth.authentication, UserController.getUser)


module.exports = routes