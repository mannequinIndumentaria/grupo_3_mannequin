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
            productsOnSite: productsJSON
        }
        );
    },
    filter: (req, res) => {

        let productsFiltered = [];
        const category = req.params.category;
        const subcategory = req.params.subcategory;
        const from = req.params.desde;
        const to = (from + 7);
        productsFiltered = productsJSON.filter(article => {
            article.category == category && article.subcategory == subcategory;
        });
        const productsOnSite = productsFiltered.slice(from, to);
        res.render('categories',
            {
                categoriesJSON,
                data: productsOnSite
            });
        console.log(productsJSON);
    }
};

module.exports = categoriesController;
