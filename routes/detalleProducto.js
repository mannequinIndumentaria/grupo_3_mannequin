var express = require('express');
var router = express.Router();
const detalleProductoController = require('../controllers/detalleProductoController')

/* GET home page. */
router.get('/', detalleProductoController.detalleProducto);
router.get('/detalleProducto', detalleProductoController.detalleProducto);

module.exports = router;