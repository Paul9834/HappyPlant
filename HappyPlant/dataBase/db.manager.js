const Sequelize = require('sequelize');

const sequelizeConnection = require("./db.connection");



/**
 * importar modelos
 */

const PropietarioModel = require("../models/propietario.model");
const DispositivoModel = require("../models/dispositivo.model");
const PlantaModel = require("../models/planta.model")

/**
 * crear modelos
 */

 const Propietario = PropietarioModel(sequelizeConnection, Sequelize);

 const Dispositivo = DispositivoModel(sequelizeConnection, Sequelize);

 const Planta = PlantaModel(sequelizeConnection, Sequelize);

/**
 * Relaciones
 */
Propietario.hasMany(Planta, { 
    foreignKey: {
        field: 'idPropietario',
        allowNull: false
    },
    onDelete : 'CASCADE'
});

Planta.belongsTo (Propietario, {
    sourceKey: 'idPropietario'
});


 /**
  * exportar base
  */

  const db = {
      Propietario,
      Dispositivo,
      Planta,
      sequelizeConnection
  }

  module.exports = db;