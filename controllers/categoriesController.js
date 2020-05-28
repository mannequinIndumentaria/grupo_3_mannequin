const fs = require('fs');
const path = require('path');
const categoriesFilePath = path.join(__dirname, '../data/categories.json');
const categoriesJSON = JSON.parse(fs.readFileSync(categoriesFilePath, 'utf-8'));
const productsFilePath = path.join(__dirname, '../data/products.json');
const productsJSON = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const productsInfoFilePath = path.join(__dirname, '../data/products-info.json');
const productsInfoJSON = JSON.parse(fs.readFileSync(productsInfoFilePath, 'utf-8'));
const productsColorPath = path.join(__dirname, '../data/colors.json');
const productsColorJSON = JSON.parse(fs.readFileSync(productsColorPath, 'utf-8'));


const categoriesController = {
    categories: (req, res) => {
        res.render('categories', {
            categoriesJSON,
            productsOnSite: productsJSON
        }
        );
    },
    filter: (req, res) => {

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

        const productsFinal = [];
        for (product of productsOnSite) {
            let productImgColor = productsInfoJSON.filter(element => {
                return element.product_id == product.id
            })
            imageArray = [];
            colorArray = [];
            for (const colors of productImgColor) {
                let color = productsColorJSON.filter(element => {
                    return element.id == colors.color_id
                })
                colorArray.push(color);

                imageArray.push(colors.images[0]);
            }

            const producto = {
                id: product.id,
                name: product.name,
                price: product.price,
                colors: colorArray,
                image: imageArray
            }
            productsFinal.push(producto);
        }
        console.log(productsFinal)


        res.render('categories',
            {
                categoriesJSON,
                productsOnSite: productsFinal
            });

    }
};

module.exports = categoriesController;
