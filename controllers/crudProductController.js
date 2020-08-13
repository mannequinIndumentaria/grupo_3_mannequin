const path = require('path');
const fs= require('fs');
// const pathProducts = path.join("data","products.json");
// const fileProducts = fs.readFileSync(pathProducts,null,'');
// const products = JSON.parse(fileProducts);
// const categoriesFilePath = path.join(__dirname, '../data/categories.json');
// const categoriesJSON = JSON.parse(fs.readFileSync(categoriesFilePath, 'utf-8'));
// const pathProductsInfo = path.join("data","products-info.json");
// const fileProductsInfo = fs.readFileSync(pathProductsInfo,null,'');
// const productsInfo = JSON.parse(fileProductsInfo);
// const pathSizes = path.join("data","sizes.json");
// const fileSizes = fs.readFileSync(pathSizes,null,'');
// const sizes = JSON.parse(fileSizes);
// const pathColors = path.join("data","colors.json");
// const fileColors = fs.readFileSync(pathColors,null,'');
// const colors = JSON.parse(fileColors);
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

        const categorias = await db.Product_category.findAll({
            where: {
                parent: null
            }
        })
        
        const subcategoriaProducto = producto.product_categories_idproduct_categories;
        // Obtengo las subcategorias
        const subcategoria = await db.Product_category.findOne({
            where: {
                idproduct_categories: subcategoriaProducto
            }
        })
        const sizes = await db.Size.findAll();

       
        // const productInfo = productsInfo.filter(element => element.product_id == idArticulo);
        res.render('editarArticulo',{
            articulo: producto,
            // infoextra: productInfo,
            sizes: sizes,
            categorias: categorias,
            subcategoria: subcategoria
        });
    },
    update: async (req,res)=>{
        const idArticulo = req.params.idArticulo;
        const producto = await db.Product.findAll({
            where:{
                idproducts: idArticulo
            }
        })
        // TALLES DEL PRODUCTO
        if(req.body.talles){
            // Actualiza talles
            const sizes = await db.Size.findAll();
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
            for(size of sizes){
                const t = req.body.talles;
                const talle = t.find(element => element == size.idsizes);
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
        // INFORMACION DEL PRODUCTO
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
                product_categories_idproduct_categories : req.body.subcategory
             }

             await db.Product.update(articulo,{
                 where: {idproducts: idArticulo}
             })
            
        }
        // IMAGENES DEL PRODUCTO
        else{
            // imagenes nuevas
            for(img of req.files){
                const imagen = await db.Image.create(
                    {
                        file_name: img.filename,
                        idproducts: idArticulo
                    }, 
                    {
                        include:[{
                            association: 'products'
                        }]
                    }
                )
    
                await db.Product_has_image.create(
                    {
                        products_idproducts: idArticulo,
                        images_idimage: imagen.idimage
                    }
                )
            }
            // Eliminar de la tabla(images) las imagenes borradas
            // Undefined: no elimino ninguna *
            // Array (object): Elimino mas de una
            // String: Elimino solo una
            console.log("BORRARRRRRRRRRRRRR",req.body.borrarImagen)
            if(req.body.borrarImagen !== undefined){
                if(typeof req.body.borrarImagen == 'object'){
                    for(imagen of req.body.borrarImagen){
                        await db.Product_has_image.destroy({
                            where: {
                                products_idproducts: idArticulo,
                                images_idimage: imagen
                            }
                        })
                        await db.Image.destroy({
                            where: {
                                idimage: imagen
                            }
                        })
                        
                    }
                }

                if(typeof req.body.borrarImagen == 'string'){
                    await db.Product_has_image.destroy({
                        where: {
                            products_idproducts: idArticulo,
                            images_idimage: req.body.borrarImagen
                        }
                    })
                    await db.Image.destroy({
                        where: {
                            idimage: req.body.borrarImagen
                        }
                    })
                    
                }
            }
        //     const productInfo = productsInfo.filter(element => element.product_id == idArticulo);
        //     // Actualiza imagenes
        //     //Imagenes nuevas
        //     const imagenes = [];
        //     for(img of req.files){
        //         imagenes.push(img.filename);
        //     }
        //     //Borrar imagenes
        //     for(img of productInfo[0].images){
        //         let borrar = "";
        //             if(req.body.borrarImagen !== undefined && typeof req.body.borrarImagen == 'object'){
        //                 borrar = req.body.borrarImagen.find(elemento => elemento == img);
        //             }else if(req.body.borrarImagen !== undefined && typeof req.body.borrarImagen == 'string'){
        //                 borrar = req.body.borrarImagen;
        //             }
        //             if(img != borrar){
        //                 imagenes.push(img);
        //             }
        //     }
        //     // Reemplazo imagenes
        //     productInfo[0].images = imagenes.length > 0 ? imagenes : productInfo[0].images;

        //     // Reemplazo colores
        //     const color = colors.filter(element => element.hexa.toLowerCase() == req.body.color )
        //     if(color.length){
        //         // Solo asigno un color si existe
        //         productInfo[0].color_id = color[0].id;
        //     }else{
        //         // TODO: resolver con  base de datos
        //     }
            
        //     const newProductInfo = productsInfo.filter(element => element.product_id != idArticulo);
        //     newProductInfo.push(productInfo[0]);
        //     fs.writeFileSync(pathProductsInfo,JSON.stringify(newProductInfo,null,' '));
        }
        res.redirect('/crudIndex/product/edit/'+req.params.idArticulo);
        // const obj = JSON.parse(req.body.imagenEliminada[0]);
    },
    new:async (req,res) =>{
        const subc = req.query.category !== undefined ? req.query.category : 0;
        console.log("param",subc);
        const newId = await db.Product.max('idproducts');
        const categorias = await db.Product_category.findAll({where:{parent: null}});
        const subcategorias = await db.Product_category.findAll({where: {parent: subc}});
        // consultando
        if(subc != 0){
            res.send(subcategorias);
        }else{
            res.render('cargaArticulo',{
                articuloId: newId+1,
                // sizes: sizes,
                categorias: categorias
            });
        }
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
           product_categories_idproduct_categories : req.body.subcategory
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
    search: async (req, res) => {

        const finalSearch = await db.Product.findAll({
            where: {
                name: {
                    [db.Sequelize.Op.like]: '%' + req.query.keywords + '%'
                }
            }
        });

        res.render('crudProduct', {
            productos: finalSearch
        });

    }

};

module.exports = crudProductController;