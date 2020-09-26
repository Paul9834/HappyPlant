var DataTypes = require('sequelize/lib/data-types');

module.exports = (sequelize, Sequelize) => {

    const Planta = sequelize.define(
        "plantas",
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
                type: DataTypes.BLOB("long"),
                //allowNull: false
            },
            especie:{
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            timestamps: false
        },
        {
            tableName: "plantas"
        }
    );
        return Planta;
}