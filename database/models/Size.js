module.exports = function (sequelize, DataTypes) {
  const cols = {
    idsizes: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  };
  const config = {
    tableName: 'sizes'
  };

  const Size = sequelize.define('Size', cols, config);

  Size.associate = function (models) {
    Size.hasMany(models.Product_has_size, {
      as: "products",
      foreignKey: "sizes_idsizes"
    })
    Size.hasMany(models.Cart_has_product, {
      as: "cart_has_products",
      foreignKey: "cart_idcart"
    })
  }


  return Size
};
