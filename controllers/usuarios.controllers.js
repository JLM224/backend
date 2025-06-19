//usuarios
// const usuarios = [];

const { 
    obtenerTodosLosUsuariosServices,
    obtenerUsuarioPorIdServices,
    crearNuevoUsuarioServices,
    iniciarSesionServices,
    actualizarUsuarioPorIdServices,
    eliminarUsuarioPorIdServices,
 } = require("../services/usuarios.services")
//  validationResult => modulo que devuelve todos los mensajes de error
 const {validationResult} = require("express-validator")

const obtenerTodosLosUsuarios = async (req,res) => {
  const {statusCode, usuarios} = await obtenerTodosLosUsuariosServices();
    res.status(statusCode).json({usuarios})
}

const obtenerUsuarioPorId = async (req, res) => {
    const {statusCode, usuario} = await obtenerUsuarioPorIdServices(req.params.id)
    res.status(statusCode).json({usuario})
}

const crearNuevoUsuario = async (req,res) => {
    const errors = validationResult(req)
    console.log(errors)
    
    // Niega que el array esta vacio y arroja un error
    if(!errors.isEmpty()){
        res
        .status(422)
        .json({msg:"Se encontraron errores en el servidor", errors: errors.array()})
    }
    const {statusCode, msg} = await crearNuevoUsuarioServices(req.body)
    try {
    res.status(statusCode).json({msg});
    } catch (error) {
        res.status(statusCode).json({error});
    }
}

const iniciarSesion = async (req, res) => {
    const {statusCode, msg, token, rol} = await iniciarSesionServices(req.body)
    res.status(statusCode).json({msg, token, rol});
}

const actualizarUsuario = async (req, res) => {
    const {statusCode, msg} = await actualizarUsuarioPorIdServices(
        req.params.id,
        req.body
    );
    res.status(statusCode).json({msg})
}

const eliminarUsuarioPorId = async (req, res) => {
    const {statusCode, msg} = await eliminarUsuarioPorIdServices(req.params.id);
    res.status(statusCode).json({msg});
}

// exportamos controladores
module.exports = {
    obtenerTodosLosUsuarios,
    obtenerUsuarioPorId,
    crearNuevoUsuario,
    iniciarSesion,
    actualizarUsuario,
    eliminarUsuarioPorId
}