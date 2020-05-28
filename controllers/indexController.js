const fs = require('fs');
const path = require('path');
const categoriesFilePath = path.join(__dirname, '../data/categories.json');
const categoriesJSON = JSON.parse(fs.readFileSync(categoriesFilePath, 'utf-8'));

/*Importo json products*/
const productsFilePath = path.join(__dirname, '../data/products.json');
const productsJSON = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

/*Importo json products-info*/
const productsInfoFilePath = path.join(__dirname, '../data/products-info.json');
const productsInfoJSON = JSON.parse(fs.readFileSync(productsInfoFilePath, 'utf-8'));

const indexController = {
    index: (req, res) => {

        /*New Season*/

        const productosNewSeason = productsJSON.filter(pdto => pdto.new_season == true);

        const productosNS = [];
        
        for (const item of productosNewSeason) {
            const imgItem = productsInfoJSON.filter(element => element.product_id == item.id)
            const productosNewArray = {
                id: item.id,
                name: item.name,
                price: item.price,
                img: imgItem[0].images[0]
            }
            productosNS.push(productosNewArray);
        };

        /*Sale*/

        const productosSale = productsJSON.filter(pdto => pdto.sale == true);

        const productosS = [];

        for (const itemB of productosSale) {
            const imgItemB = productsInfoJSON.filter(element => element.product_id == itemB.id)
            const productosNewArrayB = {
                id: itemB.id,
                name: itemB.name,
                price: itemB.price,
                img: imgItemB[0].images[0]
            }
            productosS.push(productosNewArrayB);
        }

        /*Info del controlador a vista*/

        res.render('index', {
            categoriesJSON,
            productosNewSeason: productosNS,
            productosSale: productosS

        });
    }

};

module.exports = indexController;