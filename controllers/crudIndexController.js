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
const pathColors = path.join("data","colors.json");
const fileColors = fs.readFileSync(pathColors,null,'');
const colors = JSON.parse(fileColors);
const db = require('../database/models');

const crudIndexController = {
    index: async (req, res) => {
        const products = await db.Product.findAll();
        console.log(products);
        res.render('crudIndex',{
            productos: products
        });
        
    },
    editar:(req,res) =>{
        const idArticulo = req.params.idArticulo;
        const producto = products.filter(elemento => {
         return elemento.id == idArticulo
        });
        const productInfo = productsInfo.filter(element => element.product_id == idArticulo);
        res.render('editarArticulo',{
            articulo: producto,
            colores: colors,
            infoextra: productInfo,
            categorias: categoriesJSON
        });
    },
    store: (req,res)=>{
        console.log("body",req.body);
        // const obj = JSON.parse(req.body.imagenEliminada[0]);
        // console.log("ddd",obj.id);
    },
    nuevo:(req,res) =>{
        res.render('nuevoArticulo');
    },
    borrar:(req,res) =>{
        console.log('estoy aca');
        const idArticulo = req.params.idArticulo;
        const articulos = products.filter(element => element.id != idArticulo);
        console.log('Articulo eliminado');
        res.redirect('/crudIndex');
        //fs.writeFileSync(pathProducts,JSON.stringify(articulos));
    },

};

module.exports = crudIndexController;