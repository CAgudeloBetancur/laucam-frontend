import { BrowserRouter, Routes, Route } from "react-router-dom";

import MovieDetail from "./Components/MovieDetail.jsx";
import ElementsTable from "./Components/ElementsTable.jsx";
import Navbar from "./Components/Navbar.jsx";
import Footer from "./Components/Footer.jsx";

import { 
  formInputsDirector, 
  formInputsGenero, 
  formInputsMedia, 
  formInputsProductora, 
  formInputsTipo 
  } from "./utils/inputsSchemas.js";

import { 
  columnasDirector, 
  columnasGenero, 
  columnasMedia, 
  columnasProductora, 
  columnasTipo 
  } from "./utils/columnasTabla.js";

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column justify-content-between" style={{ "minHeight": "100vh" }}>
        <div>
          <Navbar/>
          <Routes>
            <Route path="/" element={<ElementsTable modelo="media" columnas={columnasMedia} formInputs={formInputsMedia}/>}/>
            <Route path="/director" element={<ElementsTable modelo="director" columnas={columnasDirector} formInputs={formInputsDirector}/>}/>
            <Route path="/tipo" element={<ElementsTable modelo="tipo" columnas={columnasTipo} formInputs={formInputsTipo}/>}/>
            <Route path="/productora" element={<ElementsTable modelo="productora" columnas={columnasProductora} formInputs={formInputsProductora}/>}/>
            <Route path="/genero" element={<ElementsTable modelo="genero" columnas={columnasGenero} formInputs={formInputsGenero}/>}/>
            <Route path="/media/:id" element={<MovieDetail modelo="media"/>}/>
          </Routes>
        </div>
        <Footer/>
      </div>
    </BrowserRouter>
  );


}

export default App;
