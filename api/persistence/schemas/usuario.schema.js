const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
    nombre: { type: String, require: true  },
    apellidos: { type: String, require: true },
    matricula: { type: String, require: true },
    direccion: {type:String},
    tipo: {type:String}
});

module.exports = mongoose.model("usuarios", UsuarioSchema, "usuarios");