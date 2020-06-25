module.exports = function(sequelize, DataTypes) {
  const cols =  {
    idimage: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    file_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }
  
  const config = {
    tableName: 'images'
  };

  const Image = sequelize.define('Image', cols, config);

  Image.assocciate = function(models) {
    Image.belongsToMany(models.Product, {
      as: "products",
      through: "product_has_images",
      foreignKey: "images_idimage",
      otherKey: "products_idproducts",
      timestamps: false
    })
  }

  return Image;
};
