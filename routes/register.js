var express = require('express');
var router = express.Router();
const registerController = require('../controllers/registerController')

/*log-in. */
router.get('/', registerController.login);

/*Register*/
router.get('/registro', registerController.registro);
router.post('/registro', registerController.store); 

module.exports = router;
