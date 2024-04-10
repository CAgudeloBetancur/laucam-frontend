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

  return (
    <div>
      {(elemento) &&
      <>
        <h2>{(modelo === 'media') ? elemento?.titulo : elemento?.nombre}</h2>
        <img style={{ 'width':'300px' }}src={elemento.imagen} alt="imagen" />      
      </>
      }
    </div>
  )
}

export default MovieDetail