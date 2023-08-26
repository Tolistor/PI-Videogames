import { Link } from 'react-router-dom'
import style from './Card.module.css'

const Card = ({ id, background_image, name, genres, imagen }) => {
    const allGenres = genres?.map(genre => genre.name).join(", ");
    const imagens = background_image ? background_image : imagen
    return (
        <div className={style.cardContainer}>
            {/* {console.log("soy genres de Card", genres)} */}
            <div>
                {/* <div >
                    <button className={style.cardButton}>
                        x
                    </button>
                </div> */}



                <Link to={`/detail/${id}`}className={style.containerLink}>
                    <h1 className={style.cardTitle}>Name: {name}</h1>
                </Link>

                <h3 className={style.cardSubtitle}>Genres: {allGenres}</h3>
                {/* <ul>
                    {genres.map((genre) => (
                        <li key={genre.id}>{genre.name}</li>
                    ))}
                </ul> */}

                <img className={style.cardImage} src={imagens} alt="imagen" />

            </div>


        </div>
    )
}

export default Card