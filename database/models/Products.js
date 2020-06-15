module.exports = (sequelize, DataTypes) => {
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
      allowNull: false,
      defaultValue: '0.00'
    },
    creation_timestamp: {
      type: DataTypes.DATE,
      allowNull: false
    },
    discontinued_timestamp: {
      type: DataTypes.DATE,
      allowNull: true
    },
    active: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '1'
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
      allowNull: true,
      defaultValue: '0'
    }
  };
  
  const config = {
    tableName: "products",
    timestamps: false
  };
  
  return sequelize.define('products', cols, config);
}
