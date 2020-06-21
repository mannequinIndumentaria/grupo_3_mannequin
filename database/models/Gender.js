module.exports = function(sequelize, DataTypes) {
  const cols =  {
    idgenders: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }
  const config = {
    tableName: 'genders'
  };

  const Gender = sequelize.define('Gender',cols, config);
};
