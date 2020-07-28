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
    }
}

module.exports = productController;