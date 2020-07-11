//const fs = require('fs');
//const path = require('path');
//const categoriesFilePath = path.join(__dirname, '../data/categories.json');
//const categoriesJSON = JSON.parse(fs.readFileSync(categoriesFilePath, 'utf-8'));
//const productsFilePath = path.join(__dirname, '../data/products.json');
//const productsJSON = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
//const productsInfoFilePath = path.join(__dirname, '../data/products-info.json');
//const productsInfoJSON = JSON.parse(fs.readFileSync(productsInfoFilePath, 'utf-8'));
//const productsColorPath = path.join(__dirname, '../data/colors.json');
//const productsColorJSON = JSON.parse(fs.readFileSync(productsColorPath, 'utf-8'));
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
let db = require('../database/models');
const { Op } = require("sequelize");
let menu = require('../services/menu');
const { Console } = require('console');

const categoriesController = {
    categories: async (req, res) => {

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
        var tam_nu = 8
        function tamano() {
            if (req.query.size) { tam_nu = parseInt(req.query.size) }

            return tam_nu
        }
        tam_nu = tamano()
        


        const pagination = {
            page_number: page_nu,
            page_size: tam_nu,
            pages: 0,
            total_products: 1,
            filtered: 0,
            order: order.url
        };



        const products = await db.Product.findAndCountAll({
            include: [
                { association: "images" }, { association: "sizes" }
            ],
            limit: pagination.page_size,
            offset: pagination.page_size * pagination.page_number,
            distinct: true,
            order: order.query
        })

        pagination.total_products = products.count
        pagination.pages = Math.ceil(pagination.total_products / pagination.page_size)

        res.render('categories',
            {
                user: req.session.user,
                menu: menu,
                products: products.rows,
                //productsOnSite: productsFinal,
                pagination: pagination,
                thousandGenerator: toThousand
            });



    },
    filter: async (req, res) => {
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
        

        let productsFinal = [];
        //const paramCategory = parseInt(req.params.category);
        const paramSubcategory = parseInt(req.params.subcategory);
        const pagination = {
            page_number: page_nu,
            page_size: tam_nu,
            pages: 1,
            category: req.params.category,
            subcategory: paramSubcategory,
            total_products: 1,
            filtered: 1,
            order: order.url

        }


        const products = await db.Product.findAndCountAll({
            where: {
                product_categories_idproduct_categories: paramSubcategory
            },

            include: [
                { association: "images" }, { association: "sizes" }
            ],
            limit: pagination.page_size,
            offset: pagination.page_size * pagination.page_number,
            distinct: true,
            order: order.query
            //            raw: true

        });

        pagination.total_products = products.count
        pagination.pages = Math.ceil(pagination.total_products / pagination.page_size)

        

        res.render('categories',
            {
                user: req.session.user,
                menu: menu,
                products: products.rows,
                productsOnSite: productsFinal,
                pagination: pagination,
                thousandGenerator: toThousand
            });
            console.log(pagination.category)
            console.log(pagination.subcategory)

    }

}

module.exports = categoriesController;
