//router para las rutas de productos (1era forma)
const express = require("express");
const { obtenerTodosLosProductos, 
    ObtenerProductoPorId, 
    crearNuevoProducto,
    actualizarProductoPorId, 
    eliminarProductoPorId }
    = require("../controllers/productos.controllers");
const router = express.Router()


// obtener todos los productos
router.get("/",obtenerTodosLosProductos);
// obtener producto por id
router.get("/:id",ObtenerProductoPorId);
// crear producto
router.post("/", crearNuevoProducto);
// actualizar producto
router.put("/:id", actualizarProductoPorId);
// eliminar producto
router.delete("/:id", eliminarProductoPorId);

module.exports = router;