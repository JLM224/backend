const UsuariosModel = require("../models/usuarios.model")
const argon = require("argon2");
const jwt = require("jsonwebtoken");
const { Schema } = require("mongoose");
const CarritosModel = require("../models/carrito.model");
const { registroExitoso, recuperarContraseña } = require("../helpers/mensajes.nodemailer");
const { token } = require("morgan");

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

const crearNuevoUsuarioServices = async (body) => {
    try {
    const nuevoUsuario = new UsuariosModel(body);
    // se crea el carrito para cada usuario que se crea (se le pasa el id de ese usuario)
    const carritoUsuario = new CarritosModel({idUsuario: nuevoUsuario._id})
    // hasheo de contraseña
    nuevoUsuario.contrasenia = await argon.hash(nuevoUsuario.contrasenia);
    // al nuevo usuario se le agrega el id del carrito
    nuevoUsuario.idCarrito = carritoUsuario._id;

    const {statusCode, error} = await registroExitoso(body.emailUsuario, body.nombreUsuario)

    if(statusCode === 200){
    // se guarda el nuevoUsuario
    await nuevoUsuario.save();
    // se guarda el carrito
    await carritoUsuario.save();

        return{
        msg:"Usuario creado exitosamente",
        statusCode: 201};
    }else{
        return {
        error,
        statusCode,
        };
      }
    }catch (error) {
        console.log(error);
        return{
            error,
            statusCode: 500,
        }
    }
}

const iniciarSesionServices = async (body) => {
    // busca el usuario en la base de datos, si existe compara la contraseña, sino devuelve un error
    const usuarioExiste = await UsuariosModel.findOne({nombreUsuario: body.nombreUsuario,});

    // verifica si el usuario existe
    if(!usuarioExiste){
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
        idCarrito: usuarioExiste.idCarrito,
        rolUsuario: usuarioExiste.rolUsuario,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1h"});
    // sign es un metodo que necesita del payload y una clave secreta. retorna un string (token)
    // expiresIn se usa para poner tiempo de expiracion al token

    // Si son iguales:
    return{
        msg:"Usuario Logueado",
        token,
        rol: usuarioExiste.rolUsuario,
        statusCode: 200
    }
}

const actualizarUsuarioPorIdServices = async (idUsuario, body) => {
    await UsuariosModel.findByIdAndUpdate({_id: idUsuario}, body)
    return{
        msg:"Usuario actualizado exitosamente",
        statusCode: 200
    }
}

const eliminarUsuarioPorIdServices = async (idUsuario) => {
    await UsuariosModel.findByIdAndDelete({_id: idUsuario})
    return{
        msg:"Usuario eliminado exitosamente",
        statusCode:200
    }
}

const recuperarContraseñaUsuarioServices = async (emailUsuario) => {
    try {
        const usuarioExiste = await UsuariosModel.findOne({emailUsuario})

        if(usuarioExiste){
            const payload = {
                idUsuario: usuarioExiste._id
            }

            const tokenRecuperarContrasenia = jwt.sign(
                payload,
                process.env.JWT_SECRET_RECOVEY_PASS)
            }
            
        await recuperarContrasenia(tokenRecuperarContrasenia, usuarioExiste.emailUsuario)
        
        return{
            msg:"Mail enviado",
            statusCode: 200,
        }
    } catch (error) {
        console.log(error)
        return{
            error,
            statusCode: 500,
        }
    }
}

// exportamos
module.exports = {
    obtenerTodosLosUsuariosServices,
    obtenerUsuarioPorIdServices,
    crearNuevoUsuarioServices,
    iniciarSesionServices,
    recuperarContraseñaUsuarioServices,
    actualizarUsuarioPorIdServices,
    eliminarUsuarioPorIdServices
}