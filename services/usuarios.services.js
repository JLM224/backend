const UsuariosModel = require("../models/usuarios.model")
const argon = require("argon2");
const jwt = require("jsonwebtoken")

const obtenerTodosLosUsuariosServices = async() => {
    const usuarios = await UsuariosModel.find()

    return{
        usuarios,
        statusCode: 200
    }
}

const obtenerUsuarioPorIdServices = async(idUsuario) => {
    const usuario = await UsuariosModel.findOne({_id: idUsuario})

    return{
        usuario,
        statusCode: 200
    }
}

const crearNuevoUsuarioServices = async(body) => {
    const nuevoUsuario = new UsuariosModel(body);
    // hasheo de contraseña
    nuevoUsuario.contrasenia = await argon.hash(nuevoUsuario.contrasenia);
    // se guarda el nuevoUsuario
    await nuevoUsuario.save();

    return{
        msg:"Usuario creado exitosamente",
        statusCode: 201,
    }
}

const iniciarSesionServices = async (body) => {
    // busca el usuario en la base de datos, si existe compara la contraseña, sino devuelve un error
    const usuarioExiste = await UsuariosModel.findOne({nombreUsuario: body.nombreUsuario,});

    // verifica si el usuario existe
    if(!nombreUsuario){
        return{
            msg: "usuario y/o contraseña incorrecto. USER",
            statusCode: 400
        }
    }
    const passCheck = await argon.verify(usuarioExiste.contrasenia, body.contrasenia)
    // verify primero recibe la contraseña guardada (usuarioExiste) y luego la del body(sin encriptar)
    // Devuelve true (si son iguales) o false (si son distintas)

    // Si son distintas:
    if(!passCheck){
        return{
            msg:"usuario y/o contraseña incorrecto. PASS",
            statusCode: 400,
        }
    }

    // TOKEN
    const payload = {
        idUsuario: usuarioExiste._id,
        rolUsuario: usuarioExiste.rolUsuario,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1h"});
    // sign es un metodo que necesita del payload y una clave secreta. retorna un string (token)
    // expiresIn se usa para poner tiempo de expiracion al token

    // Si son iguales:
    return{
        msg:"Usuario Logueado",
        token,
        statusCode: 200,
    }
}

// exportamos
module.exports = {
    obtenerTodosLosUsuariosServices,
    obtenerUsuarioPorIdServices,
    crearNuevoUsuarioServices,
    iniciarSesionServices,
}