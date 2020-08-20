var express = require('express');
var router = express.Router();
const apiUsersController = require('../../controllers/api/usersController')

/* GET home page. */
router.get('/email/:email', apiUsersController.getUserByEmail);
router.get('/:id', apiUsersController.getUserByID);
router.get('/', apiUsersController.getAllUsers);

module.exports = router;
