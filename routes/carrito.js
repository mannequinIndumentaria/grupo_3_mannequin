const fs = require('fs');
const path = require('path');
const categoriesFilePath = path.join(__dirname, '../data/categories.json');
const categoriesJSON = JSON.parse(fs.readFileSync(categoriesFilePath, 'utf-8'));
const auth = require('../middlewares/usuarioLogueado');

var express = require('express');
var router = express.Router();
const carritoController = require('../controllers/carritoController')

/* GET home page. */
router.get('/:userId', auth, carritoController.carrito);
router.post('/', carritoController.pagar);
module.exports = router;
