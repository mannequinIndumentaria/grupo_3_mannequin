var express = require('express');
var router = express.Router();
const apiSubscribersController = require('../../controllers/api/subscribersController')

/* GET home page. */
router.post('/', apiSubscribersController.subscribe);

module.exports = router;