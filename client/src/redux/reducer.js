import { FILTER, ORDER } from "./actionTypes";
import { validate as uuidValidate } from 'uuid';
// v4 as uuidv4,
// order para cunado filtre el valor de ordenamiento se mantenga
const initialState = {
    selectedGenre : [],
    order: null,
    
}
//!quede aca no hace nada aun este codigo

const reducer = (state = initialState, action) => {
    console.log("soy el estado en reducer",state.selectedGenre);
    switch (action.type) {
        case FILTER:
            var filteredGames 
            if (action.payload.genre === "DB"){
                filteredGames = action.payload.videojegos.filter(game => uuidValidate(game.id))
            }
            // uuidValidate(game.id)
            else if (action.payload.genre === "API") {
                filteredGames = action.payload.videojegos.filter(game => game.id <= 99999999);
            }
            else if (action.payload.genre === "All"){
                filteredGames = action.payload.videojegos
            }
            else {
                filteredGames = action.payload.videojegos.filter((game) =>
                    game.genres?.some((genre) => genre.name === action.payload.genre)
                );
            }            

            // Aplica ordenamiento en caso de que haya una orden definida
            if (state.order) {
                filteredGames.sort((a, b) => {
                    if (state.order === "A") {
                        return a.name.localeCompare(b.name); // Ascendente
                    } if (state.order === "D") {
                        return b.name.localeCompare(a.name); // Descendente
                    }if (state.order === "rating") {
                        return b.rating - a.rating; // Descendente por rating (nuemeros mas altos primero)
                    }
                    return 0;
                });
            }

            return {
                ...state,
                selectedGenre: filteredGames,
                filteredGames: action.payload.genre,
            };

        case ORDER:
                const orderValue = action.payload.orden;
    
                // Aplica ordenamiento en caso de que haya juegos filtrados
                if (state.selectedGenre.length > 0) {
                    const sortedGames = [...state.selectedGenre];
                    sortedGames.sort((a, b) => {
                        if (orderValue === "rating") {
                            return b.rating - a.rating; // Descendente por rating (numeros mas altos primero)
                        }
                        if (orderValue === "A") {
                            // localeCompare comnpara las dos cadenas de texto para determinar
                            // su posicion en oreden alfabetico
                            return a.name.localeCompare(b.name); // Ascendente
                        } else if (orderValue === "D") {
                            return b.name.localeCompare(a.name); // Descendente
                        }
                        //en caso de que sean iguales
                        return 0;
                    });
    
                    return {
                        ...state,
                        selectedGenre: sortedGames,
                        order: orderValue, // Actualiza el valor de ordenamiento
                    };
                }
    
                return state;
    
            default:
                return state;
        }
    };

export default reducer

// selectedGenre: action.payload.videojegos.filter((game) => game.genres.some(genre => genre.name === action.payload.genre)),