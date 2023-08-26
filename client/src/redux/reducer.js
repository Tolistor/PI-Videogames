import { FILTER, ORDER } from "./actionTypes";
// import videojegos from "../App"
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';


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
                filteredGames = action.payload.videojegos.filter(game => game.id.length > 9)
            }
            else if (action.payload.genre === "API") {
                filteredGames = action.payload.videojegos.filter(game => uuidValidate(game.id));
            }
            else if (action.payload.genre === "All"){
                filteredGames = action.payload.videojegos
            }
            else {
                filteredGames = action.payload.videojegos.filter((game) =>
                    game.genres?.some((genre) => genre.name === action.payload.genre)
                );
            }
            // = action.payload.genre === "All"
                // ? action.payload.videojegos
                // : action.payload.videojegos.filter((game) =>
                //     game.genres.some((genre) => genre.name === action.payload.genre)
                // );

            // Aplica ordenamiento en caso de que haya una orden definida
            if (state.order) {
                filteredGames.sort((a, b) => {
                    if (state.order === "A") {
                        return a.name.localeCompare(b.name); // Ascendente
                    } if (state.order === "D") {
                        return b.name.localeCompare(a.name); // Descendente
                    }if (state.order === "rating") {
                        return b.rating - a.rating; // Descendente por rating (números más altos primero)
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
                            return b.rating - a.rating; // Descendente por rating (números más altos primero)
                        }
                        if (orderValue === "A") {
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


//         case ORDER:
//             const orderValue = action.payload.orden;
//             const sortByValue = action.payload.sortBy; // Nueva opción de ordenamiento
        
//             // Aplica ordenamiento en caso de que haya juegos filtrados
//             if (state.selectedGenre.length > 0) {
//                 const sortedGames = [...state.selectedGenre];
//                 sortedGames.sort((a, b) => {
//                     if (sortByValue === "name") {
//                         if (orderValue === "A") {
//                             return a.name.localeCompare(b.name); // Ascendente por nombre
//                         } else if (orderValue === "D") {
//                             return b.name.localeCompare(a.name); // Descendente por nombre
//                         }
//                     } else if (sortByValue === "rating") {
//                         return b.rating - a.rating; // Descendente por rating (números más altos primero)
//                     }
//                     // En caso de que sean iguales o tipo de ordenamiento no válido
//                     return 0;
//                 });
        
//                 return {
//                     ...state,
//                     selectedGenre: sortedGames,
//                     order: orderValue,
//                     sortBy: sortByValue, // Actualiza el valor de ordenamiento
//                 };
//             }
//             return state;

//         default:
//             return state;
//     }
// };

//-------------------------------------------------------------------
//         case ORDER:
//             const orderValue = action.payload.orden;

//             // Aplica ordenamiento en caso de que haya juegos filtrados
//             if (state.selectedGenre.length > 0) {
//                 const sortedGames = [...state.selectedGenre];
//                 sortedGames.sort((a, b) => {
//                     if (orderValue === "A") {
//                         return a.name.localeCompare(b.name); // Ascendente
//                     } else if (orderValue === "D") {
//                         return b.name.localeCompare(a.name); // Descendente
//                     }
//                     //en caso de que sean iguales
//                     return 0;
//                 });

//                 return {
//                     ...state,
//                     selectedGenre: sortedGames,
//                     order: orderValue, // Actualiza el valor de ordenamiento
//                 };
//             }

//             return state;

//         default:
//             return state;
//     }
// };
//----------------------------------------------------------------
//     switch (action.type) {        

//         case FILTER:
        
//         const filteredGames = action.payload.genre === "All"
//             ? action.payload.videojegos // Utiliza el estado videojegos del reducer
//             : action.payload.videojegos.filter((game) => game.genres.some(genre => genre.name === action.payload.genre));

//             return {                
//                 ...state,                
//                 selectedGenre: filteredGames,
//                 filteredGames: action.payload.genre // género filtrado en el estado
//             };

//         case ORDER:

//             const allVideogamesCopy = [...action.payload.videojegos];

//             allVideogamesCopy.sort((a, b) => {
//                 if (action.payload.orden === "A") {
//                     return a.name.localeCompare(b.name); // Ascendente
//                 } else if (action.payload.orden === "D") {
//                     return b.name.localeCompare(a.name); // Descendente
//                 }
//                 return 0;
//                 //si son iguales
//             });

//             return {
//                 ...state,
//                 selectedGenre: allVideogamesCopy,
//             };


    
//         default:
//             return {
//                 ...state
//             }
//     }
// }

export default reducer

// selectedGenre: action.payload.videojegos.filter((game) => game.genres.some(genre => genre.name === action.payload.genre)),