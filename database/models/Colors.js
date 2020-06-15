module.exports = function(sequelize, DataTypes) {
 const cols = {
    idcolors: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    hexa: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    active: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '1'
    }
  };
  const config = {
    tableName: 'colors'
  };
  return sequelize.define('colors', cols, config);
};
