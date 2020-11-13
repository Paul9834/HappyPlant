var DataTypes = require('sequelize/lib/data-types');

module.exports = (sequelize, Sequelize) => {

    const Planta = sequelize.define(
        "Planta",
        {
            idPlanta: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                unique: true,
                autoIncrement: true,
                allowNull: false
            },
            nombrePlanta: {
                type: DataTypes.STRING,
                allowNull: false
            },
            fotoPlanta: {
                type: DataTypes.STRING,
                //allowNull: false
            },
            especie:{
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            tableName: "plantas",
            timestamps: false
        }
    );
        return Planta;
}