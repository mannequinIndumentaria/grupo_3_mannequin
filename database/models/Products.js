module.exports = function(sequelize, DataTypes) {
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
      type: DataTypes.DATE,
      allowNull: false
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
    tableName: 'products'
  };

  const Product =  sequelize.define('Product',cols, config);
};
