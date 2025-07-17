const CarritosModel = require("../models/carrito.model")
const ProductosModel = require("../models/producto.model")
const { MercadoPagoConfig, Preference } = require("mercadopago")

const obtenerTodosLosProductosDelCarritoServices = async (idCarrito) => {
    try {
        const carrito = await CarritosModel.findOne({_id: idCarrito})
        return{
            productos: carrito.productos,
            statusCode: 200,
        }
    } catch (error) {
        return{
            error,
            statusCode: 500,
        }
    }
}

const agregarProductosCarritoServices = async (idCarrito , idProducto) => {
    try {
        const carrito = await CarritosModel.findOne({_id:idCarrito})
        const producto = await ProductosModel.findOne({_id:idProducto})

        const productoExiste = carrito.productos
        .find((prod) => prod._id.toString() === producto._id.toString())

        if(productoExiste){
            return{
                msg:"El producto ya se encuentra en el carrito",
                statusCode: 422
            }
        }

        carrito.productos.push(producto)
        await carrito.save()

        return{
            msg: "Producto agregado al carrito",
            statusCode: 200
        }
    } catch (error) {
        return{
            error,
            statusCode: 500
        }
    }
}


const eliminarProductosCarritoIdServices = async (idCarrito, idProducto) => {
    try {
        const carrito = await CarritosModel.findOne({_id:idCarrito})

        const productoExiste = carrito.productos
        .find((prod) => prod._id.toString() === idProducto)

        if(!productoExiste){
            return{
                msg:"Error, El producto que intentas borrar no existe",
                statusCode: 404,
            }
        }

        const productoIndex = carrito.productos.
        findIndex((prod) => prod._id.toString() === idProducto)

        carrito.productos.splice(productoIndex, 1)

        await carrito.save()
        
        return{
            msg: "Producto eliminado",
            statusCode: 200
        }
    } catch (error) {
        return{
            error,
            statusCode: 500
        }
    }
}

const mercadoPagoServices = async(carrito) => {
    try {
    const client = new MercadoPagoConfig({ accessToken: `${process.env.ACCESS_TOKEN_MP}`, });

    const preference = new Preference(client);

const res = await preference.create({
  body: {
    items: [
      {
        title: 'Mi producto',
        quantity: 1,
        unit_price: 2000,
        currency_id: "ARS",
      }
    ],
    back_urls: {
        success: "https://localhost:5173",
        failure: "https://www.failure.com",
        pending: "https://www.pending.com",
    },
  }
})
console.log(res);
// Usar en caso de llevar al cliente a la pagina de mercado pago
// return{
//     msg: res.init_point,
//     statusCode: 200
// }
// Usar en caso de abrir un modal dentro de nuestra aplicacion en el frontend
return{
    msg: res.id,
    statusCode: 200
}
    } catch (error) {
        console.log(error)
        return{
            error,
            statusCode: 500,
        }
    }
}

module.exports = {
    obtenerTodosLosProductosDelCarritoServices,
    agregarProductosCarritoServices,
    eliminarProductosCarritoIdServices,
    mercadoPagoServices,
}