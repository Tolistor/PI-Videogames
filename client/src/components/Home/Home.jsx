import style from './Home.module.css'
//------------------------------------
import Nav from '../Nav/Nav';
import Cards from '../Cards/Cards';


const Home = ({ onSearch, todos, videojegos, setVideojuegos }) => {
    return (
        <div className={style.contenedor}>
            

            <div className={style.navBar}>
                {/* <h1>Area de navBar</h1> */}
                <Nav onSearch={onSearch} />
            </div>

            

            <div className={style.cards}>
                
                <Cards todos={todos} videojegos={videojegos} setVideojuegos={setVideojuegos} />
            </div>

            

        </div>
    )

}

export default Home;