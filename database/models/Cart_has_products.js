module.exports = function(sequelize, DataTypes) {
  const cols = {
    cart_idcart: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'cart',
        key: 'idcart'
      }
    },
    cart_users_idusers: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'cart',
        key: 'users_idusers'
      }
    },
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
    colors_idcolors: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'colors',
        key: 'idcolors'
      }
    },
    creation_timestamp: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  };
  const config = {
    tableName: 'cart_has_products'
  };
  return sequelize.define('cart_has_products', cols, config);
};
