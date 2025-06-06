//router para las rutas de usuarios (2da forma)
const {Router} = require("express");
const { 
    obtenerTodosLosUsuarios,
    obtenerUsuarioPorId,
    crearNuevoUsuario,
    iniciarSesion,
    actualizarUsuario,
    eliminarUsuarioPorId,
 } = require("../controllers/usuarios.controllers");
const router = Router();

// obtener todos los usuarios
router.get("/usuarios", obtenerTodosLosUsuarios);
// obtener usuario por id
router.get("/:id", obtenerUsuarioPorId)
// crear nuevo usuario
router.post("/", crearNuevoUsuario)
// iniciar sesion
router.post("/login", iniciarSesion)
// actualizar usuario
router.put("/:id", actualizarUsuario)
// eliminar usuario
router.delete("/:id", eliminarUsuarioPorId)

module.exports = router;