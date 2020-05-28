const fs = require('fs');
const path = require('path');
const categoriesFilePath = path.join(__dirname, '../data/categories.json');
const categoriesJSON = JSON.parse(fs.readFileSync(categoriesFilePath, 'utf-8'));

const detalleProductoController = {
    detalleProducto: (req,res) => {
        res.render('detalleProducto', {
            categoriesJSON
        });
    }
};

module.exports = detalleProductoController;