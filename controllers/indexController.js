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
//const productoNS = require('../services/carrouselNS');
//const productoS = require('../services/carrouselS');
/*Importo conversor*/
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
/*Importo componentes para DB*/
let db = require('../database/models');
const { Op } = require("sequelize");
let menu = require('../services/menu');

const indexController = {
    index: async (req, res) => {
        const productsNewSeason = await db.Product.findAll({
            where: {
                new_season: 1
            },
            include: [
                { association: "images" }
            ]
        })

        const productsSale = await db.Product.findAll({
            where: {
                sale: 1
            },
            include: [
                { association: "images" }
            ]
        })

        // const productosConFoto = await db.query(
        //     select p.*, i.file_name as foto from products p
        //     inner join products_has_images phm ON phm.products_idproducts = p.idproducts
        //     inner join images i ON i.idimage = phm.images_idimage
        //     group by p.group
        // )


        /*Info del controlador a vista*/
        res.render('index', {
            user: req.session.user,
            menu: menu,
            productosNewSeason: productsNewSeason,
            productosSale: productsSale,
            thousandGenerator: toThousand
        })
    },
    /*Search*/
    search: async (req, res) => {
        let order = {
            query: [],
            url: 'name'
        }

        switch (req.query.order) {
            case 'name':
                order.query = [['name', 'ASC']]
                order.url = 'name'
                break;
            case 'price':
                order.query = [['price', 'ASC']]
                order.url = 'price'
                break;
            case 'color':
                order.query = [['color', 'ASC']]
                order.url = 'color'
                break;
            default:
                order.query = [['name', 'ASC']]
                order.url = 'name'
        }
        //Atrapo si no viene query param de page
        var page_nu = 0
        function pagina() {
            if (req.query.page) { page_nu = parseInt(req.query.page) - 1 }
            return page_nu
        }
        page_nu = pagina()

        //Atrapo si no viene query param de page
        var tam_nu = 5
        function tamano() {
            if (req.query.size) { tam_nu = parseInt(req.query.size) }

            return tam_nu
        }
        tam_nu = tamano()
        console.log(tam_nu)

        const pagination = {
            page_number: page_nu,
            page_size: tam_nu,
            total_products: 0,
            pages: 0,
            filtered: 2,
            keyword: req.query.keywords,
            order: order.url

        };

        const finalSearch = await db.Product.findAndCountAll({
            where: {
                name: {
                    [db.Sequelize.Op.like]: '%' + req.query.keywords + '%'
                }
            },
            include: [
                { association: "images" }, { association: "sizes" }
            ],
            limit: pagination.page_size,
            offset: pagination.page_size * pagination.page_number,
            distinct: true,
            order: order.query

        });

        pagination.total_products = finalSearch.count
        pagination.pages = Math.ceil(pagination.total_products / pagination.page_size)

        /*let finalSearch = productsJSON.filter(prod => prod.name.toLowerCase().includes(userSearch.toLowerCase()) ? prod : null);
        
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
*/




        res.render('categories', {
            user: req.session.user,
            menu: menu,
            user: req.session.user,
            products: finalSearch.rows,
            pagination: pagination,
            thousandGenerator: toThousand
        });

    },
    subscribe: async (req, res, next) => {

        const newSubscriberId = await db.Subscriber.max('idsubscribers');

        const newSubscriber = {
            id: newSubscriberId + 1,
            email: req.body.email,
            active: 1
        };

        db.Subscriber.create(newSubscriber);
        console.log(newSubscriber);

        res.redirect('/');

        /* const newSubscriber = {
             id: subscribersJSON[subscribersJSON.length - 1].id + 1,
             email: req.body.email,
         };
         const subscriberToSave = [...subscribersJSON, newSubscriber];
         fs.writeFileSync(subscribersPath, JSON.stringify(subscriberToSave, null, ' '));
        res.redirect('/');*/
    }
};

module.exports = indexController;