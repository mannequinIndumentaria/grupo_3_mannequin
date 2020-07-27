var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const profileController = require('../controllers/profileController');
// const usersFilePath = path.join(__dirname, '../data/users.json');
// const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const db = require('../database/models');
let menu = require('../services/menu');
const { check, validationResult, body } = require('express-validator');
const auth = require('../middlewares/usuarioLogueado');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/users')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    },
});

const upload = multer({ storage: storage });

/* Vista profile */
router.get('/:userId', auth, profileController.index);
/*Modificar formulario*/
router.put('/:userId', upload.any(), [
    //name 
    check('name')
        .isLength({ min: 1, max: 40 }),
    //lastname 
    check('lastname')
        .isLength({ min: 1, max: 40 }),
    //email
    check('email').isEmail().withMessage('Ingrese un correo valido'),

    // //Chequear usuario existente
    // body('email').custom(value => {
    //     for (let i = 0; i < users.length; i++) {
    //         if (users[i].email == value) {
    //             return false;
    //         }
    //     }
    //     return true;
    // }).withMessage('Usuario ya existente'),

    body('email').custom(async function (value) {
        const usuario = await db.User.findAll({ where: { email: value } });
        if (usuario.length > 0) {
            return Promise.reject();
        }
    }).withMessage('Usuario ya existente'),

    //password 
    check('password')
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)
    .withMessage('La contraseña debe contener un minimo de 8 caracteres con al menos 1 Mayuscula, 1 Minuscula, 1 Numero, y 1 Simbolo'),

          
],
    profileController.update);

module.exports = router;

