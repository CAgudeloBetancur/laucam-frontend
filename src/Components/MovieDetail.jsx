import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MovieDetail = ({modelo}) => {

  // const urlBase = 'https://laucam-api.onrender.com'
  const urlBase = 'http://localhost:4001';
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
        <div className='container-fluid mt-3 mb-5'>
          <div className='row'>
            <div className='col-12 col-md-8 mx-auto'>
              <div>
                  <p className='mb-0 text-secondary'>Detalles sobre</p>
                <div className='d-flex justify-content-between align-items-center'>
                  <h1 className='h1 fw-bold mb-4 mt-0'><span className='fw-bolder'>{elemento?.titulo}</span></h1>
                  <p className='badge text-bg-secondary'><span className='pe-2'>Creado:</span> {elemento?.fechaCreacion.slice(0,10)}</p>
                </div>
              </div>
              <div className="card text-bg-dark border-0" style={{ "maxHeight":"60vh","minHeight": "70vh","overflow": "hidden", "minWidth": "60vh"}}>
                <img src={elemento?.imagen} className="card-img" alt="..."/>
                <div className="card-img-overlay" style={{"background-color": "rgba(0, 0, 0, 0.4)" }}>
                  <div className='d-flex flex-column justify-content-between h-100'>
                    <div className="rounded" style={{"background-color": "rgba(0, 0, 0, 0.4)", "max-width": "60%" }}>
                      <div className="card-body">
                        <h5 className="card-title h2 fw-bold mb-4">{elemento?.titulo}</h5>
                        <div>
                          <p className='fw-bolder m-0 small'><span>|</span> Sinopsis</p>
                          <p className="card-text ms-2">{elemento?.sinopsis}</p>
                        </div>
                        <div className='mt-3'>
                          <div>
                            <p className='fw-bolder m-0 small'><span>|</span> Director Principal</p>
                            <p className='ms-2'>{elemento?.directorPrincipal.nombre}</p>
                          </div>
                          <div>
                            <p className='fw-bolder m-0 small'><span>|</span> Genero Principal</p>
                            <p className='ms-2'>{elemento?.generoPrincipal.nombre}</p>
                          </div>
                          <div>
                            <p className='fw-bolder m-0 small'><span>|</span> Tipo</p>
                            <p className='ms-2'>{elemento?.tipo.nombre}</p>
                          </div>
                          <div>
                            <p className='fw-bolder m-0 small'><span>|</span> Productora</p>
                            <p className='ms-2'>{elemento?.productora.nombre}</p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <a href={elemento?.urlPelicula} className="btn btn-primary">Ver pelicula</a>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className='m-0 rounded px-3 py-1' style={{"background-color": "rgba(0, 0, 0, 0.6)", "width": "fit-content" }}>
                        <span className='fw-semibold'>Fecha de estreno:</span> <span className='ps-2 fw-bolder fs-5'>{elemento?.fechaEstreno.slice(0,10)}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>       
      }
    </>
  )
}

export default MovieDetail