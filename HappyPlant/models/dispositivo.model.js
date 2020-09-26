var DataTypes = require('sequelize/lib/data-types');

module.exports = (sequelize, Sequelize) => {

    const Dispositivo = sequelize.define(
        "dispositivo",
        {
            idDispositivo: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                unique: true,
                autoIncrement: true,
                allowNull: false
            },
            humedadAmbiente: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            temperaturaAmbiente: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            humedadTierra: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            longitud: {
                type: DataTypes.FLOAT,
                allowNull: false
            }
        },
        {
            timestamps: false
        },
        {
            tableName: "dispositivos"
        }
    );
        return Dispositivo;
}