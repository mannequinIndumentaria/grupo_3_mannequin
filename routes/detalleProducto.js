var express = require('express');
var router = express.Router();
const detalleProductoController = require('../controllers/detalleProductoController');
const auth = require('../middlewares/usuarioLogueado');

/* GET home page. */
router.get('/', detalleProductoController.detalleProducto);
router.get('/:id',  detalleProductoController.detalleProducto);

module.exports = router;