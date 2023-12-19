// Importación de express
const express = require('express')

// Importación de path
const path = require('path');

//Importación de handlebars
const { engine }  = require('express-handlebars')

// Importar el methodOverride
const methodOverride = require('method-override')

// Importación de passport
const passport = require('passport');

// Importación de express-session
const session = require('express-session')

// Importar fileUpload
const fileUpload = require('express-fileupload')

// INICIALIZACIONES
// Instanciar express
const app = express()

require('./config/passport')

// CONFIGURACIONES

// Variables de configuración
app.set('port',process.env.port || 3000)
app.set('views',path.join(__dirname, 'views'))

// Establecer la carpeta temporal y el directorio
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : './uploads'
}));

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

// Configurar la sesión del usuario
app.use(session({ 
    secret: 'secret',
    resave:true,
    saveUninitialized:true
}));
// Inicializar passport.js y session
app.use(passport.initialize())
app.use(passport.session())

// VARIABLES GLOBALES

app.use((req,res,next)=>{
    res.locals.user = req.user?.name || null
    next()
})

// RUTAS

// Primera ruta
// app.get('/',(req,res)=>{
//     res.render('index')
// })

app.use(require('./routers/index.routes'))

app.use(require('./routers/portafolio.routes'))

app.use(require('./routers/user.routes'))

// ARCHIVOS ESTÁTICOS
//Definir archivos estáticos y públicos
app.use(express.static(path.join(__dirname,'public')))


// Exportar la variable app
module.exports = app

