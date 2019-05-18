const router = require('express').Router()
const RestoController = require('../controllers/RestoController')

router.get('/', RestoController.getNearbyRestaurant)

module.exports = router