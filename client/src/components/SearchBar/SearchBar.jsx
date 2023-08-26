
import { useState } from "react";
import style from './SearchBar.module.css'

const SearchBar = ({ onSearch }) => {
    const [videojuego, setVideojuego] = useState("");

    const handleChange = (event) => {
        setVideojuego(event.target.value);
    }

    return (
        <div className={style.searchBarContainer}>
            <input
                type="search"
                onChange={handleChange}
                value={videojuego}
                placeholder="Ingresa Nombre del Juego"
            />

            <button onClick={() => onSearch(videojuego)}>Agregar</button>
        </div>
    )
}

export default SearchBar;