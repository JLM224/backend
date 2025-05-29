//usuarios
// const usuarios = [];

const { 
    obtenerTodosLosUsuariosServices,
    obtenerUsuarioPorIdServices,
    crearNuevoUsuarioServices,
    iniciarSesionServices,
 } = require("../services/usuarios.services")

const obtenerTodosLosUsuarios = async (req,res) => {
  const {statusCode, usuarios} = await obtenerTodosLosUsuariosServices
    res.status(statusCode).json({usuarios})
}

const obtenerUsuarioPorId = async (req, res) => {
    const {statusCode, usuario} = await obtenerUsuarioPorIdServices(req.params.id)
    res.status(statusCode).json({usuario})
}

const crearNuevoUsuario = async (req,res) => {
    const {statusCode, msg} = await crearNuevoUsuarioServices(req.body)
    res.status(statusCode).json({msg})
}

const iniciarSesion = async (req, res) => {
    const {statusCode, msg} = await iniciarSesionServices(req.body)
    res.status(statusCode).json({msg});
}

// exportamos controladores
module.exports = {
    obtenerTodosLosUsuarios,
    obtenerUsuarioPorId,
    crearNuevoUsuario,
    iniciarSesion,
}