const Sequelize = require('sequelize');

const sequelizeConnection = require("./db.connection");



/**
 * importar modelos
 */

const PropietarioModel = require("../models/propietario.model");


/**
 * crear modelos
 */

 const Propietario = PropietarioModel(sequelizeConnection, Sequelize);

/**
 * Relaciones
 */

 //tabla.hasMany(tabla2, {foreingKey: "idt2", sourceKey: "idt1"});
 //tabla2.belongsto(tabla1, {foreingKey: "idt1", sourceKey: "idt2"});



 /**
  * exportar base
  */

  const db = {
      Propietario,
      sequelizeConnection
  }

  module.exports = db;