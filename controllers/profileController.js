const fs = require('fs');
const path = require('path');
const session = require('express-session');

/*Importo json categories*/
const categoriesFilePath = path.join(__dirname, '../data/categories.json');
const categoriesJSON = JSON.parse(fs.readFileSync(categoriesFilePath, 'utf-8'));

/*Importo conversor*/
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/*Importo meses*/
const mesesFilePath = path.join(__dirname, '../data/meses.json');
const meses = JSON.parse(fs.readFileSync(mesesFilePath, 'utf-8'));

/*Importo paises*/
const paisesFilePath = path.join(__dirname, '../data/paises.json');
const paises = JSON.parse(fs.readFileSync(paisesFilePath, 'utf-8'));

/*Importo users*/
const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const profileController = {
    index: (req, res) => {

        /*Info del controlador a vista*/
        res.render('profile', {
            categoriesJSON,
            meses,
            paises,
            users,
            //productosNewSeason: productoNS,
            //productosSale: productoS,
            thousandGenerator: toThousand
        });
    }

};

module.exports = profileController;