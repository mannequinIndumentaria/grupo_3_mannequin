module.exports = function(sequelize, DataTypes) {
  const cols = {
    idcart: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    users_idusers: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'users',
        key: 'idusers'
      }
    }
  };
  const config = {
    tableName: 'carts'
  };

  const Cart = sequelize.define('Cart', cols, config);
  
  Cart.associate = function(models){
    Cart.hasOne(models.User,{
      as:"users",
      foreingKey: "users_idusers"
    })
  }
};
