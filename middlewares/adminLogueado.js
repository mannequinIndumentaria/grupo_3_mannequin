const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const db = require('../database/models');

async function usuarioLogueado(req, res, next) {
    console.log("ADMIN-MIDDLEWARE")
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
            console.log("esadmin", usuario.admin)
            if(usuario.admin == 1){

                req.session.user = usuario;
                next();
            }else{
                res.redirect('/index')
            }
        }else{
            // no hay session ni cookies
            res.redirect('/register');
        }
    }else{
        next();
    }
}

module.exports = usuarioLogueado;