//router para las rutas de usuarios (2da forma)
const {Router} = require("express");
const { 
    obtenerTodosLosUsuarios,
    obtenerUsuarioPorId,
    crearNuevoUsuario,
    iniciarSesion,
 } = require("../controllers/usuarios.controllers");
const router = Router();

router.get("/usuarios", obtenerTodosLosUsuarios);
router.get("/:id", obtenerUsuarioPorId)
router.post("/", crearNuevoUsuario)
router.post("/login", iniciarSesion)

module.exports = router;