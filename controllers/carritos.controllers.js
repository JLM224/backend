const {agregarProductosCarritoServices,
     eliminarProductosCarritoIdServices,
     obtenerTodosLosProductosDelCarritoServices}
     = require("../services/carritos.services")

const obtenerTodosLosProductosDelCarrito = async (req, res) => {
    const {msg, productos, error, statusCode} =
     await obtenerTodosLosProductosDelCarritoServices(req.idCarrito)
    try {
        res.status(statusCode).json({msg, productos})
    } catch (error) {
        res.status(statusCode).json({error})
    }
}

const agregarProductosCarrito = async (req, res) => {
    const {msg,statusCode,error} = await agregarProductosCarritoServices(
    req.idCarrito, 
    req.params.idProducto)
    try {
        res.status(statusCode).json({msg})
    } catch (error) {
        res.status(statusCode).json({error})
    }
}

const eliminarProductoCarritoId = async (req, res) => {
    const {msg, statusCode, error} 
    = await eliminarProductosCarritoIdServices(req.idCarrito, res.params.idProducto)
    try {
        res.status(statusCode).json({msg})
    } catch (error) {
        res.status(statusCode).json({error})
    }
}

module.exports = {
    obtenerTodosLosProductosDelCarrito,
    agregarProductosCarrito,
    eliminarProductoCarritoId
}