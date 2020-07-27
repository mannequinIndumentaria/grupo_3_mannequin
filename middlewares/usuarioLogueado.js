const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const db = require('../database/models');

async function usuarioLogueado(req, res, next) {
    if (req.session.user == undefined) {
        if (req.cookies.user) {
            const usuario = await db.User.findAll(
                {
                    where: {
                        idusers: req.cookies.user
                    }
                }
            );
            // const usuario = users.find((user) => {
            //     return user.id == req.cookies.user;
            // });
            req.session.user = usuario;
            next();
        }else{
            // no hay session ni cookies
            res.redirect('/register');
        }
    }else{
        // hay sesion
        // Validar que sea el usuario
        console.log("parametro",req.params.userId)
        console.log("sesion",req.session.user.idusers)
        if(req.params.userId == req.session.user.idusers){
            next();
        }else{
            res.redirect('/register');
        }
    }
}

module.exports = usuarioLogueado;