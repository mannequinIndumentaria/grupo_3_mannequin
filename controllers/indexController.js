const fs = require('fs');
const path = require('path');
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

const indexController = {
    index: (req, res) => {

        /*Info del controlador a vista*/
        res.render('index', {
            categoriesJSON,
            productosNewSeason: productoNS,
            productosSale: productoS,
            thousandGenerator: toThousand
        });
    },
    /*Search*/
    search: (req, res) => {
        let userSearch = req.query.keywords;
        let finalSearch = productsJSON.filter(prod => prod.name.toLowerCase().includes(userSearch.toLowerCase()) ? prod : null);
        const productsFinal = [];
        for (product of finalSearch) {
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

        res.render('categories', {
            categoriesJSON,
            productsOnSite: productsFinal,
            userSearch: userSearch,
            thousandGenerator: toThousand
        });

    },
    subscribe: (req, res, next) => {
        const newSubscriber = {
            id: subscribersJSON[subscribersJSON.length - 1].id + 1,
            email: req.body.email,
        };
        console.log(newSubscriber);
        const subscriberToSave = [...subscribersJSON, newSubscriber];
        fs.writeFileSync(subscribersPath, JSON.stringify(subscriberToSave, null, ' '));
        res.redirect('/');
    }
};

module.exports = indexController;