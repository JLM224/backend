const {Router} = require("express")
const { agregarProductosCarrito,
     eliminarProductoCarritoId, 
     obtenerTodosLosProductosDelCarrito,
     pagarCarritoMp} 
     = require("../controllers/carritos.controllers")
const authMiddleware = require("../middlewars/auth.middleware")
const router = Router()

router.get("/", authMiddleware("usuario") ,obtenerTodosLosProductosDelCarrito)

router.put("/agregarProducto",authMiddleware("usuario"), agregarProductosCarrito)

router.put("/eliminarProducto", authMiddleware("usuario") ,eliminarProductoCarritoId)

router.post("/pagarCarritoMp", pagarCarritoMp)

module.exports = router