//Cargar todas la variables de entorno
require('dotenv').config()

// Importar la variable app
const app = require('./server.js')

// Importar el método connection
const connection = require('./database.js')

// Ejecutar el servidor en el puerto 3000
app.listen(3000,()=>{
    console.log(`Server on port ${3000}`);
})

// Ejecutar el
connection()
