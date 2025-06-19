const {Schema, model} = require("mongoose") // libreria de mongoose

const UsuariosSchema = new Schema({
    nombreUsuario: {
        type: String,
        required: [true, "Campo nombreUsuario obligatorio"],
        unique: true, //no permite dos usuarios identicos
    },
    emailUsuario: {
        type: String,
        required: [true, "Campo emailUsuario obligatorio"],
        trim: true
    },
    rolUsuario: {
        type: String,
        enum:["usuario", "admin"],
        default: "usuario"
    },
    contrasenia:{
        type: String,
        required: [true, "Campo contraseña obligatorio"],
        trim: true,
        // match: [],
    },
    idCarrito:{
        type: String,

    },
})

const UsuariosModel = model("usuarios", UsuariosSchema);
// exportamos
module.exports = UsuariosModel;