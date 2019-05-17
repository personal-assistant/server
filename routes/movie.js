const router = require('express').Router()
const MovieController = require('../controllers/MovieController')

router.get('/', MovieController.getNowPlaying)

module.exports = router