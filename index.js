const express = require("express")
const app = express() //se ejecuta express como un metodo, retorna un objeto

//middlewares
// (para que el servidor interprete el formato json)
app.use(express.json());

//rutas
app.use("/productos", require("./routes/productos.routes"))
app.use("/usuarios", require("./routes/usuarios.routes"))

app.listen(3001, () => {//listen es el metodo que levanta el servidor
// (se le asigna un puerto, servidor no es funcional)
    console.log("servidor ejecutandose en el puerto:", 3001)
})