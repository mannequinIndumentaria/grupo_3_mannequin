/*Requerir librerias*/
const fs = require('fs');
const path = require('path');

/*Traer json y convertirlo*/
const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

/*Mostrar todos los productos del array json*/
const categoriesController = {
    categories: (req,res) => {
        res.render('categories', {
            products:products
        });
    }
};

module.exports = categoriesController;
