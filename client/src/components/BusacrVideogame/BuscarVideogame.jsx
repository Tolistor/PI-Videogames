
import Card from "../Card/Card";
import style from "./BuscarVideogame.module.css";
import Nav from "../Nav/Nav";

const BuscarVideogame = ({ videojegos, onSearch }) => {


    return (
        <div className={style.cardsContainer}>

            <div>
                <h1>Area de navBar</h1>
                <Nav onSearch={onSearch} />
            </div>

            <br />

            {videojegos[0].map(({ id, background_image, name, genres, }) => (
                <Card
                    key={id}
                    id={id}
                    name={name}
                    Genres={genres}
                    background_image={background_image}
                />
            ))}



        </div>


    );
};

export default BuscarVideogame;


