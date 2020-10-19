const {
    response
} = require("../app");
const {
    Dispositivo
} = require("../dataBase/db.manager");
const dbManager = require("../dataBase/db.manager");


/**
 * Crea un dispositivo en la base de datos y lo retorna
 * @param {*} req : objeto json con atributos para nuevo dispositivo
 * @param {*} res : crea la consultar sql e inserta el nuevo registro, adicional retorna el objeto creado
 */
function crearDispositivo(req, res) {

    /**
     * validar request vacio
     */
    if (!req.body) {
        response.status(400).send({
            message: "Body vacio!!!"
        });
        return;
    } else {

        /**
         * creacion objeto con datos de entrada
         */
        const newDispositivoObject = {
            humedadAmbiente: req.body.humedadAmbiente,
            temperaturaAmbiente: req.body.temperaturaAmbiente,
            humedadTierra: req.body.humedadTierra,
            longitud: req.body.longitud,
        }

        /**
         * insert nuevo Propietario
         */
        dbManager.Dispositivo.create(newDispositivoObject).then(
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
 * Lista todos los dispositivos
 * @param {*} req petición
 * @param {*} res: retorna un objeto Json con todos los dispositivos
 */
async function devolverDispositivos(req, res) {

    try {

        const dispositivos = await dbManager.Dispositivo.findAll();
        res.json({
            data: dispositivos
        });
    } catch (error) {
        res.status(500).send({
            message: "Error en servidor al listar Dispositivos"
        });
    }
}

/**
 * Busca un Dispositivo por su campo idDispositivo
 * @param {*} req: idDispositivo que se desea buscar
 * @param {*} res: Objeto Json con datos del Dispositivo encontrado
 */
async function buscarDispositivoPorId(req, res) {

    try {

        const {
            idDispositivo
        } = req.params;

        const dispositivo = await dbManager.Dispositivo.findOne({
            where: {
                idDispositivo: idDispositivo
            }
        });
        res.json(dispositivo);
    } catch (error) {
        res.status(500).send({
            message: "Error en servidor al buscar Dispositivo"
        });
    }
}

/**
 * Elimina un dispositivo por su idDispositivo
 * @param {*} req idDispositivo
 * @param {*} res Mensaje informativo
 */
async function eliminarDispositivoPorId(req, res) {

    try {

        const {
            idDispositivo
        } = req.params;

        await Dispositivo.destroy({
            where: {
                idDispositivo: idDispositivo
            }
        });

        res.send({
            message: "Dispositivo Eliminado"
        });

    } catch (error) {
        res.status(500).send({
            message: "Error en servidor al eliminar Dispositivo"
        });
    }

}

/**
 * Actualiza un dispositivo por su idDispositivo
 * @param {*} req idDispositivo
 * @param {*} res Mensaje informativo
 */
async function actualizarDispositivoPorId(req, res) {
    try {
        const {
            idDispositivo
        } = req.params;
        Dispositivo
            .update({
            humedadAmbiente: req.body.humedadAmbiente,
            temperaturaAmbiente: req.body.temperaturaAmbiente,
            humedadTierra: req.body.humedadTierra,
            longitud: req.body.longitud,
            }, {
                where: {
                    idDispositivo: idDispositivo
                },
            })
            .then(() => {
                res.send("Dispositivo actualizado");
            });
    } catch (error) {
        res.status(500).send({
            message: "Error en servidor al actualizar Dispositivo",
        });
    }
}



exports.crearDispositivo = crearDispositivo;
exports.devolverDispositivos = devolverDispositivos;
exports.buscarDispositivoPorId = buscarDispositivoPorId;
exports.eliminarDispositivoPorId = eliminarDispositivoPorId;
exports.actualizarDispositivoPorID = actualizarDispositivoPorId;