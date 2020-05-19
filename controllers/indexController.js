/*Requerir librerias*/
const fs = require('fs');
const path = require('path');

/*Traer json y convertirlo*/
const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const indexController = {
    index: (req,res) => {
        res.render('index');
    },

    search: (req,res) => {
        /*Traer el query de lo buscado por el user*/
        let userSearch = req.query.keywords;
        /*Filtrar products y ver si lo incluye*/
        let productsSearched = products.filter(product => product.name.toLowercase().includes(userSearch.toLowercase()) ? product : null);
        res.render('search', {
            productsSearched:productsSearched,
            userSearch:userSearch
        });
    }

};

module.exports = indexController;

