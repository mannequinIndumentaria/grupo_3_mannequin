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
    sizes_idsizes: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'sizes',
        key: 'idsizes'
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
    tableName: 'carts',
    timestamps: false
  };

  const Cart = sequelize.define('Cart', cols, config);

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

  return Cart;
};
