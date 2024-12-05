const {Sequelize} = require("sequelize")

//Conexion a la base mysql
const conexion = new Sequelize(
    "bdempresas",
    "root",
    "mysql",
    {
        host: "localhost",
        dialect: "mysql",
        timezone: "-05:00",
        logging: false,
        dialectOptions: {
            // useUTC: false,
            dateStrings: true,
        },
    }
)

module.exports = {
    conexion
}