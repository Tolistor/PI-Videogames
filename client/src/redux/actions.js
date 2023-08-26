import { FILTER, ORDER } from "./actionTypes";
// import axios from 'axios'

export const filter = (genre, videojegos) => {
    return {
        type: FILTER,
        payload: {genre, videojegos}
    };
};

export const order = (orden,  videojegos)=> {
    return {
        type: ORDER,
        payload: {orden,  videojegos}
    }
}

//*---------------------------------------------------------
// // case FILTER:
// // const filteredGames = action.payload.genre === "All"
// //                 ? action.payload.videojegos
// //                 : action.payload.videojegos.filter((game) =>
// //                     game.genres.some((genre) => genre.name === action.payload.genre)
// //                 );

// // antes de aplicar el ordenamienot case FILTER:




// {/* {currentGames.map(({ id, background_image, name, genres }) => (
//                     <Card
//                         key={id}
//                         id={id}
//                         name={name}
//                         genres={genres}
//                         background_image={background_image}
//                     />

//                 ))} */}