const mongoose = require("mongoose")
// mongose es un ODM que controla la informacion que va a ir a la base de datos, ya que esta no la 
// analiza sino que solo la guarda

// FLUJO DE LA INFORMACION
// El cliente (frontend) envia la consulta (request) y esta llega al "Servidor" que la analiza y si 
// esa solicitud debe ir a la base de datos, primero pasa por mongoose, este controla que la info
// coincida con lo configurado, si esta todo bien recien pasa a la base de datos y si hay un error,lo 
// devuelve. 

mongoose
.connect(process.env.MONGO_CONNECT)
.then(() => console.log("base de datos conectada"))
.catch((error) => console.log(error));