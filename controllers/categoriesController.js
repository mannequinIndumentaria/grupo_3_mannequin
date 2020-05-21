const fs = require('fs');
const path = require('path');
const categoriesFilePath = path.join(__dirname, '../data/categories.json');
const categoriesJSON = JSON.parse(fs.readFileSync(categoriesFilePath, 'utf-8'));
const productsFilePath = path.join(__dirname, '../data/products.json');
const productsJSON = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const categoriesController = {
    categories: (req, res) => {
        res.render('categories', {
            categoriesJSON,
            productsJSON
        }
        );
    }
};

module.exports = categoriesController;
