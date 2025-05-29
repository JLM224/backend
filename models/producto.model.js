const mongoose = require("mongoose") // libreria de mongoose

// Generar El Esquema (1era letra en mayuscula, se le agrega la palabra Schema)
// De mongoose se extrae el modulo "Schema" que recibe un objeto de configuracion
// La configuracion son los datos que el objeto que viene del frontend debe tener 
// para ser guardado en la base de datos.  
const ProductoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
        match: /a-zA-Z0-9/
    },
    precio: {
        type: Number,
        default: 0
    },
    descripcion: {
        type: String,
        required: true,
        trim: true
    },
    imagen: {
        type: String,
        default: "URL"
    },
    deshabilitado: {
        type: Boolean,
        default: false
    },
    fechaReg: {
        type: Date,
        default: Date.now(),
    }
})

// Creamos El Modelo
// De mongoose se extrae el modulo "model" donde le ponemos que va a buscar en la base de datos
// Le decimos que todo lo que se guarde en la coleccion de "productos" se verifique con el esquema 
// anteriormente configurado.
const ProductoModel = mongoose.model("productos", ProductoSchema)
// lo exportamos
module.exports = ProductoModel;