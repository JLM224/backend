// Existen varias formas de conectarse con Mercado Pago
// Hay dos problemas: No es un modulo facil de entender, su documentacion es algo precaria, y existen
// varios tutoriales en youtube donde tratan de explicarlo pero no siempre estan actualizados ya que 
// mercado pago se actualiza constantemente (3/4 meses)


// Pago Online y Pago Presenciales no son para plataformas externas

// Usamos Plataformas de e-commerce. Elegimos checkout API que nos permite conectar el backend, 
// el server a Mercado Pago a traves de Node y te devuelve dos maneras de mostrarlo:
// 1) Modal
// 2) Diseño propio de MP

// Seleccionamos donde dice Como integrar 3DS con Checkout API donde vamos a encontrar distintas 
// formas de conectar MP con los diferentes lenguajes de programacion 

// STATUS DE MERCADO PAGO:
// 1-Pending
// 2-Success
// 3-Fail

// "CREACION DE APLICACION"
// Buscamos en el navegador mercadopago dev abre una vista para desarrolladores, nos vamos a donde 
// dice "tus integraciones". Si es la primera vez que se hace una aplicacion con MP seleccionamos 
// el boton crear aplicacion. Seguimos los siguientes pasos:
// Nombre de la Aplicacion: (un nombre cualquiera)
// Seleccionamos la opcion de pago online
// Donde nos preguntan si utilizamos una plataforma de e-commerce seleccionamos No
// Donde nos preguntan cual es el servicio que vamos a integrar seleccionamos CheckoutAPI
// En el check de los datos, le hacemos click y creamos la aplicacion (ES REAL)

// Mercado Pago en la parte de desarrollo no nos permite jugar con una prueba real porque se necesita
// de un Vendedor y un Comprador (DEBEN SER FALSOS). Cuando todo funciona se pasa a ser el vendedor.

// "CREACION DE CUENTAS DE PRUEBA"
// Nos vamos a donde dice "cuentas de prueba", crear cuenta de prueba:
// En identificacion de cuenta ponemos "vendedor", damos click en autorizo... y creamos la cuenta.
// Creamos otra cuenta que diga "comprador"
// Una vez creadas ambas cuentas de prueba, vamos a necesitar un navegador aparte para tener ambas 
// cuentas abiertas en distintos navegadores.
// En el otro navegador le damos a ingresar, copiamos el usuario de prueba y la contraseña de prueba
// En un blog de notas guardamoss esos datos de ambos usuarios
// Con la cuenta de prueba le damos a "tus integraciones", y creamos una aplicacion falsa
// Si estamos utilizando una cuenta de prueba no se puede crear más dentro de la misma
// Vamos a donde dice "credenciales de produccion"

// "CONFIGURACION (INSTALAR MP EN EL BACK)"
// Nuestro servidor va a mandarle informacion a MP (tenemos que instalar Mercado Pago)
// En npm.js.com buscamos mercadopago y elegimos la que dice SDK for Node
// En nuestro backend lo instalamos (npm i mercadopago)
// Aqui le vamos a pasar nuestro Usuario, Id, el Carrito (array de compras)
// En la documentacion buscamos "CheckoutPro" y le damos click en "etapas de integracion" y en
// "configurar ambiente de desarrollo".
// Copiamos el SDK de Mercado Pago (Node)

// "CREAR PREFERENCIA"
// La preferencia de pago es un objeto que representa el producto o servicio que se desea 
// cobrar/pagar
// Vamos hacer la preferencia a traves de los datos del cliente, nosotros podemos hacer varias 
// configuraciones en cuanto a lo que es la preferencia.
// La preferencia va acompañada de un objeto(body) compuesto por items(carrito) y 
// back_urls(son redirecciones que llevan al cliente a una determinada parte de la pagina de acuerdo
// a si salio bien el pago de los productos debe ser configurada por el front)
//  y el auto_return: que se autoretorna la aplicacion si se hace el success

// EL init point es el link de pago: cuando el server le retorna la respuesta al cliente abre en una
// pestaña nueva la direccion de Mercado Pago (superpone a la nuestra)
// El Id: abre un modal dentro de tu aplicacion y el usuario tiene un iframe (una pag dentro de otra)

// "FORMAS DE PAGO"
// En Mercado Pago cuando se va a pagar un producto, en el modal aparece el nombre, precio y el total
// Pero cuando son dos o más productos ya en el modal no estan los nombres de esos productos, sino 
// que los engloba como "productos" y nos dice el total a pagar 
// (sumando los unit_price de cada producto)

// "CARRITO" (como obtener los productos que compre)
// Tiene el id del usuario y tiene un array que contiene los "productos"
// Cuando la request vaya al servidor va a necesitar del token para sacar el id del carrito, busque 
// los productos que tengo dentro de ese carrito y los devuelva al frontend donde se van a mostrar 
// los productos uno por uno.

// "INTEGRACION FRONTEND (2 formas)"
// 1ERA FORMA (NOS LLEVA A LA PAGINA DE MERCADO PAGO)
// Creamos un boton de pagar en la parte del carrito donde devuelve una url como respuesta lo que
// nos lleva a la pagina de mercado pago que se sobrepone a la nuestra.
// OTRO METODO DE PAGO (TARJETA)
// Elegir otro metodo de pago, buscamos la tarjeta de prueba y copiamos el numero (visa), en el 
// nombre del titular le ponemos "APRO", elegimos las cuotas y le damos a pagar.
// Al pagar nos tendría que aparecer un boton de "volver al sitio" en el back donde pusimos 
// las back_url tienen que estar con un https por eso se recomienda tener un frontend que ya este 
// deployado (vercerl, netlify) y lo van a retornar al usuario a la vista del carrito para que crea
// que nunca salio de la aplicacion. Al carrito si fue aprobado el pago lo limpia.

// 2DA FORMA (ABRE UN MODAL DENTRO DE NUESTRA APLICACION) (INSTALAR MP EN REACT)
// Necesitamos instalar mercado pago desde el lado de react (npm i @mercadopago/sdk-react)
// Copiamos esto y lo importamos:
// import { initMercadoPago } from '@mercadopago/sdk-react'
// En la funcion del boton pagar pegamos esto: initMercadoPago('YOUR_PUBLIC_KEY')
// Debemos pasarle la PUBLIC_KEY que la obtenemos de la cuenta de prueba (del vendedor)
// En credenciales de produccion esta la public_key, la guardamos en la variable de entorno
// Tambien importamos el modulo wallet, lo colocamos debajo del boton pagar en el codigo,
// Tiene una propiedad llamada "initialization" que recibe un objeto y este a su vez recibe el 
// "preferenceId" (lo sacamos del backend donde en vez de devolver el init_point cambiamos a res.id)
// Esa propiedad la sacamos de un estado (lo seteamos en el boton pagar)
// y el "redirectMode" usamos el "modal" abre un iframe que sirve para pagar los productos
// Dependiendo de las back_url creamos las vistas para el cliente.