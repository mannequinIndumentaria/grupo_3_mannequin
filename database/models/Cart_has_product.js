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
    purchase_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    purchase_time: {
      type: DataTypes.TIME,
      allowNull: true
    }
  };
  const config = {
    tableName: 'cart_has_products',
    timestamps: false
  };

  const Cart_has_product = sequelize.define('Cart_has_product', cols, config);

  // Cart_has_product.associate = function(model){}

  Cart_has_product.associate = function(models) {
    Cart_has_product.belongsTo(models.Cart, {
      as: "cart",
      foreignKey: "cart_idcart"
    })
   
    Cart_has_product.belongsTo(models.Size, {
      as: "size",
      foreignKey: "sizes_idsizes"
    })
  
      Cart_has_product.belongsTo(models.Product, {
      as: "product",
      foreignKey: "products_idproducts"
    })
  }

  return Cart_has_product;
};
