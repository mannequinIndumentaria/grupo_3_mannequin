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
        console.log(respuesta)
    },

    addToCart: async (req,res)=>{
        const usuario = Number(req.body.userId)
        const producto = Number(req.body.artId)
        console.log("////////////////////////////////////////////////////////////////",usuario, "df", producto );
        // En la vista no se puede seleccionar talle por el momento
        const talle = 1
        await db.Cart.create(
            {
                products_idproducts: producto,
                users_idusers: usuario,
                sizes_idsizes: talle
            }
            )
    }
}

module.exports = productController;