let menu = require('../../services/menu');
const db = require('../../database/models');

const categoryController = {
    getAllCategories: async (req, res) => {
        const respuesta = await db.Product_category.findAndCountAll(
            {
                where: { parent: null }
            }
        )

        if (respuesta) {
            res.json(respuesta);
        } else {
            res.json("");
        }
        
    },
    getCategoriesWithProducts: async (req, res) => {
        const respuesta = await db.sequelize.query(`SELECT name, ifnull(total,0) as total_productos,count(name) as total_categorias FROM (select pc.parent,count(p.idproducts) as total from products p
        inner join product_categories pc ON pc.idproduct_categories = p.product_categories_idproduct_categories
        group by pc.parent) as Suma
        right join product_categories pc1 ON pc1.idproduct_categories = Suma.parent
        where pc1.parent IS null
        group by name`)
        
        if (respuesta) {
            res.json(respuesta[0]);
        } else {
            res.json("");
        }
        
    }


}

module.exports = categoryController;