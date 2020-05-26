const fs = require('fs');
const path = require('path');
const categoriesFilePath = path.join(__dirname, '../data/categories.json');
const categoriesJSON = JSON.parse(fs.readFileSync(categoriesFilePath, 'utf-8'));
const productsFilePath = path.join(__dirname, '../data/products.json');
const productsJSON = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const productsInfoFilePath = path.join(__dirname, '../data/products-info.json');
const productsInfoJSON = JSON.parse(fs.readFileSync(productsInfoFilePath, 'utf-8'));


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

        const imagesOnSite = (productsFilteredSub,productsInfoJSON) => {
            arrayImgColor = [];
            productImgColor = {};
            for (product of productsFilteredSub) {
                for (prodInfo of productsInfoJSON)
                if (productsFilteredSub.id == productsInfoJSON.product_id){
                    productImgColor = {
                        id: productsInfoJSON.product_id,
                        color: productsInfoJSON.color_id,
                        fimage: productsInfoJSON.images[0]
                    }
                    arrayImgColor.push(productImgColor) 
                }
            }
            console.log(arrayImgColor);
            return arrayImgColor;
            
        }

        res.render('categories',
            {
                categoriesJSON,
                productsOnSite: productsOnSite,
                imagesOnSite: imagesOnSite
            });

    }
};

module.exports = categoriesController;
