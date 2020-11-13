const express = require('express');
const router = express.Router();


/**
 * importar controladores
 */

const propietarioController = require("../controllers/propietario.controller");



/* GET users listing. */
router.post('/', propietarioController.crearPropietario);

router.get('/', propietarioController.devolverPropietarios);

router.get('/:idPropietario', propietarioController.buscarPropietarioPorId);

router.get('/log/:username', propietarioController.buscarPropietarioPorUsername);

router.delete('/:idPropietario', propietarioController.eliminarPropietarioPorId);
/* Actualizar Dispositivo por ID*/
router.put('/:idPropietario', propietarioController.actualizarPropietarioPorId);

module.exports = router;