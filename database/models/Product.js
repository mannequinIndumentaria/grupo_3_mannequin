module.exports = function (sequelize, DataTypes) {
  const cols = {
    idproducts: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    creation_timestamp: {
      type: DataTypes.DATE,
      allowNull: false
    },
    discontinued_timpestamp: {
      type: DataTypes.DATE
    },
    active: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '1'
    },
    group: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    color: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    sale: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    new_season: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    discount: {
      type: DataTypes.INTEGER(3),
      allowNull: false,
      defaultValue: '0'
    },
    product_categories_idproduct_categories: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'product_categories',
        key: 'idproduct_categories'
      }
    }
  };

  const config = {
    tableName: 'products',
    timestamps: false
  };

  const Product = sequelize.define('Product', cols, config);

  Product.associate = function (models) {
    Product.belongsToMany(models.Image, {
      as: "images",
      through: "products_has_images",
      foreignKey: "products_idproducts",
      otherKey: "images_idimage",
      timestamps: false
    })

    Product.hasMany(models.Product_has_size, {
      as: "sizes",
      foreignKey: "products_idproducts",
      timestamps: false
    })

    Product.belongsToMany(models.User, {
      as: "users",
      through: "favorites",
      foreignKey: "products_idproducts",
      otherKey: "users_idusers",
      timestamps: false
    })
    Product.belongsTo(models.Product_category,{
      as: "product_category",
      foreignKey: "product_categories_idproduct_categories",
      timestamps: false
    })
    Product.hasMany(models.Cart_has_product, {
      as: "cart_has_products",
      foreignKey: "products_idproducts",
      timestamps: false
    })
    // Product.belongsToMany(models.Favorite, {
    //   as: "favorite",
    //   through: "favorites",
    //   foreignKey: "products_idproducts",
    //   otherKey: "users_idusers",
    //   timestamps: false
    // })
  }

  return Product;
};
