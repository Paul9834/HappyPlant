const express = require('express');
const router = express.Router();

/**
 * importar controladores
 */

const dispositivoController = require("../controllers/dispositivo.controller");


/* Crear Dispositivo */
router.post('/', dispositivoController.crearDispositivo);
/* Mostrar Dispositivos */
router.get('/', dispositivoController.devolverDispositivos);
/* Mostrar Dispositivo por ID*/
router.get('/:idDispositivo', dispositivoController.buscarDispositivoPorId);
/* Eliminar Dispositivo por ID*/
router.delete('/:idDispositivo', dispositivoController.eliminarDispositivoPorId);
/* Actualizar Dispositivo por ID*/
router.put('/:idDispositivo', dispositivoController.actualizarDispositivoPorID);

module.exports = router;