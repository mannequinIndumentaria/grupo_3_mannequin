const fs = require('fs');
const path = require('path');
const categoriesFilePath = path.join(__dirname, '../data/categories.json');
const categoriesJSON = JSON.parse(fs.readFileSync(categoriesFilePath, 'utf-8'));

var express = require('express');
var router = express.Router();
const carritoController = require('../controllers/carritoController')

/* GET home page. */
router.get('/', carritoController.carrito);

module.exports = router;
