// Primera función para renderizar el index
const renderIndex = (req,res)=>{
    res.render('index')
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

