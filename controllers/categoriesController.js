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
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const categoriesController = {
    categories: (req, res) => {
        res.render('categories', {
            categoriesJSON,
            productsOnSite: productsJSON,
            thousandGenerator: toThousand
        }
        );
    },
    filter: (req, res) => {
        let productsFinal = [];
        const category = parseInt(req.params.category);
        const subcategory = parseInt(req.params.subcategory);
        const pagination = {
            page_number: parseInt(req.params.desde),
            page_size: 4,
            pages: 0,
            category: req.params.category,
            subcategory: req.params.subcategory
        }
        productsFilteredCat = productsJSON.filter(article => {
            return category == article.category;
        });
        productsFilteredSub = productsFilteredCat.filter(subcat => {
            return subcat.subcategory == subcategory
        });
        let productsColorFoto = [];
        for (product of productsFilteredSub) {
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
            productsColorFoto.push(producto);
            pagination.pages = Math.ceil(productsColorFoto.length / pagination.page_size);
            
            productsFinal = productsColorFoto.slice((pagination.page_number - 1) * pagination.page_size, pagination.page_number * pagination.page_size);

        }
        res.render('categories',
            {
                categoriesJSON,
                productsOnSite: productsFinal,
                pagination: pagination,
                thousandGenerator: toThousand
            });

    }
};

module.exports = categoriesController;
