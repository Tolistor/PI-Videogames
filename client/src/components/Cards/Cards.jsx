import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import style from "./Cards.module.css";
//*------------------------------------------- */
import { useSelector, useDispatch } from "react-redux";
import { filter, order } from "../../redux/actions";



const Cards = ({ todos, videojegos }) => {


    const selectedGenre = useSelector(state => state.selectedGenre);
    const dispatch = useDispatch();

    // Filtrar con "All" para mostrar todos los videojuegos al principio
    useEffect(() => {
        dispatch(filter("All", videojegos));
    }, [dispatch, videojegos]);


    const handleFilterChange = (event) => {
        dispatch(filter(event.target.value, videojegos))
    }

    const handleOrderChange = (event) => {

        dispatch(order(event.target.value, videojegos))
    }


    // const filteredGames = selectedGenre === "All"
    //     ? videojegos
    //     : videojegos.filter((game) => game.genres.includes(selectedGenre))

    //*---------------------------------------------------------------------
    const [currentPage, setCurrentPage] = useState(1);
    const videojuegosPorPagina = 15;

    // Obtener el índice del último perro de la página actual
    const indexOfLastGame = currentPage * videojuegosPorPagina;
    // Obtener el índice del primer perro de la página actual
    const indexOfFirstGame = indexOfLastGame - videojuegosPorPagina;
    // Obtener los todos de la página actual
    const currentGames = selectedGenre?.slice(indexOfFirstGame, indexOfLastGame);

    // Cambiar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    //*------------------------------------------------------------------------
    return (
        console.log("Soy estado", selectedGenre),

        <div >
            {/* {console.log("soy current", currentGames)} */}
            {/* {console.log("cantidad de juegos en videogames", videojegos)} */}
            {/* selector de ordenamiento  */}
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
                        <option value="Action">Action</option>
                        <option value="Adventure">Adventure</option>
                        <option value="RPG">RPG</option>
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
                {Array.from({ length: Math.ceil(selectedGenre?.length / videojuegosPorPagina) }).map(
                    (item, index) => (
                        <button
                            key={index}
                            onClick={() => paginate(index + 1)}
                            className={currentPage === index + 1 ? style.active : ""}
                        >
                            {index + 1}
                        </button>
                    )
                )}
            </div>
        </div>
    );
};

export default Cards;

