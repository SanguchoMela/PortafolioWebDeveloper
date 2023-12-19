// Importar el modelo
const Portfolio = require('../models/Portfolio')

// Importar el método uploadImage
const { uploadImage } = require('../config/cloudinary')

// Método para listar los portafolios
const renderAllPortafolios = async(req,res)=>{
    // Listar todos los portafolios y transformar en objetos lean
    const portfolios = await Portfolio.find({user:req.user._id}).lean()
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
    // Asociar el portafolio con el usuario
    newPortfolio.user = req.user._id
    // Validar si existe una imagen
    if(!(req.files?.image)) return res.send("Se requiere una imagen")
    // Utilizar el método
    try {
        const imageUpload = await uploadImage(req.files.image.tempFilePath)
        newPortfolio.image = {
            public_id:imageUpload.public_id,
            secure_url:imageUpload.secure_url
        }
    } catch (error) {
        console.log(error)
    }
    // Guardar en la BDD
    await newPortfolio.save()
    // Mostrar el resultado
    // res.json({newPortfolio})
    res.redirect('/portafolios')
}

// Método para actualizar el formulario
const renderEditPortafolioForm =async(req,res)=>{
    // Consulta del portafolio en BDD con el ID
    const portfolio = await Portfolio.findById(req.params.id).lean()
    // Mandar a la vista
    res.render('portafolio/editPortfolio',{portfolio})
}

// Método para actualizar en la BDD lo capturado en el form
const updatePortafolio = async(req,res)=>{
    // Capturar los datos del body
    const {title,category,description}= req.body
    // Actualizar el portafolio en BDD 
    await Portfolio.findByIdAndUpdate(req.params.id,{title,category,description})
    // Redireccionar
    res.redirect('/portafolios')
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