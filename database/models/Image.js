module.exports = function(sequelize, DataTypes) {
  const cols =  {
    idimage: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    file_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }
  
  const config = {
    tableName: 'images',
    timestamps: false
  };

  const Image = sequelize.define('Image', cols, config);

  Image.associate = function(models) {
    Image.belongsToMany(models.Product, {
      as: "products",
      through: "products_has_images",
      foreignKey: "images_idimage",
      otherKey: "products_idproducts",
      timestamps: false
    })
  }

  return Image;
};
