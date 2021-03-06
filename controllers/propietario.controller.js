const { response } = require("../app");
const { Propietario } = require("../dataBase/db.manager");
const dbManager = require("../dataBase/db.manager");


/**
 * Crea un propietario en la base de datos y lo retorna
 * @param {*} req : objeto json con atributos para nuevo propietario
 * @param {*} res : crea la consultar sql e inserta el nuevo registro, adicional retorna el objeto creado
 */
function crearPropietario (req, res){

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
        const newPropietarioObject = {
            nombrePropietario: req.body.nombrePropietario,
            fechaRegistro: req.body.fechaRegistro,
            fotoPerfil: req.body.fotoPerfil,
            email: req.body.email,
            usuario: req.body.usuario,
            pass: req.body.pass
        }

        /**
         * insert nuevo Propietario
         */
        dbManager.Propietario.create(newPropietarioObject).then(
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
 * Lista todos los propietarios
 * @param {*} req petición
 * @param {*} res: retorna un objeto Json con todos los propietarios
 */
async function devolverPropietarios(req, res){

    try {

        const propietarios = await dbManager.Propietario.findAll();
        res.json(
            {
                data: propietarios
            }
        );
    } catch (error) {
        res.status(500).send(
            {
                message: "Error en servidor al listar Propietarios"
            }
        );
    }
}


/**
 * Busca un Propietario por su campo idPropietario
 * @param {*} req: idPropietario que se desea buscar
 * @param {*} res: Objeto Json con datos del Propietario encontrado
 */
async function buscarPropietarioPorId(req, res){

    try {

        const {idPropietario} = req.params;

        const propietario = await dbManager.Propietario.findOne(
            {
                where: {
                    idPropietario: idPropietario
                }
            }
        );

        if(!propietario){
            res.send("El propietario no existe")
        }else{
            res.json(propietario);
        }
    } catch (error) {
        res.status(500).send(
            {
                message: "Error en servidor al buscar Propietario"
            }
        );
    }
}

/**
 * Busca un Propietario por su campo username
 * @param {*} req: username que se desea buscar
 * @param {*} res: Objeto Json con datos del Propietario encontrado
 */
async function buscarPropietarioPorUsername(req, res){

    try {

        const {username} = req.params;

        const propietario = await dbManager.Propietario.findOne(
            {
                where: {
                    usuario: username
                }
            }
        );

        if(!propietario){
            res.send("El propietario no existe")
        }else{
            res.json(propietario);
        }
    } catch (error) {
        res.status(500).send(
            {
                message: "Error en servidor al buscar Propietario"
            }
        );
    }
}



/**
 * Elimina un propietario por su idPropietario
 * @param {*} req idPropietario
 * @param {*} res Mensaje informativo
 */
async function eliminarPropietarioPorId(req, res){

    try{

        const {idPropietario} = req.params;

        const propietario = await dbManager.Propietario.findOne(
            {
                where: {
                    idPropietario: idPropietario
                }
            }
        );

        if(!propietario){
            res.send("El propietario no existe")
        }else{
            await Propietario.destroy({
                where: {
                  idPropietario: idPropietario
                }
            });
            res.send("Propietario eliminado")
        }



    }catch(error){
        res.status(500).send(
            {
                message: "El propietario que desea eliminar no existe"
            }
        );
    }

}

/**
 * Actualiza un propietario por su idPropietario
 * @param {*} req idPropietario
 * @param {*} res Mensaje informativo
 */
async function actualizarPropietarioPorId(req, res) {
    try {
        const {
            idPropietario
        } = req.params;
        Propietario
            .update({
                nombrePropietario: req.body.nombrePropietario,
                fotoPerfil: req.body.fotoPerfil,
                email: req.body.email,
                usuario: req.body.usuario,
                pass: req.body.pass
            }, {
                where: {
                    idPropietario: idPropietario
                },
            })
            .then(() => {
                res.send("Propietario actualizado");
            });
    } catch (error) {
        res.status(500).send({
            message: "Error en servidor al actualizar Propietario",
        });
    }
}


exports.crearPropietario = crearPropietario;
exports.devolverPropietarios = devolverPropietarios;
exports.buscarPropietarioPorId = buscarPropietarioPorId;
exports.buscarPropietarioPorUsername = buscarPropietarioPorUsername;
exports.eliminarPropietarioPorId = eliminarPropietarioPorId;
exports.actualizarPropietarioPorId = actualizarPropietarioPorId;