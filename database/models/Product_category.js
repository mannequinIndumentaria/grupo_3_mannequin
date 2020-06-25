module.exports = function (sequelize, dataTypes) {
  const alias = 'Product_category';
  const cols = {
    idproduct_categories: {
      type: dataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: dataTypes.STRING(45),
      allowNull: false
    },
    active: {
      type: dataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '1'
    },
    parent: {
      type: dataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    }
  };

  const config = {
    tableName: 'product_categories',
    timestamps: false
  };

  const Product_category = sequelize.define(alias, cols, config);

  Product_category.associate = function (models) {
    Product_category.hasMany(models.Product, {
      as: "products",
      foreignKey: "product_categories_idproduct_categories"
    })
  }

  return Product_category;
};
