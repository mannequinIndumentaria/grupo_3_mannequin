let menu = require('../../services/menu');
const db = require('../../database/models');

const productController = {
    getAllProducts: async (req,res) =>{
        const respuesta = await db.Product.findAndCountAll()
        if(respuesta){
            res.json(respuesta);
        }else{
            res.json("");
        }
    },

    addToCart: async (req,res)=>{
        const usuario = Number(req.body.userId)
        const producto = Number(req.body.artId)
        // En la vista no se puede seleccionar talle por el momento
        const talle = 1
        db.Cart.create(
            {
                products_idproducts: producto,
                users_idusers: usuario,
                sizes_idsizes: talle
            }
            )
    },
    getUserCart: async (req,res)=>{
        const usuario = Number(req.params.userId)
        // En la vista no se puede seleccionar talle por el momento
        const respuesta = await db.User.findAll({
            where: {idusers: usuario},
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
        const nuevo = respuesta[0].product_carrito.map((item)=>{
            idproduct: item.idproduct
            name: item.name
            price: item.price
        })

        console.log(nuevo);

        if(respuesta){
            console.log("TE RESPONDO ESTO",respuesta[0]);
            res.send(respuesta[0]);
        }else{
            res.json("");
        }
    },
    getSizesByProductId: async (req,res)=>{
        const producto = req.params.idproduct
        // En la vista no se puede seleccionar talle por el momento
        const talles = await db.Product.findAll(
            {                   
                where: {
                    idproducts: producto
                },
                include: [
                    { association: "sizes" }
                ]
            })
        
        res.json(talles);
    },
    getAllProductsPrices: async (req,res) =>{
        const respuesta = await db.Product.findAndCountAll()
        if(respuesta){
            res.json(respuesta);
        }else{
            res.json("");
        }
    },
}

module.exports = productController;