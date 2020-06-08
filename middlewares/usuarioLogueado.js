const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

function usuarioLogueado(req, res, next) {
    if (req.session.user == undefined) {
        if (req.cookies.user) {
            const usuario = users.find((user) => {
                return user.id == req.cookies.user;
            });
            req.session.user = usuario;
            next();
        } else {
            return res.redirect('/register');
        }
    }
}

module.exports = usuarioLogueado;