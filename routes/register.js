var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const registerController = require('../controllers/registerController');
// const usersFilePath = path.join(__dirname, '../data/users.json');
// const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const { check, validationResult, body } = require('express-validator');
const auth = require('../middlewares/usuarioLogueado');
const db = require('../database/models');


/*log-in*/
router.get('/', registerController.index);
router.post('/', registerController.login);

/*log-out*/
router.get('/logout', registerController.logout);

/*Register*/
router.get('/registro', registerController.registro);
router.post('/registro', [

  //name 
  check('name')
    .isLength({ min: 1, max: 40 }),
  //lastname 
  check('lastname')
    .isLength({ min: 1, max: 40 }),
  //email
  check('email').isEmail().withMessage('Ingrese un correo valido'),

  //Chequear usuario existente
  body('email').custom( async function(value) {
    const usuario = await db.User.findAll({where:{email:value}});
    if (usuario.length > 0) {
        return Promise.reject();
    }
    }).withMessage('Usuario ya existente'),

  //Validar email y repeatEmail 

  body('repeatEmail').custom((value, { req }) => {
    if (value !== req.body.email) {
      throw new Error('La confirmacion del email no coincide con el ingresado');
    }
    // Indicates the success of this synchronous custom validator
    return true;
  }),

  //password 
  check('password')
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)
    .withMessage('La contraseña debe contener un minimo de 8 caracteres con al menos 1 Mayuscula, 1 Minuscula, 1 Numero, y 1 Simbolo'),

  //Validar password y repeatPassword
  body('repeatPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('La confirmacion del password no coincide con el ingresado');
    }
    // Indicates the success of this synchronous custom validator
    return true;
  }),
],
  registerController.store);

  // /*Profile*/
  // router.get('/profile', auth, registerController.profile);

module.exports = router;
