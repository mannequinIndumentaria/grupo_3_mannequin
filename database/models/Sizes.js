module.exports = function(sequelize, DataTypes) {
const cols = {
  idsizes: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    active: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '1'
    }
  };
  const config= {
    tableName: 'sizes'
  };
  return sequelize.define('sizes', cols, config);
};
