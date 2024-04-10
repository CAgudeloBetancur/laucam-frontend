import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShowMovies from './Components/ShowMovies.jsx';
import MovieDetail from "./Components/MovieDetail.jsx";
import ElementsTable from "./Components/ElementsTable.jsx";

const columnasMedia = ["serial", "titulo", "urlPelicula"];
const columnasGenero = ["nombre", "estado", "descripcion"];
const columnasDirector = ["nombre", "estado"];
const columnasProductora = ["nombre", "slogan", "descripcion"];
const columnasTipo = ["nombre", "descripcion"];

const formInputsMedia = [
  {
    name: 'serial',
    type: 'text'
  },
  {
    name: 'titulo',
    type: 'text ',
  },
  {
    name: 'sinopsis',
    type: 'textarea'
  },
  {
    name: 'urlPelicula',
    type: 'text'
  },
  {
    name: 'imagen',
    type: 'text'
  },
  {
    name: 'fechaEstreno',
    type: 'date'
  },
  {
    name: 'generoPrincipal',
    model: 'genero',
    type: 'select'
  },
  {
    name: 'directorPrincipal',
    model: 'director',
    type: 'select'
  },
  {
    name: 'productora',
    model: 'productora',
    type: 'select'
  },
  {
    name: 'tipo',
    model: 'tipo',
    type: 'select'
  }
]

const formInputsDirector = [
  {
    name: 'nombre',
    type: 'text'
  },
  {
    name: 'estado',
    type: 'select'
  }
]

const formInputsGenero = [
  {
    name: 'nombre',
    type: 'text'
  },
  {
    name: 'estado',
    type: 'select'
  },
  {
    name: 'descripcion',
    type: 'textarea'
  }
]

const formInputsProductora = [
  {
    name: 'nombre',
    type: 'text'
  },
  {
    name: 'estado',
    type: 'select'
  },
  {
    name: 'slogan',
    type: 'text'
  },
  {
    name: 'descripcion',
    type: 'textarea'
  }
]

const formInputsTipo = [
  {
    name: 'nombre',
    type: 'text'
  },
  {
    name: 'descripcion',
    type: 'textarea'
  },
]

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ElementsTable modelo="media" columnas={columnasMedia} formInputs={formInputsMedia}/>}/>
        <Route path="/director" element={<ElementsTable modelo="director" columnas={columnasDirector} formInputs={formInputsDirector}/>}/>
        <Route path="/tipo" element={<ElementsTable modelo="tipo" columnas={columnasTipo} formInputs={formInputsTipo}/>}/>
        <Route path="/productora" element={<ElementsTable modelo="productora" columnas={columnasProductora} formInputs={formInputsProductora}/>}/>
        <Route path="/genero" element={<ElementsTable modelo="genero" columnas={columnasGenero} formInputs={formInputsGenero}/>}/>
        {/* <Route path="/" element={<ShowMovies/>}/> */}
        <Route path="/media/:id" element={<MovieDetail modelo="media"/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
