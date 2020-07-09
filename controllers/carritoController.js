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
        // const productsNewSeason = await db.Product.findAll({
        //     where: {
        //         new_season: 1
        //     },
        //     include: [
        //         { association: "images" }
        //     ]
        // })

        // const productsSale = await db.Product.findAll({
        //     where: {
        //         sale: 1
        //     },
        //     include: [
        //         { association: "images" }
        //     ]
        // })

        const articulosParaLaVista = [];
        // Valor que me llego por parametro
        const id_user = 1;
        // Filtro de carrito los articulos del usuario
            // const carritoDelUsuario = await db.Cart.findOne(
            //     {
            //         where: {users_idusers: id_user},
            //     }
            // )

            // console.log("LKJBELKFBLFKJBWELFBJNWLEFKBNWE:LFJBEWLF",carritoDelUsuario);

            const carritoDelUsuario = await db.User.findAll({
                where: {idusers: 6},
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
            console.log("\n\n CARITOOOOOOOOOOOOOOOOO")
            console.log("Cantidad de articulos en carrito",carritoDelUsuario[0].product_carrito.length)


            for(let i = 0; i < carritoDelUsuario[0].product_carrito.length;i++){
                console.log("Articulo:",carritoDelUsuario[0].product_carrito[i].name)

                for(let j = 0; j < carritoDelUsuario[0].product_carrito[i].images.length;j++){
                    console.log("Imagen n°"+j+":",carritoDelUsuario[0].product_carrito[i].images[j].file_name)
                }

                console.log("Talle:",carritoDelUsuario[0].sizes_carrito[i].name)
                
            }
            // const prod = await db.sequelize.query(`
            //     select p.idproducts, p.name, p.price, p.color, p.discount, i.file_name from products p
            //     inner join carts_has_products cp ON cp.products_idproducts = p.idproducts
            //     inner join users u ON u.idusers = cp.carts_idcarts
            //     inner join sizes z ON z.idsizes = cp.sizes_idsizes
            //     inner join products_has_images pi ON pi.products_idproducts = p.idproducts
            //     inner join images i ON i.idimage = pi.images_idimage
            //     where u.idusers = ${id_user}
            //     group by p.idproducts
            //     `);
            // console.log(prod)
            // console.log("CARRITO:",productosDelCarrito[0].products.idproducts);
        // const productosDelUsuario = await d
        // const userCart = carrito.filter(itemCarrito=>{
        //     return itemCarrito.user_id == id_user;
        // });
        // // Filtro de favoritos los articulos del usuario
        // const userFavorites = favorites.filter(itemFavorito=>{
        //     return itemFavorito.id== id_user;
        // });
        // // Hasta el momento solo tengo el id del articulo
        // // Ahora necesito buscar el resto de la informacion.
        // for (const articulo of userCart) {
        //     // Obtengo el articulo desde products
        //     const itemSinImagen = products.filter(itemProduct=> itemProduct.id == articulo.product_id);
        //     // en itemSinImagen ahora tengo el articulo completo pero sin la imagen
        //     const itemInfoExtra = productsInfo.filter(itemProductInfo=> itemProductInfo.product_id == articulo.product_id);
        //     // en itemInfoExtra ahora tengo un array que contiene la info de las diferentes imagenes/colores/stock/talles
        //     const filtroColor = colores.filter(color => color.id == articulo.color);
        //     // ahora pienso que es lo que necesito para el carrito
        //     // imagenes del color elegido, el talle elegido, la cantidad elegida, la disponible en stock y el precio.
        //     // ah! tambien tengo que saber si ese item lo tiene entre sus favoritos.
            
        //     // Necesito saber que que color eligio, y obtener la imagen de ese color, tambien el stock
        //     const datosSeleccionados = itemInfoExtra.filter(itemInfoExtra=> itemInfoExtra.color_id == articulo.color ); 
        //     // console.log("datosSeleccionados",datosSeleccionados);
        //     const stockDelTalleSeleccionado = datosSeleccionados[0].sizes.filter(itemInfoExtraSeleccionado => itemInfoExtraSeleccionado.size_id == articulo.size);
        //     // Verifico si el articulo actual del carrito esta entre los favoritos
        //     const estaEnFavoritos = userFavorites[0].products.filter(itemFav => itemFav.product_id == articulo.product_id);
        //     // me conviene crear un nuevo objeto que contenga todo.. asi no me vuelvo loco en la view.
        //     const stock = stockDelTalleSeleccionado[0].stock !== 'undefined' ? stockDelTalleSeleccionado[0].stock : 0;
        //     const itemFinal = {
        //         id: articulo.product_id,
        //         nombre: itemSinImagen[0].name,
        //         precio: itemSinImagen[0].price,
        //         cantidad: articulo.amount,
        //         talle: articulo.size,
        //         color: filtroColor[0].name,
        //         foto: datosSeleccionados[0].images[0],
        //         stock: stock,
        //         favorito: estaEnFavoritos.length > 0 ? 1 : 0
        //     }
        //     // una vez armado mi Objeto lindo lo meto en un array
        //     articulosParaLaVista.push(itemFinal);
        // }
        // console.log(articulosParaLaVista);
        res.render('carrito',{
            user: req.session.user,
            data: productosDelCarrito,
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