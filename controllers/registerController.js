const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));


const registerController = {
    /*Render-get login/main-register*/
    register: (req,res) => {
        res.render('register');
    },

    /*Render-get register-form*/
    registro: (req,res) => {
        res.render('registerFormCompleto');
    },

    /*Register: Almacenar nuevo usuario*/
    store: (req, res, next) => {
        //console.log(req.body);
        const newUser = {
            id: users[users.length - 1].id + 1,
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10)
        };

        const userToSave = [...users, newUser];
        fs.writeFileSync(usersFilePath, JSON.stringify(userToSave, null, ' '));
        res.redirect('/');
    },

    /*Login: Almacenar nuevo usuario*/
    login: (req,res,next) => {
        const email = req.body.email;
        const password = req.body.password;

        const usuario = users.find((user) => {
            return user.email == email;
        });

        if (!usuario) {
            res.render('register', {
                error: 'Usuario no encontrado!'
            });
        }  
        if(!bcrypt.compareSync(password, usuario.password)) {
            res.render('register', {
                error: 'Password incorrecto!'
            });
        }

        res.redirect('/');
    }
};

module.exports = registerController;