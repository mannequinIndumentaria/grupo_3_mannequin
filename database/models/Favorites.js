module.exports = function(sequelize, DataTypes) {
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
    active: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '1'
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
    tableName: 'favorites'
  };
  return sequelize.define('favorites', cols, config);

};
