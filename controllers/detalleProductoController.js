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

const detalleProductoController = {
    detalleProducto: (req, res) => {
        let prodIDparam = parseInt(req.params.id);
        let finalSearch = productsJSON.filter(prod => {
            return prod.id == prodIDparam;

        });
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

                imageArray.push(colors.images);
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

        res.render('detalleProducto', {
            user: req.session.user,
            menu: menu, 
            productsOnSite: productsFinal,
            productosNewSeason: productoNS,
            productosSale: productoS,
            thousandGenerator: toThousand
        });
    }
};

module.exports = detalleProductoController;