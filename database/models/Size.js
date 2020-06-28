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
    tableName: 'sizes',
    timestamps: false
  };

  const Size = sequelize.define('Size', cols, config);

  Size.associate = function (models) {
    Size.belongsToMany(models.Product, {
      as: "products",
      through: "products_has_sizes",
      foreignKey: "sizes_idsizes",
      otherKey: "products_idproducts",
      timestamps: false
    })

    Size.hasMany(models.Cart_has_product, {
      as: "cart_has_products",
      foreignKey: "cart_idcart",
      timestamps: false
    })
  }



  return Size;
};
