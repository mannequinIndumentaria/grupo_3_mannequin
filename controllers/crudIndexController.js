const path = require('path');
const fs= require('fs');
const pathProducts = path.join("data","products.json");
const fileProducts = fs.readFileSync(pathProducts,null,'');
const products = JSON.parse(fileProducts);
const categoriesFilePath = path.join(__dirname, '../data/categories.json');
const categoriesJSON = JSON.parse(fs.readFileSync(categoriesFilePath, 'utf-8'));
const pathProductsInfo = path.join("data","products-info.json");
const fileProductsInfo = fs.readFileSync(pathProductsInfo,null,'');
const productsInfo = JSON.parse(fileProductsInfo);
const pathSizes = path.join("data","sizes.json");
const fileSizes = fs.readFileSync(pathSizes,null,'');
const sizes = JSON.parse(fileSizes);
const pathColors = path.join("data","colors.json");
const fileColors = fs.readFileSync(pathColors,null,'');
const colors = JSON.parse(fileColors);
const db = require('../database/models');
const { Console } = require('console');

const crudIndexController = {
    index: async (req, res) => {
        res.render('crudIndex');
    },

};

module.exports = crudIndexController;