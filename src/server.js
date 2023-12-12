// Importación de express
const express = require('express')

// Importación de path
const path = require('path');

//Importación de handlebars
const { engine }  = require('express-handlebars')

// Importar el methodOverride
const methodOverride = require('method-override');

// INICIALIZACIONES
// Instanciar express
const app = express()

// CONFIGURACIONES

// Variables de configuración
app.set('port',process.env.port || 3000)
app.set('views',path.join(__dirname, 'views'))

// Establecer el path de la carpeta views
app.set('views',path.join(__dirname, 'views'))
// Establecer 
app.engine('.hbs',engine({
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname:'.hbs'
}))
app.set('view engine','.hbs')

// MIDDLEWARS (use)
// app.use(express.json())
// Servidor va a trabajor con información en base a formularios
app.use(express.urlencoded({extended:false}))

app.use(methodOverride('_method'))

// VARIABLES GLOBALES



// RUTAS

// Primera ruta
// app.get('/',(req,res)=>{
//     res.render('index')
// })

app.use(require('./routers/index.routes'))

app.use(require('./routers/portafolio.routes'))

// ARCHIVOS ESTÁTICOS
//Definir archivos estáticos y públicos
app.use(express.static(path.join(__dirname,'public')))


// Exportar la variable app
module.exports = app

