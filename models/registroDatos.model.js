var DataTypes = require('sequelize/lib/data-types');

module.exports = (sequelize, Sequelize) => {

    const RegistroDatos = sequelize.define(
        "RegistroDatos",
        {
            idRegistro: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                unique: true,
                autoIncrement: true,
                allowNull: false
            },
            fechaRegistro: {
                type: DataTypes.DATE(0),
                allowNull: false
            }
        },
        {
            tableName: "RegistrosDatos",
            timestamps: false
        }
    );
        return RegistroDatos;
}