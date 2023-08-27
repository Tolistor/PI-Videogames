import axios from "axios";
import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import style from "./Cards.module.css";
//*------------------------------------------- */
import { useSelector, useDispatch } from "react-redux";
import { filter, order } from "../../redux/actions";



const Cards = ({  videojegos }) => {
    const [generos, setGeneros] = useState([])

    const selectedGenre = useSelector(state => state.selectedGenre);
    const dispatch = useDispatch();

    //* Nota: mandamos videojuegos para hacer una copia en el reducer

    useEffect(() => {
        // Obtener generos desde la db
        axios.get('http://localhost:3001/genres')
            //setea los generos
            .then(response => setGeneros(response.data))
            .catch(error => console.error("Error al buscar generos:", error));
            // Filtrar con "All" para mostrar todos los videojuegos al principio
        dispatch(filter("All", videojegos));
    }, [dispatch, videojegos]);


    const handleFilterChange = (event) => {
        dispatch(filter(event.target.value, videojegos))
    }

    const handleOrderChange = (event) => {
        dispatch(order(event.target.value, videojegos))
    }
    

    //*---------------------------------------------------------------------
    //estado del paginado
    const [currentPage, setCurrentPage] = useState(1);
    const videojuegosPorPagina = 15;

    // Obtener el índice del ultimo videojuego de la pagina actual
    const indiceUltimoJuego = currentPage * videojuegosPorPagina; //=30
    // Obtener el índice del primer videojuego de la pagina actual
    const indicePrimerJuego = indiceUltimoJuego - videojuegosPorPagina; //30-15 =15
    // Obtener los todos de la pagina actual
    // seleccionamos el conjunto de elementos que iran en la pagina a mostrar
    const currentGames = selectedGenre?.slice(indicePrimerJuego, indiceUltimoJuego);

    // Cambiar de pagina
    // funcion actualiza el estado de paginado permitiendo cambiar de paginas
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    //*------------------------------------------------------------------------
    return (
        console.log("Soy estado", selectedGenre),

        <div >
            
            <div className={style.selectContainer}>
                <div >
                    <select name="orden" onChange={handleOrderChange}>
                        <option value="A">Ascendente</option>
                        <option value="D">Descendente</option>
                        <option value="rating">Rating</option>
                    </select>
                </div>

                <div >
                    <select name="Filter" onChange={handleFilterChange}>
                        <option value="All">All Genres</option>
                        {generos.map(genre => (
                            <option key= {genre.name} value={genre.name}> {genre.name} </option>
                        ))}
                        
                        <option value="DB">DB</option>
                        <option value="API">API</option>

                    </select>
                </div>
            </div>
            
            {/* <br /> */}

            <div className={style.cardsContainer}>
                {currentGames.length === 0
                    ? <h1>No hay juegos</h1>
                    : currentGames.map(({ id, background_image, name, genres, imagen }) => (
                        <Card
                            key={id}
                            id={id}
                            name={name}
                            genres={genres}
                            background_image={background_image}
                            imagen={imagen}
                        />

                    ))}

            </div>



            {/* paginado */}
            <div className={style.pagination}>
                {/* creamos un array con la longitud de la paginancion "8" (8 elementos)con "Array.from"*/}
                {/* con la longitud del array de videojuegos"selctGenre" dividido entre videojuegos por pagina = 120/15= 8 */}
                {/* redondeado hacia arriba con math.ceil */}
                {Array.from({ length: Math.ceil(selectedGenre?.length / videojuegosPorPagina) }).map(
                    (item, index) => (
                        <button
                            //para que no mande el mensaje de error
                            key={index}
                            // cunado se hace click en boton se llama a apginado solo setea el estado
                            onClick={() => paginate(index + 1)}
                            // para que se vea el color si estamos en la pagina
                            className={currentPage === index + 1 ? style.active : ""}
                            // luego renderiza "currentGame"
                        >
                            {/* numero de la pagina */}
                            {index + 1}
                        </button>
                    )
                )}
            </div>
        </div>
    );
};

export default Cards;

