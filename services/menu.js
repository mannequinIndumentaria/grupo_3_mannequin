let db = require('../database/models');
const { Op } = require("sequelize");

const menu = []
async function formaMenu() {
    const categoriesDB = await db.Product_category.findAll({
        where: {
            parent: {
                [Op.is]: null
            }
        }
    })
    const subcategoriesDB = await db.Product_category.findAll({
        where: {
            parent: {
                [Op.ne]: null
            }
        }
    })


    for (category of categoriesDB) {
        //Obtengo las sub-categorías de una categoría parent
        let subcategories = subcategoriesDB.filter(element => element.parent == category.idproduct_categories);
        menu.push(
            {
                category: category,
                subcategories: subcategories
            }
        )
    }

}

formaMenu();
console.log(menu)
module.exports = menu;
