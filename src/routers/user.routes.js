const { redirectIfAuthenticated } = require('../helpers/validate-auth')

// Importar router de express
const {Router} = require('express')

const { renderRegisterForm, 
        registerNewUser, 
        renderLoginForm, 
        loginUser, 
        logoutUser 
    } = require('../controllers/user.controller')

// Instanciar la variable router
const router = Router()

// Ruta para mostrar el formulario de registro
router.get('/user/register', redirectIfAuthenticated, renderRegisterForm)
// Ruta para capturar los datos del formulario y almacenar en BDD
router.post('/user/register',registerNewUser)


// Ruta para mostrar el formulario de login
router.get('/user/login', redirectIfAuthenticated, renderLoginForm)
// Ruta para capturar los datos del formulario y realizar el porceso de login en conjunto con BDD
router.post('/user/login',loginUser)


// Ruta para cerrar sesión del usuario
router.post('/user/logout',logoutUser)

// Exportar la variable router
module.exports = router