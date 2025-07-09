//router para las rutas de usuarios (2da forma)
const {Router} = require("express")
const { 
    obtenerTodosLosUsuarios,
    obtenerUsuarioPorId,
    crearNuevoUsuario,
    iniciarSesion,
    actualizarUsuario,
    eliminarUsuarioPorId,
    recuperarContraseniaUsuario,
    cambioDeContraseniaUsuarioToken,
 } = require("../controllers/usuarios.controllers");
const router = Router();
const {check} = require("express-validator");
const authMiddleware = require("../middlewars/auth.middleware");

// Obtener todos los usuarios
router.get("/usuarios", obtenerTodosLosUsuarios);
// Obtener usuario por id
router.get("/:id",[
// isMongoId => Metodo que toma el id, lo analiza y dice si coincide con el formato o no
    check("id", "Error: formato de ID no corresponde a MongoDB").isMongoId()
],obtenerUsuarioPorId)
// Crear nuevo usuario
router.post("/",[
// check => Recibe el campo que busca y retorna una ValidationChain (respuesta de la validacion)
//   recorre el body, luego las cookies, el headers , params y la query. luego se le pasa el msg
// notEmpty => Metodo que analiza si el dato que se envia esta vacio, si hay error muestra un msg
    check("nombreUsuario", "Campo Nombre vacio").notEmpty(),
// isLength => Metodo que recibe un objeto con el min y max de caracteres que debe tener el dato
    check("nombreUsuario", "Campo Nombre vacio").isLength(
        {min:5,max:30}
    ),
// isEmail => Metodo que recibe el campo y controla si tiene las expresiones regulares para saber 
//   si el formato esta bien o no
    check("emailUsuario", "Campo Email vacio").isEmail(),
    check("contrasenia", "Error, debe tener un minimo de 8 caracteres").isLength({min:8})
], crearNuevoUsuario)
// Iniciar sesion
router.post("/login", iniciarSesion)
//router.post("recoveryPass", recuperarContraseñaUsuario)
// Actualizar usuario
router.put("/:id", actualizarUsuario)
// Eliminar usuario
router.delete("/:id", eliminarUsuarioPorId)
router.post("./recoveryPassEmail", recuperarContraseniaUsuario)
router.post("./changeNewPassUser", authMiddleware("usuario") ,cambioDeContraseniaUsuarioToken)
module.exports = router;