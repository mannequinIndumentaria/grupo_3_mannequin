var express = require('express');
var router = express.Router();
const apiProductsController = require('../../controllers/api/productsController')

/* GET home page. */
router.get('/', apiProductsController.getAllProducts);
router.post('/cart', apiProductsController.addToCart);
router.post('/cart/removeitem', apiProductsController.removeFromCart);
router.get('/productsizes/:idproduct', apiProductsController.getSizesByProductId);
router.get('/usercart/:userId', apiProductsController.getUserCart);
router.get('/lastProduct', apiProductsController.getLastProduct)
router.get('/:productId/:sizeId', apiProductsController.getStockProduct)
router.post('/discountStock', apiProductsController.setCantidad)
router.post('/favorite', apiProductsController.addToFavorites);
router.get('/itsfavorite/:userId/:artId', apiProductsController.itsFavorite);
router.post('/aplicarDescuento', apiProductsController.aplicarDescuento);
router.post('/getTotales', apiProductsController.getTotalCart);

module.exports = router;
