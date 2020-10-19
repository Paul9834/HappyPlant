const express = require('express');
const router = express.Router();

/**
 * importar controladores
 */

const registroDatosController = require("../controllers/registroDatos.controller");


/* Crear RegistroDatos */
router.post('/', registroDatosController.crearRegistroDatos);
/* Mostrar RegistroDatos */
router.get('/', registroDatosController.devolverRegistroDatos);
/* Mostrar RegistroDatos por ID*/
router.get('/:idDispositivo', registroDatosController.buscarRegistroDatosPorId);
/* Eliminar RegistroDatos por ID */
router.delete('/:idDispositivo', registroDatosController.eliminarRegistroDatosPorId);

module.exports = router;