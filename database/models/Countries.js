module.exports = function(sequelize, DataTypes) {
  const cols = {
    idcountries: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  };
  const config = {
    tableName: 'countries'
  };
  return sequelize.define('countries', cols, config);
};
