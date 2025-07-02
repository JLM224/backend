const multer = require("multer")
const path = require("path")

module.exports = multer({
// Le indicamos cual es la carpeta donde multer va a colocar los archivos que coincidan con las img
// diskStorage es un metodo que recibe un objeto(si se usa carpeta locales) se lo configura
storage: multer.diskStorage({
destination: (req, file, cb) => {
    cb(null, "public") // si no hay ningun error busca la carpeta public y agrega el archivo
},
filename: (req, file, cb) => {
// se obtiene la extension
    const ext = path.extname(file.originalname)
// se obtiene el nombre de la imagen 
    const nombreFinalImagen = `${file.fieldname}-${Date.now()}${ext}`
// si no hay ningun problema, que guarde el nombre final de la imagen 
    cb(null, nombreFinalImagen);
},
fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);

    if(ext !== ".jpg" && ext !== "png"){
    // muestra el error si el archivo no es aceptado
        cb(new Error("Extension no soportada"), false)
    }
    // si se acepta el archivo, lo guarda en la carpeta public
    cb(null, true)
}
}),
});