const path = require('path');
const fs= require('fs');
const pathProducts = path.join("data","products.json");
const fileProducts = fs.readFileSync(pathProducts,null,'');
const products = JSON.parse(fileProducts);

const pathProductsInfo = path.join("data","products-info.json");
const fileProductsInfo = fs.readFileSync(pathProductsInfo,null,'');
const productsInfo = JSON.parse(fileProductsInfo);

const pathFavorites = path.join("data","favorites.json");
const fileFavorites = fs.readFileSync(pathFavorites,null,'');
const favorites = JSON.parse(fileFavorites);

const pathCarrito = path.join("data","cart.json");
const fileCarrito = fs.readFileSync(pathCarrito,null,'');
const carrito = JSON.parse(fileCarrito);

const pathColor = path.join("data","colors.json");
const fileColor = fs.readFileSync(pathColor,null,'');
const colores = JSON.parse(fileColor);

/*Requerir modulos categories*/
const categoriesFilePath = path.join(__dirname, '../data/categories.json');
const categoriesJSON = JSON.parse(fs.readFileSync(categoriesFilePath, 'utf-8'));

/*Requerir modulos carrousel*/
const productoNS = require('../services/carrouselNS');
const productoS = require('../services/carrouselS');

/*Importo conversor*/
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
let menu = require('../services/menu');
const db = require('../database/models');
const Size = require('../database/models/Size');

const carritoController = {
    carrito: async (req,res) => {
        const productsNewSeason = await db.Product.findAll({
            where: {
                new_season: 1
            },
            include: [
                { association: "images" }
            ]
        })

        const productsSale = await db.Product.findAll({
            where: {
                sale: 1
            },
            include: [
                { association: "images" }
            ]
        })

        const articulosParaLaVista = [];
        // Valor que me llego por parametro
        const id_user = req.params.userId;
        // Filtro de carrito los articulos del usuario
            // const carritoDelUsuario = await db.Cart.findOne(
            //     {
            //         where: {users_idusers: id_user},
            //     }
            // )

            // console.log("LKJBELKFBLFKJBWELFBJNWLEFKBNWE:LFJBEWLF",carritoDelUsuario);

            const carritoDelUsuario = await db.User.findAll({
                where: {idusers: id_user},
                include: [
                    {
                    association: "sizes_carrito"
                    },{
                        association: "product_carrito",
                        include: {
                            association: "images"
                        }
                        },
                  ]
            })
            // console.log("\n\n CARITOOOOOOOOOOOOOOOOO")
            // console.log("Cantidad de articulos en carrito",carritoDelUsuario[0].product_carrito.length)


            // for(let i = 0; i < carritoDelUsuario[0].product_carrito.length;i++){
            //     console.log("Articulo:",carritoDelUsuario[0].product_carrito[i].name)

            //     for(let j = 0; j < carritoDelUsuario[0].product_carrito[i].images.length;j++){
            //         console.log("Imagen n°"+j+":",carritoDelUsuario[0].product_carrito[i].images[j].file_name)
            //     }

            //     console.log("Talle:",carritoDelUsuario[0].sizes_carrito[i].name)
                
            // }
        res.render('carrito',{
            user: req.session.user,
            data: carritoDelUsuario[0],
            menu: menu,
            productosNewSeason: productoNS,
            productosSale: productoS,
            categoriesJSON,
            thousandGenerator: toThousand
        });
    },
    pagar: (req,res)=>{
        console.log(req.body);
    }

};

module.exports = carritoController;