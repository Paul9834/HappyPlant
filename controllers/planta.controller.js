const { response } = require("../app");
const { Planta } = require("../dataBase/db.manager");
const dbManager = require("../dataBase/db.manager");


/**
 * Crea una planta en la base de datos y lo retorna
 * @param {*} req : objeto json con atributos para nueva planta
 * @param {*} res : crea la consulta sql e inserta el nuevo registro, adicional retorna el objeto creado
 */
function crearPlanta (req, res){

    /**
     * validar request vacio
     */
    if(!req.body){
        response.status(400).send({
            message: "Body vacio!!!"
        });
        return;
    }else{

        /**
         * creacion objeto con datos de entrada
         */
        const newPlantaObject = {
            nombrePlanta: req.body.nombrePlanta,
            fotoPlanta: req.body.fotoPlanta,
            especie: req.body.especie,
            idPropietario: req.body.idPropietario
        }

        /**
         * insert nueva Planta
         */
        dbManager.Planta.create(newPlantaObject).then(
            data => {
                res.send(data);
            }
        ).catch(
            error => {
                console.log(error);
                res.status(500).send({
                    message: "Error en servidor"
                });
            }
        );
    }
}


/**
 * Lista todas las plantas
 * @param {*} req petición
 * @param {*} res: retorna un objeto Json con todos los plantas
 */
async function devolverPlanta(req, res){

    try {

        const planta = await dbManager.Planta.findAll();
        res.json(
            {
                data: planta
            }
        );
    } catch (error) {
        res.status(500).send(
            {
                message: "Error en servidor al listar Plantas"
            }
        );
    }
}


/**
 * Busca una planta por su campo idPlanta
 * @param {*} req: idPlanta que se desea buscar
 * @param {*} res: Objeto Json con datos de la planta encontrada
 */
async function buscarPlantaPorId(req, res){

    try {

        const {idPlanta} = req.params;

        const planta = await dbManager.Planta.findOne(
            {
                where: {
                    idPlanta: idPlanta
                }
            }
        );
        res.json(planta);
    } catch (error) {
        res.status(500).send(
            {
                message: "Error en servidor al buscar Planta"
            }
        );
    }
}

/**
 * Busca una planta por su campo idPropietario
 * @param {*} req: idPropietario que se desea buscar
 * @param {*} res: Objeto Json con datos de la planta encontrada
 */
async function buscarPlantasPorPropietario(req, res){

    try {

        const {idPropietario} = req.params;

        const plantas = await dbManager.Planta.findOne(
            {
                where: {
                    idPropietario: idPropietario
                }
            }
        );
        res.json(plantas);
    } catch (error) {
        res.status(500).send(
            {
                message: "Error en servidor al buscar Plantas"
            }
        );
    }
}

/**
 * Elimina una planta por su idPlanta
 * @param {*} req idPlanta
 * @param {*} res Mensaje informativo
 */
async function eliminarPlantaPorId(req, res){

    try{

        const {idPlanta} = req.params;

        await Planta.destroy({
            where: {
                idPlanta: idPlanta
            }
        });

        res.send(
            {
                message: "Planta Eliminada"
            }
        );

    }catch(error){
        res.status(500).send(
            {
                message: "Error en servidor al eliminar Planta"
            }
        );
    }

}

/**
 * Actualiza un planta por su idPlanta
 * @param {*} req idPlanta
 * @param {*} res Mensaje informativo
 */
async function actualizarPlantaPorId(req, res) {
    try {
        const {
            idPlanta
        } = req.params;
        Planta
            .update({
                nombrePlanta: req.body.nombrePlanta,
                fotoPlanta: req.body.fotoPlanta,
                especie: req.body.especie,
                idPropietario: req.body.idPropietario

            }, {
                where: {
                    idPlanta: idPlanta
                },
            })
            .then(() => {
                res.send("Planta Actualizada");
            });
    } catch (error) {
        res.status(500).send({
            message: "Error en servidor al actualizar Planta",
        });
    }
}


exports.crearPlanta = crearPlanta;
exports.devolverPlanta = devolverPlanta;
exports.buscarPlantaPorId = buscarPlantaPorId;
exports.eliminarPlantaPorId = eliminarPlantaPorId;
exports.actualizarPlantaPorId = actualizarPlantaPorId;
exports.buscarPlantasPorPropietario = buscarPlantasPorPropietario;