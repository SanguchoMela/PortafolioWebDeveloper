// Importar routes de express
const {Router} = require('express')
const { renderIndex, renderLogin } = require('../controllers/index.controllers')

// Instanciar routes
const router = Router()

router.get('/',renderIndex)


// router.get('/contact',renderContact)

// Exportar la variable router
module.exports = router