const UsuarioSchema = require("../schemas/usuario.schema");

class UsuarioRepository {
    constructor() {
    }

    async post(obj) {
        obj = new UsuarioSchema(obj);
        console.log(obj);

        let producto = await obj.save();
        return producto;
    }

    async getById(id) {
        let obj = await UsuarioSchema.findOne({ _id: id });
        return obj;
    }

    async getAll() {
        let obj = await UsuarioSchema.find();
        return obj;
    }

    put(obj, props) {
        let objSaved = this.getById(obj._id);
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
            await obj.remove();
        else
            throw Error(`Producto ${id} no encontrado`);

        return obj;
    }

    async login(usu) {
        usu = await UsuarioSchema.findOne({ matricula: usu.matricula, nip: usu.nip });
        return usu;
    }
}

module.exports = UsuarioRepository;