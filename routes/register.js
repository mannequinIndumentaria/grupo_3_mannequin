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
    //password 
    check('password')
    .isAlphanumeric().withMessage('La contraseña debe contener letras y numeros')
    .isLength({ min: 8, max: 20 }).withMessage('La contraseña tener al menos de 8 caracteres'),
],
  registerController.store); 

module.exports = router;
