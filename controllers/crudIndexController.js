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

const crudIndexController = {
    index: async (req, res) => {
        // const products = await db.Product.findAll();
        // console.log(products);
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
            sizes: sizes,
            categorias: categoriesJSON
        });
    },
    store: (req,res)=>{
        const idArticulo = req.params.idArticulo;
        const producto = products.filter(elemento => {
         return elemento.id == idArticulo
        });
        if(req.body.talles){
            // Actualiza talles
            const productInfo = productsInfo.filter(element => element.product_id == idArticulo);
            const arraySizes = [];
            for(size of req.body.talles){
                const talle = productInfo[0].sizes.find(element => element.size_id == size);
                if(talle !== undefined){
                    arraySizes.push(talle);
                }else{
                    arraySizes.push({stock:0,size_id: Number(size)});
                }
            }
            productInfo[0].sizes = arraySizes;
            newProductInfo = productsInfo.filter(element => element.product_id != idArticulo);
            newProductInfo.push(productInfo[0]);
            fs.writeFileSync(pathProductsInfo,JSON.stringify(newProductInfo,null,' '));
            
        }
        else if(req.body.name){
            // Actualiza info del producto
            producto[0].name = req.body.name;
            producto[0].price = Number(req.body.price);
            producto[0].category = Number(req.body.category);
            producto[0].discount = Number(req.body.discount);
            producto[0].subcategory = Number(req.body.subcategory);
            producto[0].description = req.body.description;
            producto[0].sale= req.body.sale !== undefined ? true : false;
            producto[0].new_season= req.body.new_season !== undefined ? true : false;
            producto[0].discontinued_timestamp= req.body.discontinued_timestamp !== undefined ? new Date() : false;
            
            const productos = products.filter(elemento => {
                return elemento.id !== idArticulo
            });

            productos.push(producto[0]);
            fs.writeFileSync(pathProducts,JSON.stringify(productos,null,' '));
        }
        else{
            const productInfo = productsInfo.filter(element => element.product_id == idArticulo);
            // Actualiza imagenes
            //Imagenes nuevas
            const imagenes = [];
            for(img of req.files){
                imagenes.push(img.filename);
            }
            //Borrar imagenes
            console.log(req.body.borrarImagen);
            for(img of productInfo[0].images){
                let borrar = "";
                    if(req.body.borrarImagen !== undefined && typeof req.body.borrarImagen == 'object'){
                        borrar = req.body.borrarImagen.find(elemento => elemento == img);
                    }else if(req.body.borrarImagen !== undefined && typeof req.body.borrarImagen == 'string'){
                        borrar = req.body.borrarImagen;
                    }
                    if(img != borrar){
                        imagenes.push(img);
                    }
            }
            // Reemplazo imagenes
            productInfo[0].images = imagenes.length > 0 ? imagenes : productInfo[0].images;

            // Reemplazo colores
            const color = colors.filter(element => element.hexa.toLowerCase() == req.body.color )
            if(color.length){
                // Solo asigno un color si existe
                productInfo[0].color_id = color[0].id;
            }else{
                // TODO: resolver con  base de datos
            }
            
            const newProductInfo = productsInfo.filter(element => element.product_id != idArticulo);
            newProductInfo.push(productInfo[0]);
            fs.writeFileSync(pathProductsInfo,JSON.stringify(newProductInfo,null,' '));
        }
        // console.log(req);
        res.redirect('/crudIndex/edit/'+req.params.idArticulo);
        // const obj = JSON.parse(req.body.imagenEliminada[0]);
        // console.log("ddd",obj.id);
    },
    nuevo:(req,res) =>{
        const idArticulo = req.params.idArticulo;
        res.render('cargaArticulo',{
            articuloId: products[products.length - 1].id + 1,
            colores: colors,
            sizes: sizes,
            categorias: categoriesJSON
        });
    },
    nuevoStore:(req,res)=>{
        let articulo = {
           id : Number(req.body.idArticulo),
           name : req.body.name,
           price : Number(req.body.price),
           category : Number(req.body.category),
           discount : Number(req.body.discount),
           subcategory : Number(req.body.subcategory),
           description : req.body.description,
           sale : req.body.sale !== undefined ? true : false,
           new_season: req.body.new_season !== undefined ? true : false,
           discontinued_timestamp: req.body.discontinued_timestamp !== undefined ? new Date() : false
        }
        products.push(articulo);
        fs.writeFileSync(pathProducts,JSON.stringify(products,null,' '));


        let articuloInfo =  {
            id: productsInfo[productsInfo.length - 1].id + 1,
            product_id:  Number(req.body.idArticulo),
            color_id: 4,
            images: [],
            sizes: []
        };
        productsInfo.push(articuloInfo);
        fs.writeFileSync(pathProductsInfo,JSON.stringify(productsInfo,null,' '));
        
        res.redirect('/crudIndex/edit/'+req.body.idArticulo);
    },
    borrar:(req,res) =>{
        const idArticulo = req.params.idArticulo;

        const articulos = products.filter(element => element.id != idArticulo);
        fs.writeFileSync(pathProducts,JSON.stringify(articulos,null, ''));

        const articulosInfo =  productsInfo.filter(element => element.product_id != idArticulo);
        fs.writeFileSync(pathProductsInfo,JSON.stringify(articulosInfo,null,' '));

        res.redirect('/crudIndex');
    },

};

module.exports = crudIndexController;