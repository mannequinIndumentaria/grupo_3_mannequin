const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

const usersFilePath = path.join(__dirname, '../data/user.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));


const registerController = {
    register: (req,res) => {
        res.render('register');
    },

    registro: (req,res) => {
        res.render('registerFormCompleto');
    },

    /*Register: Almacenar nuevo usuario*/
    store: (req, res, next) => {
        const newUser = {
            id: users[users.length - 1].id + 1,
            /*
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            repeatEmail: req.body.repeatEmail,
            password: bcrypt.hashSync(req.body.password, 10),
            repeatPassword: bcrypt.hashSync(req.body.repeatPassword, 10),
            */
        };

        const userToSave = [...users, newUser];
        fs.writeFileSync(usersFilePath, JSON.stringify(userToSave, null, ' '));
        res.redirect('/');
    }
};

module.exports = registerController;