import { FILTER, ORDER } from "./actionTypes";


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
