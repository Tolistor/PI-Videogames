import SearchBar from "../SearchBar/SearchBar";
import style from './Nav.module.css'
import { Link, useLocation } from 'react-router-dom'

const Nav = ({ onSearch }) => {

    const location = useLocation();

    return (
        <div className={style.contenedor}>

            <div className={style.botones}>
                <div className={style.botonContainer}>

                    {/* si estoy en "/Home" no mostramos el boton "Home" */}
                    {location.pathname !== "/Home" || location.pathname !== "/home" ? (
                        <button className={style.boton}>
                            <Link to="/Home" className={style.link}>Home</Link>
                        </button>

                    ) : null}

                    <button className={style.destacarBoton}>
                        <Link to="/form" className={style.link}>Crear videojuego</Link>
                    </button>
                    
                </div>

                <div className={style.busqueda}>
                    <SearchBar onSearch={onSearch} />                    
                </div>
            </div>

        </div>
    )
}

export default Nav;