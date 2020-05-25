const fs = require('fs');
const path = require('path');
const categoriesFilePath = path.join(__dirname, '../data/categories.json');
const categoriesJSON = JSON.parse(fs.readFileSync(categoriesFilePath, 'utf-8'));
const productsFilePath = path.join(__dirname, '../data/products.json');
const productsJSON = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const imagesFilePath = path.join(__dirname, '../public/images/');

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
        let imagesFiltered = [];
        const category = parseInt(req.params.category);
        const subcategory = parseInt(req.params.subcategory);
        const from = parseInt(req.params.desde);
        const to = (from + 7);
        productsFilteredCat = productsJSON.filter(article => {
            return category == article.category;

        });
        productsFilteredSub = productsFilteredCat.filter(subcat => {
            return subcat.subcategory == subcategory
        });
        const productsOnSite = productsFilteredSub.slice(from, to);

        const imagesOnSite = []
        res.render('categories',
            {
                categoriesJSON,
                productsOnSite: productsOnSite
            });

    }
};

module.exports = categoriesController;
