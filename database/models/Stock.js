module.exports = function(sequelize, DataTypes) {
const cols = {
    idstock: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
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
    products_idproducts: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'products',
        key: 'idproducts'
      }
    },
    amount: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    }
  }; 
  const config = {
    tableName: 'stock'
  };
  return sequelize.define('stock', cols, config);
};
