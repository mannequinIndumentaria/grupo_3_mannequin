const fs = require('fs');
const path = require('path');
const categoriesFilePath = path.join(__dirname, '../data/categories.json');
const categoriesJSON = JSON.parse(fs.readFileSync(categoriesFilePath, 'utf-8'));
const productsFilePath = path.join(__dirname, '../data/products.json');
const productsJSON = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const categoriesController = {
    categories: (req, res) => {
        res.render('categories', {
            categoriesJSON,
            productsJSON
        }
        );
    },
    filter: (req, res) => {
        const categoria = req.params.category;
        const subcategoria = req.params.subcategory;
        const desde = req.params.desde;
        const hasta = (desde+7) ;
        const articulosFiltrados = productsJSON.filter(articulo =>{
            return articulo.category == categoria && articulo.subcategory == subcategoria;
        });
        const productosEnPagina = articulosFiltrados.slice(desde,hasta);
        res.render('carrito',{data: productosEnPagina});
    }
};

module.exports = categoriesController;
