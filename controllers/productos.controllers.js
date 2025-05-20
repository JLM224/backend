const { obtenerTodosLosProductosServices,
     ObtenerProductoPorIdServices,
     crearNuevoProductoServices,
     actualizarProductoPorIdServices,
     eliminarProductoPorIdServices,
     } = require("../services/productos.services");

const obtenerTodosLosProductos = (req, res) => {
   const {productos, statusCode} = obtenerTodosLosProductosServices
    res.status(statusCode).json({productos});}

const ObtenerProductoPorId = (req, res) => {
    const {producto, statusCode} = ObtenerProductoPorIdServices(req.params.id) 
    res.status(statusCode).json({producto});
}

const crearNuevoProducto = (req, res) => {
    const {msg, statusCode} = crearNuevoProductoServices(req.body)
    res.status(statusCode).json({msg})
}

const actualizarProductoPorId = (req, res) => {
    const {msg, statusCode} = actualizarProductoPorIdServices(req.params.id, req.body);
    res.status(statusCode).json({msg})
}

const eliminarProductoPorId = (req, res) => {
    const {msg, statusCode} = eliminarProductoPorIdServices(req.params.id)
    res.status(statusCode).json({msg});
}

//exportar controladoress
module.exports = {
    obtenerTodosLosProductos,
    ObtenerProductoPorId,
    crearNuevoProducto,
    actualizarProductoPorId,
    eliminarProductoPorId
};