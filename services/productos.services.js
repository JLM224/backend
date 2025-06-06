const ProductosModel = require("../models/producto.model");

// Productos
// const productos = [{
//     id: 1,
//     nombre: "Coca-cola",
//     descripcion: "La mejor",
//     precio: 2500,
// },
// {
//     id: 2,
//     nombre: "Pepsi",
//     descripcion: "la segunda opcion",
//     precio: 2000,
// },
// ];

const obtenerTodosLosProductosServices = async () => {
    const productos = await ProductosModel.find();
    // find devuelve un array con todos los elementos de la coleccion
    return{
        productos,
        statusCode: 200,
    };
};

const ObtenerProductoPorIDServices = async (idProducto) => {
    const producto = await ProductosModel.findOne({_id: idProducto});
    // findOne devuelve un objeto dentro de la coleccion

    // const producto = productos.find((prod) => prod.id === Number(idProducto))

    return{
        producto,
        statusCode:200,
    }
}

const crearNuevoProductoServices = async (body) => {
    const nuevoProducto = new ProductosModel(body)
    await nuevoProducto.save();
    console.log(nuevoProducto)
    // const nuevoProducto = {
    //     //(obtener el ultimo elemento del array)
    //     id: productos[productos.length - 1]?.id + 1 || 1,
    //     nombre: body.nombre,
    //     descripcion: body.descripcion,
    //     precio: body.precio,
    // };
    // productos.push(nuevoProducto);

    return{
        msg: "Producto creado exitosamente",
        statusCode: 201,
    };
};

const actualizarProductoPorIDServices = async (idProducto, body) => {
    await ProductosModel.findByIdAndUpdate({_id: idProducto}, body)
    //findByIdAndUpdate metodo que busca por id y actualiza (primero recibe el id y luego el body)

    // //findIndex devuelve la posicion del elemento en el array
    // const indexProd = productos.findIndex((prod) => prod.id === (idProducto));

    // // para saber el producto que se quiere modificar
    // const producto = productos.find((prod) => prod.id === Number(idProducto));

    // //desestructurar body
    // const {nombre, descripcion, precio} = body
    // const productoActualizado = {
    //     id: idProducto,
    //     nombre: nombre ? nombre : producto.nombre,
    //     descripcion: descripcion ? descripcion : producto.descripcion,
    //     precio: precio ? precio : producto.precio
    // }

    // //sobrescribir el objeto anterior con el nuevo
    // productos[indexProd] = productoActualizado

    return{
        msg:"Producto actualizado",
        statusCode: 200,
    }
}

const eliminarProductoPorIDServices = async (idProducto) => {
    await ProductosModel.findByIdAndDelete({_id: idProducto})
    //findByIdAndDelete busca el producto y lo borra (se le pasa el id)

    // const indexProd = productos.findIndex((prod) => prod.id === Number(idProducto))
    // productos.splice(indexProd, 1);

    return{
        msg: "Producto eliminado",
        statusCode: 200,
    };
};

module.exports = {
    obtenerTodosLosProductosServices,
    ObtenerProductoPorIDServices,
    crearNuevoProductoServices,
    actualizarProductoPorIDServices,
    eliminarProductoPorIDServices,
}