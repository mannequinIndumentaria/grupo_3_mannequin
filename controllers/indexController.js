const fs = require('fs');
const path = require('path');
/*Importo json categories*/
const categoriesFilePath = path.join(__dirname, '../data/categories.json');
const categoriesJSON = JSON.parse(fs.readFileSync(categoriesFilePath, 'utf-8'));

/*Importo services*/
const productoNS = require('../services/carrouselNS');
const productoS = require('../services/carrouselS');

const indexController = {
    index: (req, res) => {

        /*Info del controlador a vista*/
        res.render('index', {
            categoriesJSON,
            productosNewSeason: productoNS,
            productosSale: productoS

        });
    },
    /*Search*/
    search: (req, res) => {
        let userSearch = req.query.keywords;
        let finalSearch = productsJSON.filter(prod => prod.name.toLowerCase().includes(userSearch.toLowerCase()) ? prod : null);
        res.render('categories', {
            categoriesJSON,
            productsOnSite: finalSearch,
            userSearch: userSearch
        });
    }
};

module.exports = indexController;