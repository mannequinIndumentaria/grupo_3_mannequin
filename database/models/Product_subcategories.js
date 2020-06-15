module.exports = function(sequelize, DataTypes) {
const cols = {
    idproduct_subcategories: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    product_categories_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'product_categories',
        key: 'idproduct_categories'
      }
    },
    active: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '1'
    }
  };
  const config = {
    tableName: 'product_subcategories'
  };
  return sequelize.define('product_subcategories', cols, config);
};
