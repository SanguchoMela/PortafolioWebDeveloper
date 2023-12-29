// Importar el modelo usuario
const User = require('../models/User')

// Importar passport.js
const passport = require("passport")

// Importar nodemailer
const { sendMailToUser } = require("../config/nodemailer")


// REGISTRO
// Mostrar el formulario de registro
const renderRegisterForm =(req,res)=>{
    res.render('user/registerForm')
}

// Capturar los datos del formulario y almacenar en BDD
const registerNewUser = async(req,res)=>{
    // Capturar los datos del body
    const{name,email,password,confirmpassword} = req.body
    // Validar todos los campos
    if (Object.values(req.body).includes("")) return res.send("Lo sentimos, debes llenar todos los campos")
    // Validar el password
    if(password != confirmpassword) return res.send("Lo sentimos, los passwords no coinciden")
    // Validar si el usuario ya está registrado
    const userBDD = await User.findOne({email})
    if(userBDD) return res.send("Lo sentimos, el email ya se encuentra registrado")
    // Crear una nueva instancia del usuario
    const newUser = await new User({name,email,password,confirmpassword})
    // Encriptar el password
    newUser.password = await newUser.encrypPassword(password)
    // Crear token cuando el usuario se registre
    newUser.crearToken()
    sendMailToUser(email,token)
    // Guardar en BDD
    newUser.save()
    // Redireccionamiento
    res.redirect('/user/login')
}

// LOGIN
// Mostrar el formulario de login
const renderLoginForm =(req,res)=>{
    res.render('user/loginForm')
}

// Capturar los datos del formulario y realizar el proceso de login en conjunto con BDD 
const loginUser = passport.authenticate('local',{
    failureRedirect:'/user/login',
    successRedirect:'/portafolios'
}) 


// Cerrar sesión del usuario
const logoutUser =(req,res)=>{
    req.logout((err)=>{
        if (err) return res.send("Ocurrio un error") 
        res.redirect('/');
    });
}

const confirmEmail = async(req,res)=>{
    if(!(req.params.token)) return res.send("Lo sentimos, no se puede validar la cuenta")
    const userBDD = await User.findOne({token:req.params.token})
    userBDD.token = null
    userBDD.confirmEmail=true
    await userBDD.save()
    res.send('Token confirmado, ya puedes iniciar sesión');
}

// Exportar los métodos (controladores)
module.exports={
    renderRegisterForm,
    registerNewUser,
    renderLoginForm,
    loginUser,
    logoutUser,
    confirmEmail
}