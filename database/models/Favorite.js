module.exports = function(sequelize, DataTypes) {
  const cols =  {
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
    tableName: 'favorites'
  };

  const Favorite = sequelize.define('Favorite',cols, config);

  // Favorite.associate = function(model){}
};
