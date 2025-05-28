const { 
  obtenerTodosLosProductosServices,
  ObtenerProductoPorIDServices,
  crearNuevoProductoServices,
  actualizarProductoPorIDServices,
  eliminarProductoPorIDServices,
 } = require("../services/productos.services");

const obtenerTodosLosProductos = (req, res) => {
  const { productos, statusCode } = obtenerTodosLosProductosServices();
  res.status(statusCode).json({ productos });
};

const obtenerUnProductoPorID = (req, res) => {
  const { producto, statusCode } = ObtenerProductoPorIDServices(
    req.params.id
  );
  res.status(statusCode).json({ producto });
};

const crearNuevoProducto = (req, res) => {
  const { msg, statusCode } = crearNuevoProductoServices(req.body);
  res.status(statusCode).json({ msg });
};

const actualizarProductoPorID = (req, res) => {
  const { msg, statusCode } = actualizarProductoPorIDServices(
    req.params.id,
    req.body
  );

  res.status(statusCode).json({ msg });
};

const eliminarUnProductoPorID = (req, res) => {
  const { msg, statusCode } = eliminarProductoPorIDServices(req.params.id);
  res.status(statusCode).json({ msg });
};

// exportar controladores
module.exports = {
  obtenerTodosLosProductos,
  obtenerUnProductoPorID,
  crearNuevoProducto,
  actualizarProductoPorID,
  eliminarUnProductoPorID,
};