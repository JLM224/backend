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
const multerMiddleware = require("../middlewars/multer.middleware");
const router = express.Router();


// Obtener todos los productos
router.get("/",obtenerTodosLosProductos);
// Obtener producto por id
router.get("/:id",obtenerUnProductoPorID);
// Crear producto
router.post("/",multerMiddleware.single("imagen"), crearNuevoProducto);
// si se manda una imagen (single), si se mandan muchas (array)
// Actualizar producto
router.put("/:id", actualizarProductoPorID);
// Eliminar producto
router.delete("/:id", eliminarUnProductoPorID);

module.exports = router;