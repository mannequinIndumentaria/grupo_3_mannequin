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
    sizes_idsizes: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'sizes',
        key: 'idsizes'
      }
    }
  };
  const config = {
    tableName: 'products_has_sizes'
  };
  return sequelize.define('products_has_sizes', cols, config);
};
