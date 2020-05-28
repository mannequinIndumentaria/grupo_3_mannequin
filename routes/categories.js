var express = require('express');
var router = express.Router();
const categoriesController = require('../controllers/categoriesController')

/* GET home page. */
router.get('/', categoriesController.categories);
router.get('/filter/:category/:subcategory/:desde', categoriesController.filter);

module.exports = router;
