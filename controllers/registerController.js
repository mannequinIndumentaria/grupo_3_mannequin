const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

const { check, validationResult, body } = require('express-validator');

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

let menu = require('../services/menu');
const db = require('../database/models');

const registerController = {

    /*Vista de login y primer form de registro*/
    index: (req, res) => {
        res.render('register', {
            menu: menu,
            user: req.session.user
        });
    },
    /*vista de registro completo*/
    registro: (req, res) => {
        res.render('registerFormCompleto', {
            user: req.session.user,
            menu: menu
        });
    },

    /*Register: Almacenar nuevo usuario*/
    store: async (req, res, next) => {

        const errors = validationResult(req);

        if (errors.isEmpty()) {

            const newUserId = await db.User.max('idusers');
            const newUser = {
                id: newUserId+1,
                name: req.body.name,
                lastname: req.body.lastname,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10)
            };
            db.User.create(newUser)
            // const userToSave = [...users, newUser];
            // fs.writeFileSync(usersFilePath, JSON.stringify(userToSave, null, ' '));
            res.redirect('/register');

        } else {
            return res.render('registerFormCompleto', {
                errors: errors.errors,
                menu: menu
            });
        }

    },
    /*Log-in*/
    login: async (req, res, next) => {
        const email = req.body.email
        const password = req.body.password;

        // const usuario = users.find((user) => {
        //     return user.email == email;
        // });

        const usuario = await db.User.findOne(
            {
                include: [
                    { association: "genders" }, { association: "countries" }
                ],
                where: {
                    email: req.body.email
                }
            }
        );

        if (usuario != undefined) {
            if (bcrypt.compareSync(password, usuario.password)) {
                console.log("USUARIO LOGIN :", usuario);
                req.session.user = usuario;
                console.log("USUARIO SESSION LOGIN :", req.session.user);
                //Cookie
                console.log("RECORDAR SESION?:", req.body.recordarSesion);
                if (req.body.recordarSesion != undefined) {
                    res.cookie('user', usuario.idusers, { maxAge: 100000000 })
                }
                if(usuario.admin){
                    res.redirect('/crudIndex/');
                }else{
                    res.redirect('/profile/' + usuario.idusers);
                }
            } else {
                res.render('register', {
                    error: 'Usuario y/o contraseña incorrecto',
                    menu: menu
                })
            }
        } else {
            res.render('register', {
                error: 'Usuario y/o contraseña incorrecto',
                menu: menu
            })
        }
    },
    logout: (req, res, next) => {
        res.cookie('user', req.session.user.idusers, { maxAge: -1 })
        req.session.destroy();
        res.redirect('/')
    },
    profile: (req, res, next) => {
        if (req.session.user == undefined) {
            return res.redirect('/register', {
                name: req.session.user.name,
                email: req.session.user.email
            });
        }
        res.render('profile');
    }

};


module.exports = registerController;