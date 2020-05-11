var express = require('express');
var router = express.Router();
const cargaArticuloController = require('../controllers/cargaArticuloController')

/* GET home page. */
router.get('/', cargaArticuloController.carga);

module.exports = router;
