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

/*Filtro products por Nueva Temporada y Sale*/
const productosNewSeason = productsJSON.filter(pdto => pdto.new_season == true);
const productosSale = productsJSON.filter(pdto => pdto.sale == true);

const indexController = {
    index: (req,res) => {
            /*Array vacio*/
            const productos = [];
        for (const item of productosNewSeason) {
            /*Buscar imagen*/
            const imgItem = productsInfoJSON.filter( element => element.product_id == item.id)
            /*Crear nuevo array para almecenar propiedades puntuales*/
            const productosNewArray = {
                id : item.id,
                name : item.name,
                price : item.price,
                img : imgItem[0].images[0]
            }
            console.log(imgItem[0].images[0]);
        productos.push(productosNewArray);
        }
        res.render('index', {
            categoriesJSON,
            productosNewSeason: productos            
        });
    }
};

module.exports = indexController;