/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
const cols = {
  idimage: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    file_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    products_has_colors_products_idproducts: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'products_has_colors',
        key: 'products_idproducts'
      }
    },
    products_has_colors_colors_idcolors: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'products_has_colors',
        key: 'colors_idcolors'
      }
    }
  };
  const config = {
    tableName: 'images'
  };
    return sequelize.define('images', cols, config);

};
