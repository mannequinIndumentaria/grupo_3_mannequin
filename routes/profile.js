var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const profileController = require('../controllers/profileController');
const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const { check, validationResult, body } = require('express-validator');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req,file,cb){
cb(null,'public/images/users')
    },
    filename: function(req,file,cb){
        cb(null, file.fieldname+'-'+ Date.now() + path.extname(file.originalname))
    },
});

const upload = multer({storage: storage});

/* Vista profile */
router.get('/:userId', profileController.index);
/*Modificar formulario*/
router.put('/:userId', upload.any(), profileController.update);

module.exports = router;

