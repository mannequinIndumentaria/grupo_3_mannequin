module.exports = function(sequelize, DataTypes) {
  const cols = {
    products_idproducts: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'products',
        key: 'idproducts'
      }
    },
    colors_idcolors: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'colors',
        key: 'idcolors'
      }
    }
  };
  const config = {
    tableName: 'products_has_colors'
  };
  return sequelize.define('products_has_colors', cols, config);
};
