var express = require('express');
var router = express.Router();
const apiCategoriesController = require('../../controllers/api/categoriesController')

/* GET home page. */
router.get('/', apiCategoriesController.getAllCategories);

module.exports = router;
