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
}

module.exports = productController;