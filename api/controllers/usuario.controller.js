const repository = new (require("../persistence/repositories/Usuario.repository"))();
const ActualizarAutobusConsumer = require("../../rabbitmq/consumers/actualizarAutobus.consumer");
const ActualizarAlumnoConsumer = require("../../rabbitmq/consumers/actualizarAlumno.consumer");

class UsuarioController {
    constructor() {
    }

    async post(req, res) {

        let obj = req.body;
        try {
            obj = await repository.post(obj);

            res.status(200).json(obj);
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    }

    async getById(req, res) {
        try {
            let id = req.params.id;
            let obj = await repository.getById(id);
            if (obj)
                return res.status(200).json(obj);
            else
                return res.status(404).json({ success: false, error: "Usuario no encontrado" });

        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    }

    async getAll(req, res) {
        try {
            let productos = await repository.getAll();
            res.status(200).json(productos);
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    }

    async put(obj, props) {
        let objSaved = await repository.getById(obj._id);
        if (objSaved) {
            for (let i = 0; i < props.length; i++) {
                let prop = props[i];
                obj[prop.key] = prop.value;
            }
        }
        else
            throw Error(`Producto ${obj._id} no encontrado`);
    }

    async delete(id) {
        let obj = await this.getById(id);
        if (obj)
            await repository.remove();
        else
            throw Error(`Producto ${id} no encontrado`);

        return obj;
    }

    async login(req, res) {
        let obj = req.body;
        try {
            obj = await repository.login(obj);

            if (obj) {
                req.session.user = obj;
                // if(obj.tipo==="Alumno"){
                //     let consumer = new ActualizarAutobusConsumer();
                //     consumer.connectToQueue(obj._id);
                // }
                // else{
                //     let consumer = new ActualizarAlumnoConsumer();
                //     consumer.connectToQueue(obj._id);
                // }

                res.status(200).json(obj);
            }
            res.status(404).json();

        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    }


}

module.exports = UsuarioController;