const axios = require("axios");
const { Router } = require('express');
const { Genre } = require('../db.js');
const dotenv = require('dotenv');

const genreRouter = Router();

dotenv.config(); //cargo los datos de ".env"
const { key } = process.env;
const URL = 'https://api.rawg.io/api/genres';

genreRouter.get('/genres', async (req, res) => {
    const response = await axios.get(`${URL}?key=${key}&ordering=id&page_size=100`)
    const generos = response.data.results

    try {
        generos.forEach(genero => {
            Genre.findOrCreate({
                where: {name: genero.name, id :  genero.id}
            })
        });
        
        res.status(200).send(generos)
    } catch (error) {
        res.status(400).send(error.message);
    }

    
})



module.exports = genreRouter;