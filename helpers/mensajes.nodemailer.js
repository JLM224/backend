const transporter = require("../middlewars/nodemailer.middleware");

const registroExitoso = async(emailUsuario, nombreUsuario) => {
  try {
    const info = await transporter.sendMail({
    from: `"MERCADOLIBRETRUCHO" <${process.env.GMAIL_APP_USER}>`,
    to: `${emailUsuario}`,
    subject: "Tu registro fue exitoso ✔",
    text: "Aprovecha las ofertas!", // plain‑text body
    html: `
    <b>Bienvenido ${nombreUsuario}</b>
    <img src="https://i.pinimg.com/originals/54/25/43/542543c7c1393d0de444a00967551f6f.gif">
    <h2>Gracias por formar parte de nuestra pagina!</h2>
    `, // HTML body
  });
  return{
  msg:"OK",
  statusCode: 200
  }
  } catch (error) {
    return{
    error,
    statusCode: 500
    }
  }
};

const envioDeLaCompra = async() => {
  const info = await transporter.sendMail({
    from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
    to: "bar@example.com, baz@example.com",
    subject: "Hello ✔",
    text: "Hello world?", // plain‑text body
    html: "<b>Hello world?</b>", // HTML body
  });

console.log("Message sent:", info.messageId)
};

const recuperarContraseña = async(token, emailUsuario) => {
  try {
    const info = await transporter.sendMail({
    from: `"MERCADOLIBRETRUCHO" <${process.env.GMAIL_APP_USER}>`,
    to: `${emailUsuario}`,
    subject: "Recuperar Contraseña ✔",
    text: "Ya falta poco para que tengas tu nueva contraseña", // plain‑text body
    html: `
    <img src="https://i.gifer.com/89WP.gif">
    <b>Segui los siguientes pasos:</b>
    <h3>Hace click en el siguiente enlace</h3>
    <a href="http/localhost://localhost:5273/recoveryPassForm?token=${token}">Ir a la pagina</a> 
    `, // HTML body
  });
  return{
    msg: ok,
    statusCode: 200
  }
  } catch (error) {
    console.log(error)
    return{
      error,
      statusCode: 500,
    }
  }
};


module.exports = {
    registroExitoso,
    envioDeLaCompra,
    recuperarContraseña
}