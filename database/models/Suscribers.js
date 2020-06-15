module.exports = function(sequelize, DataTypes) {
const cols = {
    idsuscribers: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    active: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '1'
    },
    creation_timestamp: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    delete_timestamp: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  };
  const config ={
    tableName: 'suscribers'
  };
  return sequelize.define('suscribers', cols, config);
};
