/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const cols =  {
    products_idproducts: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'products',
        key: 'idproducts'
      }
    },
    sizes_idsizes: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'sizes',
        key: 'idsizes'
      }
    },
    stock: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    }
  };
  const config = {
    tableName: 'products_has_sizes',
    timestamps: false
  };

  const Product_has_size = sequelize.define('Product_has_size',cols, config);

  // Product_has_size.associate = function(models){
  //   Product_has_size.belongsTo(models.Product,{
  //     as:"product",
  //     foreingKey: "products_idproducts"
  //   })
  //   Product_has_size.belongsTo(models.Size,{
  //     as:"size",
  //     foreingKey: "sizes_idsizes"
  //   })

  // };

  return Product_has_size;
};
