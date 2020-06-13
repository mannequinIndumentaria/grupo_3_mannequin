const fs = require('fs');
const path = require('path');
const session = require('express-session');
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
            user: req.session.user,
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
        const pagination = {
            page_number: 1,
            page_size: 4,
            pages: 0,

        };
        let productsFinal = [];
        let productsColorFoto = [];
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
            productsColorFoto.push(producto);
            pagination.pages = Math.ceil(productsColorFoto.length / pagination.page_size);
            productsFinal = productsColorFoto.slice((pagination.page_number - 1) * pagination.page_size, pagination.page_number * pagination.page_size);

        }


        res.render('categories', {
            categoriesJSON,
            productsOnSite: productsFinal,
            userSearch: userSearch,
            pagination: pagination,
            thousandGenerator: toThousand
        });

    },
    subscribe: (req, res, next) => {
        const newSubscriber = {
            id: subscribersJSON[subscribersJSON.length - 1].id + 1,
            email: req.body.email,
        };
        const subscriberToSave = [...subscribersJSON, newSubscriber];
        fs.writeFileSync(subscribersPath, JSON.stringify(subscriberToSave, null, ' '));
        res.redirect('/');
    }
};

module.exports = indexController;