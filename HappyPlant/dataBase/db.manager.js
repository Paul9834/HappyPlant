const Sequelize = require('sequelize');

const sequelizeConnection = require("./db.connection");



/**
 * importar modelos
 */

const PropietarioModel = require("../models/propietario.model");

const DispositivoModel = require("../models/dispositivo.model");

const PlantaModel = require("../models/planta.model");

const RegistroDatosModel = require("../models/registroDatos.model")



/**
 * crear modelos
 */

 const Propietario = PropietarioModel(sequelizeConnection, Sequelize);

 const Dispositivo = DispositivoModel(sequelizeConnection, Sequelize);

 const Planta = PlantaModel(sequelizeConnection, Sequelize);

 const RegistroDatos = RegistroDatosModel(sequelizeConnection, Sequelize);


/**
 * Relaciones
 */

 //relacion propietario-planta
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

//Relacion planta-registro _ dispositivo-registro

Planta.hasMany(RegistroDatos, { 
    foreignKey: {
        field: 'idPlanta',
        allowNull: false
    },
    onDelete : 'CASCADE'
});

RegistroDatos.belongsTo (Planta, {
    sourceKey: 'idPlanta'
});


Dispositivo.hasMany(RegistroDatos, { 
    foreignKey: {
        field: 'idDispositivo',
        allowNull: false
    },
    onDelete : 'CASCADE'
});

RegistroDatos.belongsTo (Dispositivo, {
    sourceKey: 'idDispositivo'
});









 /**
  * exportar base
  */

  const db = {
      Propietario,
      Dispositivo,
      Planta,
      RegistroDatos,
      sequelizeConnection
  }

  module.exports = db;