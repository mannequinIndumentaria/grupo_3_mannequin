/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const cols =  {
    idproduct_categories: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    active: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '1'
    },
    parent: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    }
  };
  
  const config = {
    tableName: 'product_categories'
  };

  const Product_category = sequelize.define('Product_category',cols, config);
};
