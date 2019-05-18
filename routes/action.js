const routes = require('express').Router();
const ActionController = require("../controllers/action")
const imgUpload = require("../middlewares/imgUpload")
const UserController = require("../controllers/users")
const auth = require("../middlewares/auth")

routes.post("/", 
        auth.authentication, 
        imgUpload.multer.single('photo'),
        imgUpload.sendUploadToGCS,
        UserController.updatePoint,
        ActionController.handleRequest,
    )

module.exports = routes

// routes.post('/', imgUpload.multer.single('photo'), imgUpload.sendUploadToGCS, async (req, res) => {

//   })