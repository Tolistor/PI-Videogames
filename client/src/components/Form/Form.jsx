import style from './Form.module.css'
import axios from "axios"; 
import { useState } from "react";
import { useNavigate } from "react-router-dom";
//*----------------------------------------------------
import { validations } from "./validations"

const Form = () => {
    //*para volver atras cuando cree un videojuego
    const navigate = useNavigate();

    //*------------------------------------------------
    const [data, setData] = useState({
        name: "",
        descripcion: "",
        imagen: "",
        rating: 0,
        fecha_lanzamiento: "",
        genres: [],
        plataformas: "",  
    })

    const [errors, setErrors] = useState({
        name: "",
        descripcion: "",
        imagen: "",
        rating: 0,
        fecha_lanzamiento: "",
        genres: [],
        plataformas: "",
    })

    //!estan en "onInputChange" mas abajo
    // function handleInputChange (evento) {
    //     // e.preventDefault();
    //     setData({
    //         ...data,
    //         [evento.target.name]: evento.target.value,
    //     });
    //     setErrors(validations(
    //         {...data, 
    //         [evento.target.name] : evento.target.value
    //     }))
    // }
    


    //*------------------------------------------------

    const [videogame, setVideogame] = useState({
        name: "",
        descripcion: "",
        imagen: "",
        rating: 0,
        fecha_lanzamiento: "",
        genres: [],
        plataformas: "",
    })

    function onInputChange(e) {
        e.preventDefault();
        setVideogame({
            ...videogame,
            [e.target.name]: e.target.value,
        });
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
        setErrors(validations(
            {...data, 
            [e.target.name] : e.target.value
        }))
    }
    
    async function onSubmit(e) {
        e.preventDefault();
    
        //*manejamos generos antes de enviar la info
        const genresArray = videogame.genres.split(',').map(genre => genre.trim());
    
        const updatedVideogame = { ...videogame, genres: genresArray };

        axios
            .post("http://localhost:3001/videogames/", updatedVideogame)
            .then(() => {
                navigate("/Home");
            })
            .catch((err) => {
            console.log(err);
            });
    }

    return (
        <div className={style.formcontainer}>
            <form onSubmit={onSubmit}>
                <div>

                    <div className={style.formfield}>
                        <label>Nombre:</label>
                        <br />
                        <input
                            // className={vStyles.input}
                            onChange={onInputChange}
                            name="name"
                            type="text"
                            value={videogame.name}
                            required
                        />
                        <br/>
                        {
                            errors.name ? (
                                <span className={style.errormessage}>{errors.name}</span>
                            ) :
                            ''
                        }
                    </div>

                    <div className={style.formfield}>
                        <label>Descripción:</label>
                        <br />

                        <input
                            // className={vStyles.input}
                            onChange={onInputChange}
                            name="descripcion"
                            type="text"
                            value={videogame.descripcion}
                            required
                        />
                        <br/>
                        {
                            errors.descripcion ? (
                                <span className={style.errormessage}>{errors.descripcion}</span>
                            ) :
                            ''
                        }
                    </div>

                    <div className={style.formfield}>
                        <label>Imágen:</label>
                        <br />

                        <input
                            // className={vStyles.input}
                            onChange={onInputChange}
                            name="imagen"
                            type="text"
                            value={videogame.imagen}
                            required
                        />
                        <br/>
                        {
                            errors.imagen ? (
                                <span className={style.errormessage}>{errors.imagen}</span>
                            ) :
                            ''
                        }

                    </div>

                    <div className={style.formfield}>
                        <label>Rating:</label>
                        <br />

                        <input
                            // className={vStyles.input}
                            onChange={onInputChange}
                            name="rating"
                            type="number"
                            value={videogame.rating}
                            min={0}
                            max={5}
                            required
                        />
                        <br/>
                        {
                            errors.rating ? (
                                <span className={style.errormessage}>{errors.rating}</span>
                            ) :
                            ''
                        }
                    </div>

                    <div className={style.formfield}>
                        <label>Lanzamiento:</label>
                        <br />

                        <input
                            // className={vStyles.input}
                            onChange={onInputChange}
                            name="fecha_lanzamiento"
                            type="text"
                            value={videogame.fecha_lanzamiento}
                            required
                        />
                        <br/>
                        {
                            errors.fecha_lanzamiento ? (
                                <span className={style.errormessage}>{errors.fecha_lanzamiento}</span>
                            ) :
                            ''
                        }
                    </div>

                    <div className={style.formfield}>
                        <label>Generos:</label>
                        <br />
                        <textarea
                            // className={vStyles.input}
                            onChange={onInputChange}
                            name="genres"
                            value={videogame.genres} // Convertimos el arreglo en una cadena separada por comas
                            rows={3} // Establecemos el número de filas
                            required
                        />
                        <br/>
                        {
                            errors.genres ? (
                                <span className={style.errormessage}>{errors.genres}</span>
                            ) :
                            ''
                        }
                    </div>
                    {/* <div>
                        <label>Generos:</label>
                        <br />

                        <input
                            // className={vStyles.input}
                            onChange={onInputChange}
                            name="genres"
                            type="text"
                            value={videogame.genres}
                        />
                    </div> */}

                    <div className={style.formfield}>
                        <label>Plataformas:</label>
                        <br />

                        <input
                            // className={vStyles.input}
                            onChange={onInputChange}
                            name="plataformas"
                            type="text"
                            value={videogame.plataformas}
                            required
                        />
                        <br/>
                        {
                            errors.plataformas ? (
                                <span className={style.errormessage}>{errors.plataformas}</span>
                            ) :
                            ''
                        }
                    </div>

                    <hr />
                    {/* Botón de envío */}
                    <div className={style.contenedorBoton}>
                        <button type="submit" className={style.submitbutton}>Crear Videojuego</button>
                    </div>
                    {/* <input
                        // className={`${vStyles.input} ${vStyles.padder}`}
                        type="submit"
                    /> */}

                </div>
            </form>
        </div>
    )
}

export default Form;