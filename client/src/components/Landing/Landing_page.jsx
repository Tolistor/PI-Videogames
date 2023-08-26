import styles from './Landing_page.module.css'
import { Link } from 'react-router-dom'

const Landing_page = () => {
    return (
        <div className={styles.landingContainer}>
            <h1 className={styles.heading}>
                ¡Bienvenido a la Página de Videojuegos!
            </h1>

            <button className={styles.button}>
                <Link to="/Home">Explorar</Link>
            </button>
        </div>
    )

}

export default Landing_page;