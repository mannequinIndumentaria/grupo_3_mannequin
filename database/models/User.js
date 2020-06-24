module.exports = function (sequelize, DataTypes) {
  const cols = {
    idusers: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    birth_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    document: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    avatar: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    address_street: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    address_number: {
      type: DataTypes.INTEGER(5),
      allowNull: true
    },
    address_floor: {
      type: DataTypes.INTEGER(2),
      allowNull: true
    },
    address_dept: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    address_post_code: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    telephone: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    admin: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    genders_idgenders: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      references: {
        model: 'genders',
        key: 'idgenders'
      }
    },
    countries_idcountries: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'countries',
        key: 'idcountries'
      }
    },
    discontinued: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    }
  };

  const config = {
    tableName: 'users',
    timestamps: false
  };

  const Usuario = sequelize.define('User', cols, config);

  Usuario.associate = function (models) {
    Usuario.hasOne(models.Cart, {
      as: "carts",
      foreingKey: "users_idusers"
    })
    Usuario.belongsTo(models.Gender, {
      as: "genders",
      foreingKey: "genders_idgenders"
    })
    Usuario.belongsTo(models.Country, {
      as: "countries",
      foreingKey: "countries_idcountries"
    })
    Usuario.hasOne(models.Favorite, {
      as: "favorites",
      foreingKey: "users_idusers"
    })

    Usuario.belongsToMany(models.Product, {
      as: "product",
      through: "favorites",
      foreignKey: "users_idusers",
      otherKey: "products_idproducts",
      timestamps: false
    })
  }



  return Usuario;
};
