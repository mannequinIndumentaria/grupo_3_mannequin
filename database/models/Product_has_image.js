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
    images_idimage: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'images',
        key: 'idimage'
      }
    }
  };
  const config = {
    tableName: 'products_has_images'
  };

  const Product_has_image = sequelize.define('Product_has_image', cols, config); 
};
