var express = require('express');
var router = express.Router();
const helpController = require('../controllers/helpController');
const auth = require('../middlewares/usuarioLogueado');

/* GET home page. */
router.get('/privacy', helpController.privacy);
router.get('/shipping', helpController.shipping);
router.get('/payment', helpController.payment);
router.get('/contact', helpController.contact);
router.get('/returns', helpController.returns);

module.exports = router;