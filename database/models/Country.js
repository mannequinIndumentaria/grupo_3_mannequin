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
      allowNull: true
    }
  };
  const config = {
    tableName: 'countries'
  };

  const Country = sequelize.define('Country', cols, config);

  // Country.associate = function(model){}
};
