var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const profileController = require('../controllers/profileController');
const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const { check, validationResult, body } = require('express-validator');

/* GET users listing. */
router.get('/', profileController.index);

module.exports = router;

