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
const { Console } = require('console');

const crudProductController = {
    index: async (req, res) => {
        const products = await db.Product.findAll();
        res.render('crudProduct',{
            productos: products
        });
        
    },
    edit: async (req,res) =>{
        const idArticulo = req.params.idArticulo;
        // const producto = products.filter(elemento => {
        //  return elemento.id == idArticulo
        // });
        const producto = await db.Product.findByPk(idArticulo, 
            {
            include: [
                {association: "images"},{association: "sizes"}
            ]
        }
        );

        const sizes = await db.Size.findAll();

       
        // const productInfo = productsInfo.filter(element => element.product_id == idArticulo);
        res.render('editarArticulo',{
            articulo: producto,
            // infoextra: productInfo,
            sizes: sizes,
            categorias: categoriesJSON
        });
    },
    update: async (req,res)=>{
        const idArticulo = req.params.idArticulo;
        const producto = products.filter(elemento => {
         return elemento.id == idArticulo
        });
        if(req.body.talles){
            // Actualiza talles
            const sizesOfProducts = await db.Product_has_size.findAll({where: {products_idproducts: idArticulo}});
            const sizes = await db.Size.findAll();
            // const productInfo = sizesOfProducts.filter(element => element.product_id == idArticulo);
            const arraySizes = [];

            // Busco y creo los talles que el producto no tenia
            for(size of req.body.talles){
                // busco el talle seleccionado entre los del producto
                await db.Product_has_size.findOrCreate({
                    where: {
                        products_idproducts:    idArticulo,
                        sizes_idsizes:      size
                    },
                });
            }
            
            // Elimino los talles que no selecciono
            console.log("ELIMINANDO TALLES");
            for(size of sizes){
                const talle = req.body.talles.find(element => element == size.idsizes);
                if(talle == undefined){
                    await db.Product_has_size.destroy({
                        where: {
                            products_idproducts:    idArticulo,
                            sizes_idsizes:      size.idsizes
                        }
                    })
                }
            }
            
        }
        else if(req.body.name){
            let articulo = {
                name : req.body.name,
                description : req.body.description,
                price : Number(req.body.price),
                creation_timestamp: new Date(),
                discontinued_timestamp: req.body.discontinued_timestamp !== undefined ? new Date() : null,
                sale : req.body.sale !== undefined ? true : false,
                new_season: req.body.new_season !== undefined ? true : false,
                discount : Number(req.body.discount),
                product_categories_idproduct_categories : 1
             }

             await db.Product.update(articulo,{
                 where: {idproducts: idArticulo}
             })
            
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
        res.redirect('/crudIndex/product/edit/'+req.params.idArticulo);
        // const obj = JSON.parse(req.body.imagenEliminada[0]);
        // console.log("ddd",obj.id);
    },
    new:async (req,res) =>{
        const newId = await db.Product.max('idproducts');

        res.render('cargaArticulo',{
            articuloId: newId+1,
            sizes: sizes,
            categorias: categoriesJSON
        });
    },
    create:(req,res)=>{
        let articulo = {
           name : req.body.name,
           description : req.body.description,
           price : Number(req.body.price),
           creation_timestamp: new Date(),
           discontinued_timestamp: req.body.discontinued_timestamp !== undefined ? new Date() : null,
           active : 1,
           color: "#FFFFFF",
           sale : req.body.sale !== undefined ? true : false,
           new_season: req.body.new_season !== undefined ? true : false,
           discount : Number(req.body.discount),
           product_categories_idproduct_categories : 1
        }


        const product = db.Product.create(articulo);
        // products.push(articulo);
        // fs.writeFileSync(pathProducts,JSON.stringify(products,null,' '));


        // let articuloInfo =  {
        //     id: productsInfo[productsInfo.length - 1].id + 1,
        //     product_id:  Number(req.body.idArticulo),
        //     color_id: 4,
        //     images: [],
        //     sizes: []
        // };
        // productsInfo.push(articuloInfo);
        // fs.writeFileSync(pathProductsInfo,JSON.stringify(productsInfo,null,' '));
        
        res.redirect('/crudIndex/product/edit/'+req.body.idArticulo);
    },
    delete:async (req,res) =>{
        const idArticulo = req.params.idArticulo;

        // const articulos = products.filter(element => element.id != idArticulo);
        // fs.writeFileSync(pathProducts,JSON.stringify(articulos,null, ''));

        // const articulosInfo =  productsInfo.filter(element => element.product_id != idArticulo);
        // fs.writeFileSync(pathProductsInfo,JSON.stringify(articulosInfo,null,' '));

        await db.Product.update(
            {active: 0},
            {where: {
                idproducts: idArticulo
            }
        });

        res.redirect('/crudIndex/product');
    },

};

module.exports = crudProductController;