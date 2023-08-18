const { Router } = require('express');
// Importar todos los routers;
const videogame= require( '../controllers/videogames')
const genres = require( '../controllers/genres')

// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
router.use('/', videogame);
router.use('/', genres);

// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
