var express = require('express');
var router = express.Router();
const categoriesController = require('../controllers/categoriesController')
const auth = require('../middlewares/usuarioLogueado');

/* GET home page. */
router.get('/',categoriesController.categories);
router.get('/filter/:category/:subcategory/:desde',auth,  categoriesController.filter);

module.exports = router;
