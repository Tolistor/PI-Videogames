import { Routes, Route } from 'react-router-dom';
import './App.css';
//------------------------------------------------
import axios from 'axios';
import {useState, useEffect} from 'react'
//------------------------------------------------
import LandingPage from './components/Landing/Landing_page';
import Home from './components/Home/Home';
// import BuscarVideogame from './components/BusacrVideogame/BuscarVideogame';
import Detail from './components/Detail/Detail';
import Form from './components/Form/Form';

function App() {

  const [ videojegos, setVideojuegos ]= useState(["viejo"]) 

  const onSearch = async(nombre)=> {
    try {
      
      const response = await axios.get(`http://localhost:3001/videogames/?name=${nombre}`)
      const {data} = response
      // console.log("soy primer log",data);
          
      
      if(data[0].name) {       
        setVideojuegos( data );
      }
      // console.log("soy el estado",videojegos);      

    } catch (error) {
      console.log('soy el catch', error.message);
      alert('Intenta con otro Nombre')
    }
    
  }

    //* trae todos lo videogames
    async function todoVideojuegos(videojuego) {
      try {
        
        const response = await axios.get(`http://localhost:3001/videogames`);
        const data = response.data         
        
        //seteamos todos los videojuegos
        setVideojuegos(data);
        
      } catch (error) {
        throw new Error(error.message);
        // console.error(error);
      }
    }
  
    useEffect(() => {
      todoVideojuegos();
    }, []);


  return (
    <div >
      <Routes>
        <Route path='/' element= {<LandingPage/>} index={true}/>
        <Route path='/Home' element= {<Home onSearch={onSearch}  videojegos={videojegos} setVideojuegos={setVideojuegos}/>}/>
        <Route path="/detail/:id" element={<Detail />} />
        <Route path='/form' element= {<Form />}/>
      </Routes>

      
    </div>
  );
}

export default App;


// pakege json viejo
// "react": "^17.0.2",
//     "react-dom": "^17.0.2",
//     "react-router-dom": "^5.2.0",
//     "redux": "^4.0.5",
//     "react-redux": "^7.2.3",
//     "react-scripts": "4.0.3",
//     "redux-thunk": "^2.3.0",
//     "web-vitals": "^2.1.4"