module.exports = function (sequelize, DataTypes) {
    const cols = {
      iddiscount_coupons: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      code: {
        type: DataTypes.STRING(45),
        allowNull: false
      },
      used: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      percentage_amount: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      cash_amount: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
    }
    const config = {
      tableName: 'discount_coupons',
      timestamps: false
    };
  
    const DiscountCoupon = sequelize.define('Discount_coupon', cols, config);
  
    // DiscountCoupon.associate = function (models) {
  
    //   //Asosiacion 1:M
    //   Gender.hasMany(models.User, {  //Pelicula es el alias
    //     as: "users",  //Asociacion entre peliculas y genero
    //     foreignKey: "genders_idgenders"
    //   })
  
    // }
  
    return DiscountCoupon;
  
  };
  