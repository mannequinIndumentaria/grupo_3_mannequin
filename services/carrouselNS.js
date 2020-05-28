const fs = require('fs');
const path = require('path');

/*Importo json products*/
const productsFilePath = path.join(__dirname, '../data/products.json');
const productsJSON = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

/*Importo json products-info*/
const productsInfoFilePath = path.join(__dirname, '../data/products-info.json');
const productsInfoJSON = JSON.parse(fs.readFileSync(productsInfoFilePath, 'utf-8'));

/*New Season*/

/*Filtro json de productos*/
const productosNewSeason = productsJSON.filter(pdto => pdto.new_season == true);

/*Creo array vacio para nuevo array*/
const productosNS = [];

/*Recorro los productos filtrados: internamente filtro el json de productos-info*/
for (const item of productosNewSeason) {
    const imgItem = productsInfoJSON.filter(element => element.product_id == item.id)
    const productosNewArray = {
        id: item.id,
        name: item.name,
        price: item.price,
        img: imgItem[0].images[0]
    }

    /*Push con la nueva info al array vacio*/
    productosNS.push(productosNewArray);
}

module.exports = productosNS;