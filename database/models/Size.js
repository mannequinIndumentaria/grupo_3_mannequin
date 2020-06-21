module.exports = function(sequelize, DataTypes) {
  const cols = {
    idsizes: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  };
  const config = {
    tableName: 'sizes'
  };
  
  const Size = sequelize.define('Size',cols, config);
};
