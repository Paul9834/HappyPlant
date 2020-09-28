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
    foreignKey: 'idPropietario',
    onDelete : 'CASCADE',
});


Planta.belongsTo (Propietario, {
    foreignKey:'idReligion',
    onDelete : 'CASCADE',
});



/**
 * Relacion planta-registro _ dispositivo-registro
 */


//Relacion planta-Registro
Planta.hasMany(RegistroDatos, { 
    foreignKey: 'idPlanta',
    onDelete : 'CASCADE',
});


RegistroDatos.belongsTo (Planta, {
    foreignKey:'idPlanta',
    onDelete : 'CASCADE',
});


//Relacion dispositivo-Registro
Dispositivo.hasMany(RegistroDatos, { 
    foreignKey: 'idDispositivo',
    onDelete : 'CASCADE',
});


RegistroDatos.belongsTo (Dispositivo, {
    foreignKey:'idDispositivo',
    onDelete : 'CASCADE',
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