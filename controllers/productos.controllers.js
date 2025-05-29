const { 
  obtenerTodosLosProductosServices,
  ObtenerProductoPorIDServices,
  crearNuevoProductoServices,
  actualizarProductoPorIDServices,
  eliminarProductoPorIDServices,
 } = require("../services/productos.services");

const obtenerTodosLosProductos = async (req, res) => {
  const { productos, statusCode } = await obtenerTodosLosProductosServices();
  res.status(statusCode).json({ productos });
};

const obtenerUnProductoPorID = async (req, res) => {
  const { producto, statusCode } = await ObtenerProductoPorIDServices(
    req.params.id
  );
  res.status(statusCode).json({ producto });
};

const crearNuevoProducto = async (req, res) => {
  const { msg, statusCode } = await crearNuevoProductoServices(req.body);
  res.status(statusCode).json({ msg });
};

const actualizarProductoPorID = async (req, res) => {
  const { msg, statusCode } = await actualizarProductoPorIDServices(
    req.params.id,
    req.body
  );

  res.status(statusCode).json({ msg });
};

const eliminarUnProductoPorID = async (req, res) => {
  const { msg, statusCode } = await eliminarProductoPorIDServices(req.params.id);
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