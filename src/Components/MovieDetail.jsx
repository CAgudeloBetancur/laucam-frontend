import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MovieDetail = ({modelo}) => {

  const urlBase = 'http://localhost:4001'
  const [elemento, setElemento] = useState()

  const {id} = useParams();

  const obtenerElemento = async () => {
    const respuesta = await axios.get(`${urlBase}/${modelo}/${id}`)
    setElemento(respuesta.data);
  }

  useEffect(() => {
    obtenerElemento()
  },[])

  useEffect(() => {
    console.log(elemento)
  },[elemento])

  return ( 
    <>
      {
        (elemento) &&        
        <div className="card" style={{"width": "18rem"}}>
          <img src={elemento?.imagen} className="card-img-top" alt={elemento?.titulo}/>
          <div className="card-body">
            <h5 className="card-title">{elemento?.titulo}</h5>
            <p className="card-text">{elemento?.sinopsis}</p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Director principal: {elemento?.directorPrincipal.nombre}</li>
            <li class="list-group-item">Genero principal: {elemento?.generoPrincipal.nombre}</li>
            <li class="list-group-item">Tipo: {elemento?.tipo.nombre}</li>
            <li class="list-group-item">Productora: {elemento?.productora.nombre}</li>
          </ul>
          <div class="card-body">
            <a href={elemento?.urlPelicula} class="card-link">Ver pelicula</a>
          </div>
        </div>
      }
    </>
  )
}

export default MovieDetail