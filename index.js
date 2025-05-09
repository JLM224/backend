const express = require("express")
const app = express() //se ejecuta express como un metodo, retorna un objeto

//endpoint (funcion donde la solicitud del cliente va a ser procesada y se le da una solucion) tiene ruta y controlador
app.get("/", (req, res) => {
    //request: req => solicitud del cliente (front) al servidor (back)
    //response: res => respuesta del servidor (back) al cliente (front)
    //la response siempre va acompañada de un metodo status que indica el resultado final de la response
    res.status(200).json({msg:"Metodo Get desde el back"})
})
app.post("/", (req, res) => {
    res.status(200).json({msg:"Metodo Post desde el back"})
})
app.put("/", (req, res) => {
    res.status(200).json({msg:"Metodo Put desde el back"})
})
app.delete("/", (req, res) => {
    res.status(200).json({msg:"Metodo Delete desde el back"})
})
// Mientras el metodo sea distinto la ruta puede ser la misma
// Mientras el metodo y la ruta sean distintos no hay problema
app.listen(3001, () => {//listen es el metodo que levante el servidor(se le asigna un puerto, servidor no es funcional)
    console.log("servidor ejecutandose en el puerto:", 3001)
})