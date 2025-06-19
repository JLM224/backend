require("./db/config.db")
const express = require("express")
const app = express() //se ejecuta express como un metodo, retorna un objeto
const cors = require("cors")
const morgan = require("morgan")

//middlewares
// (para que el servidor interprete el formato json)
app.use(express.json());
// cors permite que las peticiones con distinto dominio se realicen correctamente
app.use(cors())
// morgan por cada solicitud muestra en la consola que ruta y que metodo se utiliza 
app.use(morgan("dev"))
// La seccion Network del navegador muestra la solicitudes http,
// los msg de respuesta del backend al frontend y 
// como se manda la informacion del frontend al backend.
// Fetch muestra la consulta que se hace de los verbos http 
// El Payload muestra como se manda la informacion (del frontend al backend).
// Response muestra la respuesta del backend al frontend.

//rutas
// http://localhost:3001/productos
app.use("/productos", require("./routes/productos.routes"))
// http://localhost:3001/usuarios
app.use("/usuarios", require("./routes/usuarios.routes"))

app.listen(3001, () => {//listen es el metodo que levanta el servidor
// (se le asigna un puerto, servidor no es funcional)
    console.log("servidor ejecutandose en el puerto:", 3001)
})