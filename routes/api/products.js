var express = require('express');
var router = express.Router();
const apiProductsController = require('../../controllers/api/ProductsController')

/* GET home page. */
router.get('/', apiProductsController.getAllProducts);
router.post('/cart', apiProductsController.addToCart);
router.get('/productsizes/:idproduct', apiProductsController.getSizesByProductId);
router.get('/usercart/:userId', apiProductsController.getUserCart);
router.get('/lastProduct', apiProductsController.getLastProduct)

module.exports = router;
