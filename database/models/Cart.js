module.exports = function (sequelize, DataTypes) {
  const cols = {
    idcart: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    users_idusers: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
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

  Cart.associate = function (models) {
    Cart.belongsTo(models.User, {
      as: "users",
      foreignKey: "users_idusers"
    })
    Cart.hasMany(models.Cart_has_product, {
      as: "cart_has_products",
      foreignKey: "cart_idcart"
    })
  }

  return Cart;
};
