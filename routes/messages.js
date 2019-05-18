const routes = require('express').Router();
const MessageController = require("../controllers/messages")
const auth = require("../middlewares/auth")

routes.post("/", auth.authentication, MessageController.postMessage)



module.exports = routes