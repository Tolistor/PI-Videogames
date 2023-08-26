import style from './Detail.module.css'
import axios from "axios";
import { useParams } from 'react-router-dom'
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

const Detail = () => {
    const { id } = useParams();
    const [videogame, setVideogame] = useState([]);
    // const [allGenres, setAllGenres] = useState('');

    useEffect(() => {

        axios.get(`http://localhost:3001/videogames/${id}`).then(({ data }) => {

            setVideogame({ ...data });

        })
        // return setVideogame({})
    }, [id])

    // useEffect(() => {
    //     if (videogame.genres.length > 0) {
    //         const genresString = videogame.genres.map((genre) => genre.name).join(', ');
    //         setAllGenres(genresString);
    //     }
    // }, [videogame.genres]);
    const allPlatforms = videogame.platforms?.map((platform) => platform.platform.name).join(', ');
    const allGenres = videogame.genres?.map(genre => genre.name).join(", ");
    const imagen = videogame?.background_image ? videogame?.background_image : videogame.imagen
    return (
        // console.log("soy el estad en Detail", videogame.genres),
        <div className={style.detailContainer}>
            <Link to='/home'>
                <button className={style.detailButton}>Volver</button>
            </Link>

            <br />

            <img className={style.detailImage} src={imagen} alt="" />

            <h1 className={style.detailTitle}>Name: {videogame.name}</h1>

            <h3 className={style.detailSubtitle}>platforms: {allPlatforms} {videogame.plataformas}</h3>

            <h3 className={style.detailSubtitle}>description: {videogame.description_raw}   {videogame.descripcion}</h3>

            <h3 className={style.detailSubtitle}>released: {videogame.released}  {videogame.fecha_lanzamiento}</h3>

            <h3 className={style.detailSubtitle}>rating: {videogame.rating}</h3>

            <h3 className={style.detailSubtitle}>Genres: {allGenres}  </h3>
            <h3 className={style.detailSubtitle}>Id: {videogame.id}</h3>


        </div>
    )
}

export default Detail;