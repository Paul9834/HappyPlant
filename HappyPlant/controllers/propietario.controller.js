const { response } = require("../app");
const dbManager = require("../dataBase/db.manager");

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

exports.crearPropietario = crearPropietario;