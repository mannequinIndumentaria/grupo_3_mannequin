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
const { sequelize } = require('../database/models');

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

            const carritoDelUsuarioC = await sequelize.query(`
                SELECT p.idproducts, p.name, p.description, p.price,p.discount, p.color,  i.file_name as image, s.name as size,phs.stock  FROM carts c
                INNER JOIN products p ON p.idproducts = c.products_idproducts
                INNER JOIN products_has_images phm ON phm.products_idproducts = c.products_idproducts
                INNER JOIN images i ON i.idimage = phm.images_idimage
                INNER JOIN sizes s ON s.idsizes = c.sizes_idsizes
                INNER JOIN products_has_sizes phs ON phs.products_idproducts = p.idproducts and phs.sizes_idsizes = s.idsizes
                where c.users_idusers = ${id_user}
                group by p.idproducts, s.idsizes 
            `);

            // console.log("\n\n CARITOOOOOOOOOOOOOOOOO")
            console.log("Cantidad de articulos en carrito",carritoDelUsuarioC)
        res.render('carrito',{
            user: req.session.user,
            data: carritoDelUsuarioC[0],
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