var express = require('express');
var router = express.Router();
const apiProductsController = require('../../controllers/api/ProductsController')

/* GET home page. */
router.get('/', apiProductsController.getAllProducts);

module.exports = router;
