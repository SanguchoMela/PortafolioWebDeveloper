// Importar nodemailer
const nodemailer = require("nodemailer")

// Crear el transportador para el envío de correos utilizando SMTP
// const transporter = nodemailer.createTransport({
//     host: process.env.HOST_MAILTRAP,
//     port: process.env.PORT_MAILTRAP,
//     auth: {
//         user: process.env.USER_MAILTRAP,
//         pass: process.env.PASS_MAILTRAP
//     }
// })

// // Establecer la estructura del correo electrónico
// module.exports.sendMailToUser = async(userMail,token)=>{
//     // console.log(token);
//     let info = await transporter.sendMail({
//     from: process.env.USER_MAILTRAP,
//     to: userMail,
//     subject: "Verifica tu cuenta de correo electrónico",
//     html: `<a href="http://portfolio-ms.onrender.com/user/confirmar/${token}">Clic para confirmar tu cuenta</a>`,
//     });
//     console.log("Message sent: %s", info.messageId);
// }

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: process.env.HOST_MAILTRAP,
    port: process.env.PORT_MAILTRAP,
    auth: {
        user: process.env.USER_MAILTRAP,
        pass: process.env.PASS_MAILTRAP,
    }
});

const sendMailToUser = (userMail, token) => {
    let mailOptions = {
        from: process.env.USER_MAILTRAP,
        to: userMail,
        subject: "Verifica tu cuenta",
        html: `
        <h1>Sistema de gestión (Portafolios Personales 💼📄)</h1>
        <p>
        <a href="http://portfolio-ms.onrender.com/user/confirmar/${token}">Clic para confirmar tu cuenta</a>
        </p>
        <footer>Portafolios Personales te da la bienvenida!</footer>
        `
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Correo enviado: ' + info.response);
        }
    });
};