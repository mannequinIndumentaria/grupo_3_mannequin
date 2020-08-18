module.exports = function (sequelize, DataTypes) {
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
    users_idusers: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'idusers'
      }
    }
  };
  const config = {
    tableName: 'favorites',
    timestamps: false
  };

  const Favorite = sequelize.define('Favorite', cols, config);

  // Cart.associate = function (models) {
  //   Cart.belongsTo(models.User, {
  //     as: "users",
  //     foreignKey: "users_idusers"
  //   })
  //   Cart.hasMany(models.Cart_has_product, {
  //     as: "cart_has_products",
  //     foreignKey: "cart_idcart"
  //   })
  // }

  return Favorite;
};
