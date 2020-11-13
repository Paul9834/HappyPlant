const {
    response
} = require("../app");
const {
    RegistroDatos
} = require("../dataBase/db.manager");
const dbManager = require("../dataBase/db.manager");


/**
 * Crea un registroDatos en la base de datos y lo retorna
 * @param {*} req : objeto json con atributos para nuevo registroDatos
 * @param {*} res : crea la consultar sql e inserta el nuevo registro, adicional retorna el objeto creado
 */
function crearRegistroDatos(req, res) {

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
        const newRegistroDatosObject = {
            fechaRegistro: req.body.fechaRegistro,
            idDispositivo: req.body.idDispositivo,
            idPlanta: req.body.idPlanta
        }

        /**
         * insert nuevo RegistroDatos
         */
        dbManager.RegistroDatos.create(newRegistroDatosObject).then(
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
 * Lista todos los registroDatos
 * @param {*} req petición
 * @param {*} res: retorna un objeto Json con todos los propietarios
 */
async function devolverRegistroDatos(req, res) {

    try {
        const registroDatos = await dbManager.RegistroDatos.findAll();
        res.json(
            registroDatos
        );
    } catch (error) {
        res.status(500).send({
            message: "Error en servidor al listar RegistroDatos"
        });
    }
}


/**
 * Busca un RegistroDatos por su campo idRegistro
 * @param {*} req: idRegistro que se desea buscar
 * @param {*} res: Objeto Json con datos del RegistroDatos encontrado
 */
async function buscarRegistroDatosPorId(req, res) {

    try {

        const {
            idRegistro
        } = req.params;

        const registroDatos = await dbManager.RegistroDatos.findOne({
            where: {
                idRegistro: idRegistro
            }
        });
        res.json(registroDatos);
    } catch (error) {
        res.status(500).send({
            message: "Error en servidor al buscar RegistroDatos"
        });
    }
}

/**
 * Elimina un RegistroDatos por su idRegistro
 * @param {*} req idRegistro
 * @param {*} res Mensaje informativo
 */
async function eliminarRegistroDatosPorId(req, res) {

    try {

        const {
            idRegistro
        } = req.params;

        await RegistroDatos.destroy({
            where: {
                idRegistro: idRegistro
            }
        });

        res.send({
            message: "RegistroDatos Eliminado"
        });

    } catch (error) {
        res.status(500).send({
            message: "Error en servidor al eliminar RegistroDatos"
        });
    }

}

exports.crearRegistroDatos = crearRegistroDatos;
exports.devolverRegistroDatos = devolverRegistroDatos;
exports.buscarRegistroDatosPorId = buscarRegistroDatosPorId;
exports.eliminarRegistroDatosPorId = eliminarRegistroDatosPorId;