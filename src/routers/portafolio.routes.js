
const {isAuthenticated} = require('../helpers/validate-auth')

// Importar router de express
const{Router} = require('express')

const { renderPortafolioForm, 
        createNewPortafolio, 
        renderAllPortafolios, 
        renderPortafolio, 
        renderEditPortafolioForm, 
        updatePortafolio, 
        deletePortafolio 
    } = require('../controllers/portafolio.controller')

// Instanciar la variable router
const router = Router()

// C - reate
// Ruta para cargar la vista del formulario
router.get('/portafolio/add', isAuthenticated, renderPortafolioForm)
// Ruta para capturar los datos del form y guardar en BDD
router.post('/portafolio/add', isAuthenticated,  createNewPortafolio)

// R - ead
// Ruta para presentar todos los portafolios
router.get('/portafolios', isAuthenticated, renderAllPortafolios)
// Ruta para presentar el detalle de un portafolio
router.get('/portafolio/:id', isAuthenticated, renderPortafolio)

// U - pdate
// Ruta para cargar la vista del formulario
router.get('/portafolio/edit/:id', isAuthenticated, renderEditPortafolioForm)
// Ruta para capturar los datos del form y guardar en BDD
router.put('/portafolio/edit/:id', isAuthenticated, updatePortafolio)

// D - elete
// Ruta para eliminar el portafolio
router.delete('/portafolio/delete/:id', isAuthenticated, deletePortafolio)

// Exportar la variable router
module.exports = router