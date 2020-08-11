var express = require('express');
var router = express.Router();
const privacyController = require('../controllers/privacyController');
const auth = require('../middlewares/usuarioLogueado');

/* GET home page. */
router.get('/', privacyController.privacy);

module.exports = router;