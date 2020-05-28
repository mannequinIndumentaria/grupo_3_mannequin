const fs = require('fs');
const path = require('path');

/*Importo json products*/
const productsFilePath = path.join(__dirname, '../data/products.json');
const productsJSON = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

/*Importo json products-info*/
const productsInfoFilePath = path.join(__dirname, '../data/products-info.json');
const productsInfoJSON = JSON.parse(fs.readFileSync(productsInfoFilePath, 'utf-8'));

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

module.exports = productosS;