// Importar el modelo
const Portfolio = require('../models/Portfolio')

// Método para listar los portafolios
const renderAllPortafolios = async(req,res)=>{
    // Listar todos los portafolios y transformar en objetos lean
    const portfolios = await Portfolio.find().lean()
    // 
    res.render("portafolio/allPortfolios",{portfolios})
}

// Método para listar el detalle de un portafolio
const renderPortafolio = (req,res)=>{
    res.send('Mostrar el detalle de un portafolio')
}



// Método para mostrar el formulario
const renderPortafolioForm = (req,res)=>{
    res.render('portafolio/newFormPortafolio')
}



// Método para guardar en la BDD lo capturado en el form
const createNewPortafolio =async (req,res)=>{
    // // Desestructurar los datos del req.body
    // const {title, category,description} = req.body
    
    // Crear una nueva instancia
    const newPortfolio = new Portfolio(req.body)
    
    // Guardar en la BDD
    await newPortfolio.save()
    // Mostrar el resultado
    // res.json({newPortfolio})
    res.redirect('/portafolios')
}




// Método para actualizar el formulario
const renderEditPortafolioForm = (req,res)=>{
    res.send('Formulario para editar un portafolio')
}

// Método para actualizar en la BDD lo capturado en el form
const updatePortafolio = (req,res)=>{
    res.send('Editar un portafolio')
}

// Método para eliminar en la BDD
const deletePortafolio = async(req,res)=>{
    await Portfolio.findByIdAndDelete(req.params.id)
    res.redirect('/portafolios')
}

// Exportación COMMONJS nombrada
module.exports = {
    renderAllPortafolios,
    renderPortafolio,
    renderPortafolioForm,
    createNewPortafolio,
    renderEditPortafolioForm,
    updatePortafolio,
    deletePortafolio
}