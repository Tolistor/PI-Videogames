import style from './Home.module.css'
//------------------------------------
import Nav from '../Nav/Nav';
import Cards from '../Cards/Cards';

const Home = ({ onSearch, videojegos,  }) => {
    return (
        <div className={style.contenedor}>            

            <div className={style.navBar}>                
                <Nav onSearch={onSearch} />
            </div>            

            <div className={style.cards}>                
                <Cards  videojegos={videojegos}  />
            </div>            

        </div>
    )
}

export default Home;