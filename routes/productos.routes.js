//router para las rutas de productos (1era forma)
const express = require("express");
const { 
    obtenerTodosLosProductos, 
    obtenerUnProductoPorID, 
    crearNuevoProducto,
    actualizarProductoPorID,
    eliminarUnProductoPorID}
    = require("../controllers/productos.controllers");
const authMiddleware = require("../middlewars/auth.middleware");
const router = express.Router();


// obtener todos los productos
router.get("/",obtenerTodosLosProductos);
// obtener producto por id
router.get("/:id",obtenerUnProductoPorID);
// crear producto
router.post("/", crearNuevoProducto);
// actualizar producto
router.put("/:id", actualizarProductoPorID);
// eliminar producto
router.delete("/:id", eliminarUnProductoPorID);

module.exports = router;