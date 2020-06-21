/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const cols =  {
    products_idproducts: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'products',
        key: 'idproducts'
      }
    },
    sizes_idsizes: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'sizes',
        key: 'idsizes'
      }
    },
    stock: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    }
  };
  const config = {
    tableName: 'products_has_sizes'
  };

  const Product_has_size = sequelize.define('Product_has_size',cols, config);
};
