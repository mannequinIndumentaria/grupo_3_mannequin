var express = require('express');
var router = express.Router();
const indexController = require('../controllers/indexController');
const auth = require('../middlewares/usuarioLogueado');
/* GET home page. */

router.get('/', indexController.index);
router.get('/search' , indexController.search);
//router.post('/', indexController.subscribe);

module.exports = router;
