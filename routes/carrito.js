var express = require('express');
var router = express.Router();
const carritoController = require('../controllers/carritoController')

/* GET home page. */
router.get('/', carritoController.carrito);

module.exports = router;
