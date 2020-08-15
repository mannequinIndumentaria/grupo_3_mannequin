let menu = require('../../services/menu');
const db = require('../../database/models');

const categoryController = {
    getAllCategories: async (req,res) =>{
        const respuesta = await db.Product_category.findAndCountAll()
        if(respuesta){
            res.json(respuesta);
        }else{
            res.json("");
        }
    }
}

module.exports = categoryController;