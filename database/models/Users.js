module.exports = function(sequelize, DataTypes) {
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
    password: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    countries_idcountries: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'countries',
        key: 'idcountries'
      }
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    document: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    birth_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    telephone: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    avatar: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    admin: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    active: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '1'
    }
  };
  const config= {
    tableName: 'users'
  };
  return sequelize.define('users', cols, config);
};
