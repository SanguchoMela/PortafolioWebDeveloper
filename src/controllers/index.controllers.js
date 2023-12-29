const Portfolio = require('../models/Portfolio')

// Primera función para renderizar el index
const renderIndex = async (req,res)=>{
    const portfolios = await Portfolio.find().lean()
    res.render('index',{portfolios})
}

// Primera función para renderizar el login
const renderLogin = (req,res)=>{
    res.render('login')
}

// const renderContact = (req,res) => { 
//     res.send("Contacto")
// }

// Exportar las dos funciones
module.exports ={
    renderIndex, 
    renderLogin
}

