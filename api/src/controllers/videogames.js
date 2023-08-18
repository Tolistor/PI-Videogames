const { Router } = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

const videogameRouter = Router();


const { Videogame, Genre } = require= require('../db');
const videogames = Videogame

dotenv.config(); //cargo los datos de ".env"
const { key } = process.env;
const URL = 'https://api.rawg.io/api/games';

//? ruta los trae a todos o los 15 primeros pro "nombre"
videogameRouter.get('/videogames', async (req, res) => {
    const name = req.query.name
    try {
        if(name) {
            
            let response = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${key}&page_size=15`)
            let api = response.data.results
            // console.log(api.length);

            let db = [];
            //? segundo try para evitar que se rompra 
            try {
                db = await videogames.findAll({
                    //? nombre exacto
                    where: { name: name },
                    //? que lo contenga
                    // where: {
                    //     name: { [Op.iLike]: `%${name}%` },
                    // },
                });
            } catch (dbError) {
                console.error('Error al octener de la DB:', dbError.message);
            }
            
            const todo = [...api,...db]
            // console.log(todo.length);
            //? si el name no existe mandamos mensaje
            if(todo.length === 0) {
                return res.status(404).json({message: 'El videojuego no existe'})
            }
            else {
                return res.send(todo)
            }
            
            // return res.send(api)
        }
        else {
            const response = await axios.get(`${URL}?key=${key}&page_size=100`);
            const all = response.data.results;

            return res.send(all);
        }
        
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//? traemos el vodejuego por "id"
videogameRouter.get('/videogames/:idVideogame', async (req, res) => {
    const {idVideogame} = req.params
    try {
        if (idVideogame.length > 9) {
            let game = await game.findByPk(idVideogame,{
                include: [
                    {
                        model: Genre,
                        attributes: ['name'],
                        through: {
                            attributes: [],
                        },
                    },
                ],
            })
            res.send(game)
        }
        else {
            let response = await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${key}`)
            let gameApi = response.data
            res.status(200).send(gameApi)
        }


    } catch (error) {
        res.status(500).send(error.message);
    }
})


//?--------------------------POST-------------------------------

videogameRouter.post('/videogames', async (req, res) => {
    const { name, descripcion, imagen, genres } = req.body

    try {
        // Crear el videojuego en la base de datos
        const newGame = await videogames.create({
            
            name: name,
            descripcion: descripcion,
            imagen: imagen,
        });
        
        // console.log(Object.keys(newGame))
        // console.log(newGame);
        // busca los generos en ls base de datos
        if (genres && genres.length > 0) {
            let foundGenres = await Genre.findAll({
                where: { name: genres },
            });
    
            // Asociar los géneros encontrados con el videojuego
            await newGame.addGenres(foundGenres);
            // console.log(foundGenres); 
        }
    
        res.status(201).json({ message: 'Videojuego creado exitosamente.',  newGame });
    } catch (error) {
        
        res.status(500).json({ error: error.message });
    }

})


//! funciona solo si todos los generos son encontrados en la db
// videogameRouter.post('/videogames', async (req, res) => {
//     const { name, descripcion, image, genres } = req.body

//     try {
        
//         const newGame = await videogames.create({
//             name,
//             descripcion, 
//             image
//         })
//         //? si hay generos y son mas de 0
//         if (genres & genres.length > 0) {
//             //? genres debe ser un array con los generos
//             //? buscamos en la db
//             const enGenero = await Genre.findAll({
//                 where: { name: genres}
//             })

//             //? por si no encuentra algun genero en la db
//             if (enGenero.length !== genres.length) {
//                 const notFoundGenres = genres.filter(genre => !enGenero.some(foundGenre => foundGenre.name === genre));

//                 return res.status(404).json({ message: `Los siguientes géneros no fueron encontrados en la base de datos: ${notFoundGenres.join(', ')}` });
//             }

//             //? asociamos generos encontrados
//             await newGame.addGenres(enGenero)
//         }

//         res. status(200).json({ message: 'Videojuego creado con exito' })

//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }

// })



module.exports = videogameRouter;


// const { Router } = require("express");
// const axios = require('axios')
// const videogameRouter = Router();

// const {key} = process.env
// const URL = 'https://api.rawg.io/api/games'

// videogameRouter.get('/videogames', async (req, res)=>{
//     try {
//         const todo = await axios.get(`${URL}${key}&page_size=40`)
        
//         return [...todo.data.results]

//     } catch (error) {
//         res.status(404).send(error.message);
//     }
// });


