const express = require('express');
const router = express.Router();

/**
 * importar controladores
 */

const plantaController = require("../controllers/planta.controller");


/* Crear Planta */
router.post('/', plantaController.crearPlanta);
/* Mostrar Plantas */
router.get('/', plantaController.devolverPlanta);
/* Mostrar planta por ID*/
router.get('/:idPlanta', plantaController.buscarPlantaPorId);
/* Eliminar planta por ID*/
router.delete('/:idPlanta', plantaController.eliminarPlantaPorId);
/* Actualizar Planta  por ID*/
router.put('/:idPlanta', plantaController.actualizarPlantaPorId);

/* Mostrar plantas por propietario*/
router.get('/getByUser/:idPropietario', plantaController.buscarPlantasPorPropietario);

module.exports = router;