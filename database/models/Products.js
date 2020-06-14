module.exports = (sequelize, dataTypes) => {
    const cols = {
        idproducts: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        },
        description: {
            type: dataTypes.INTEGER
        },
        price: {
            type: dataTypes.INTEGER
        },
        creation_timestamp: {
            type: dataTypes.DATE
        },
        discontinued_timestamp: {
            type: dataTypes.DATE
        },
        active: {
            type: dataTypes.INTEGER
        }
    };


    const config = {
        tableName: "products",
        timestamps: false
    }

    return sequelize.define('Product', cols, config);
}
