var express = require('express');
var router = express.Router();
const registerController = require('../controllers/registerController')

/* GET home page. */
router.get('/', registerController.register);

router.get('/registro', registerController.registro);

module.exports = router;
