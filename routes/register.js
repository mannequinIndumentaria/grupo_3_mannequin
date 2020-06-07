var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const registerController = require('../controllers/registerController');
const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const { check, validationResult, body } = require('express-validator');

/*log-in*/
router.get('/', registerController.index);
router.post('/', registerController.login);

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
  body('email').custom(value => {
    for (let i = 0; i < users.length; i++) {
      if (users[i].email == value) {
        return false;
      }
    }
    return true;
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
    .isAlphanumeric().withMessage('La contraseña debe contener letras y numeros')
    .isLength({ min: 8, max: 20 }).withMessage('La contraseña tener al menos de 8 caracteres'),

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

module.exports = router;
