module.exports = function(sequelize, DataTypes) {
  const cols = {
    idsubscribers: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    active: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  };
  const config = {
    tableName: 'subscribers'
  };
  const Subscriber = sequelize.define('Subscriber', cols,config);
};
