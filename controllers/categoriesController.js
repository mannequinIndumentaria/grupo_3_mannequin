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

const categoriesController = {
    categories: async (req, res) => {
        let productsFinal = [];
        //const paramCategory = parseInt(req.params.category);
        const pagination = {
            page_number: parseInt(req.params.desde),
            page_size: 4,
            pages: 0,
            category: 0,
            subcategory: 0,
            filtered: 1
        }

        const products = await db.Product.findAll({
            include: [
                { association: "images" }, { association: "sizes" }
            ],
        }

        );
        // const pagination = {
        //     page_number: parseInt(req.params.desde),
        //     page_size: 4,
        //     pages: 0,
        //     category: req.params.category,
        //     subcategory: req.params.subcategory,
        //     filtered: 0
        // }

        // //console.log(productsDB);
        // let productsColorFoto = [];
        // for (product of productsJSON) {
        //     let productImgColor = productsInfoJSON.filter(element => {
        //         return element.product_id == product.id
        //     })
        //     imageArray = [];
        //     colorArray = [];
        //     for (const colors of productImgColor) {
        //         let color = productsColorJSON.filter(element => {
        //             return element.id == colors.color_id
        //         })
        //         colorArray.push(color);

        //         imageArray.push(colors.images[0]);
        //     }

        //     const producto = {
        //         id: product.id,
        //         name: product.name,
        //         price: product.price,
        //         colors: colorArray,
        //         image: imageArray
        //     }
        //     productsColorFoto.push(producto);
        //     pagination.pages = Math.ceil(productsColorFoto.length / pagination.page_size);

        //     productsFinal = productsColorFoto.slice((pagination.page_number - 1) * pagination.page_size, pagination.page_number * pagination.page_size);
        // }

        res.render('categories',
        {
            user: req.session.user,
            menu: menu,
            products: products,
            productsOnSite: productsFinal,
            pagination: pagination,
            thousandGenerator: toThousand
        });

        // res.render('categories', {
        //     user: req.session.user,
        //     menu: menu,
        //     categoriesJSON: categoriesJSON,
        //     productsOnSite: productsFinal,
        //     pagination: pagination,
        //     thousandGenerator: toThousand,
        // });

    },
    filter: async (req, res) => {
        let productsFinal = [];
        //const paramCategory = parseInt(req.params.category);
        const paramSubcategory = parseInt(req.params.subcategory);
        const pagination = {
            page_number: parseInt(req.params.desde),
            page_size: 4,
            pages: 0,
            category: req.params.category,
            subcategory: paramSubcategory,
            filtered: 1
        }



        const products = await db.Product.findAll({
            where: {
                product_categories_idproduct_categories: paramSubcategory
            },

            include: [
                { association: "images" }, { association: "sizes" }
            ],
//            raw: true
        }

        );
        //console.log(producto)

        /*productsFilteredCat = productsJSON.filter(article => {
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
           
        }*/
        

        console.log("Cualquier cosa",products[2].images[0].file_name)

        res.render('categories',
            {
                user: req.session.user,
                menu: menu,
                products: products,
                productsOnSite: productsFinal,
                pagination: pagination,
                thousandGenerator: toThousand
            });


    }

}
module.exports = categoriesController;
