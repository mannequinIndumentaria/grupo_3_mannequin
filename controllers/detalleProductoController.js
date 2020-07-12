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
const productoNS = require('../services/carrouselNS');
const productoS = require('../services/carrouselS');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
let menu = require('../services/menu');
let db = require('../database/models');

const detalleProductoController = {
    detalleProducto: async (req, res) => {
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
        
        

        const producto =  await db.Product.findByPk(req.params.id,{
            include: [
                {
                association: "sizes"
                },
                {
                  association: "images"
                }
              ]
        })

        const productosDelGrupo =  await db.Product.findAll({
            where: {group: producto.group},
            include: [
                {
                association: "sizes"
                },
                {
                  association: "images"
                }
              ]
        })
        console.log("asdfASDFASDFASDFASDFASDFASDFASDFASDFASDFASDFASDF",producto.images[0].idimage);
        res.render('detalleProducto', {
            user: req.session.user,
            menu: menu, 
            productsOnSite: producto,
            productsOnSiteGroup: productosDelGrupo,
            productosNewSeason: productsNewSeason,
            productosSale: productsSale,
            thousandGenerator: toThousand
        });
    }
};

module.exports = detalleProductoController;