// Importar MONGOOSE
const mongoose = require('mongoose')

// MongoDB Atlas
//const MONGODB_URI = 'mongodb+srv://byrontosh:sistemas@cluster0.6e8zntc.mongodb.net/test'

// MongoDB Local

// Crear un método para hacer la cadena de conexión
connection = async()=>{
    try {
        // Invocar al método connect
        await mongoose.connect(process.env.MONGODB_URI)
        // Respuesta de la pormesa == "OK"
        console.log("Database is connected")
    } catch (error) {
        // Respuesta de la promesa == "ERROR"
        console.log(error);
    }
}

// Exportar el método connect 
module.exports = connection