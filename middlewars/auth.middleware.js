const jwt = require("jsonwebtoken");

module.exports = (rolRuta) => (req, res, next) => {
    const token = req.header("auth");
    const verificarUsuario = jwt.verify(token, process.env.JWT_SECRET);
    console.log(verificarUsuario);

    // rutas protegidas (recibe el rol de la ruta, recibe el token y se hace la comparacion)
    // si son iguales; sigue al controlador
    if(rolRuta === verificarUsuario.rolUsuario){
        req.idCarrito = verificarUsuario.idCarrito
        req.idUsuario = verificarUsuario.usuario
        next();
    // si no son iguales 
    } else{
        res.status(401).json({msg:"No estas autorizado"});
    }
};