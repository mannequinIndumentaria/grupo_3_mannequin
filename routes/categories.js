var express = require('express');
var router = express.Router();
const categoriesController = require('../controllers/categoriesController')

/* GET home page. */
router.get('/', categoriesController.categories);

module.exports = router;
