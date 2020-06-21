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
};
