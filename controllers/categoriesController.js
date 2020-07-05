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
let db = require('../database/models');
const { Op } = require("sequelize");
let menu = require('../services/menu');
const { Console } = require('console');


const categoriesController = {
    categories: async (req, res) => {

        const pagination = {
            page_number: parseInt(req.query.page) - 1,
            page_size: parseInt(req.query.size),
            pages: 0,
            total_products: 0,
            filtered: 0
        };

        const products = await db.Product.findAndCountAll({
            include: [
                { association: "images" }, { association: "sizes" }
            ],
            limit: pagination.page_size,
            offset: pagination.page_size * pagination.page_number,
            distinct: true
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
        let productsFinal = [];
        //const paramCategory = parseInt(req.params.category);
        const paramSubcategory = parseInt(req.params.subcategory);
        const pagination = {
            page_number: parseInt(req.query.page) - 1,
            page_size: parseInt(req.query.size),
            pages: 0,
            category: req.params.category,
            subcategory: paramSubcategory,
            total_products: 0,
            filtered: 1

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
            distinct :true
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


    }

}
module.exports = categoriesController;
