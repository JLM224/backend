//router para las rutas de usuarios (2da forma)
const {Router} = require("express");
const { 
    obtenerTodosLosUsuarios,
 } = require("../controllers/usuarios.controllers");
const router = Router();

router.get("/usuarios", obtenerTodosLosUsuarios)

module.exports = router