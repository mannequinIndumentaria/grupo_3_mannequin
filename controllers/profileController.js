const fs = require('fs');
const path = require('path');
const session = require('express-session');

/*Importo json categories*/
const categoriesFilePath = path.join(__dirname, '../data/categories.json');
const categoriesJSON = JSON.parse(fs.readFileSync(categoriesFilePath, 'utf-8'));
/*Importo json products*/
const productsFilePath = path.join(__dirname, '../data/products.json');
const productsJSON = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
/*Importo json products-info*/
const productsInfoFilePath = path.join(__dirname, '../data/products-info.json');
const productsInfoJSON = JSON.parse(fs.readFileSync(productsInfoFilePath, 'utf-8'));
/*Importo json colors*/
const productsColorPath = path.join(__dirname, '../data/colors.json');
const productsColorJSON = JSON.parse(fs.readFileSync(productsColorPath, 'utf-8'));
/*Importo json subscribers*/
const subscribersPath = path.join(__dirname, '../data/subscribers.json');
const subscribersJSON = JSON.parse(fs.readFileSync(subscribersPath, 'utf-8'));
/*Importo galerias de carpeta services*/
const productoNS = require('../services/carrouselNS');
const productoS = require('../services/carrouselS');
/*Importo conversor*/
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const profileController = {
    index: (req, res) => {

        /*Info del controlador a vista*/
        res.render('profile', {
            categoriesJSON,
            //productosNewSeason: productoNS,
            //productosSale: productoS,
            thousandGenerator: toThousand
        });
    }

};

module.exports = profileController;