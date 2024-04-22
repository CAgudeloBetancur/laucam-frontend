import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import './../styles/mainMovies.styles.css';

const MainMovies = () => {

    const urlBase = 'https://laucam-api.onrender.com'
    // const urlBase = "http://localhost:4001";

    const [listaPeliculas, setListaPeliculas] = useState([])

    const navigate = useNavigate();

    const obtenerLista = async () => {
        const respuesta = await axios.get(`${urlBase}/media/lista`)
        setListaPeliculas(respuesta.data);
    }

    useEffect(() => {
        obtenerLista()
    }, [])

    const gridStyles = {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px'
    }

    const imgStyles = {
        height: '200px',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        borderTopRightRadius: '5px',
        borderTopLeftRadius: '5px',
    }

    const navegarADetalle = (id) => {
        navigate(`/media/${id}`);
    }

    return (
        <div className='container-fluid mt-3 mb-5'>
            <div className='row'>
                <div className='col-12 col-md-8 mx-auto'>
                    <h1 className='fw-bolder mb-4'>Todas las Películas</h1> 
                    {
                        listaPeliculas.length > 0 
                            ?
                                <div style={gridStyles}>{
                                    listaPeliculas.map((pelicula, i) => {
                                        return (
                                            <div className='border rounded shadow-lg efecto-hover' onClick={e => navegarADetalle(pelicula._id)}>
                                                <div>
                                                    <div style={{ "backgroundImage": `url("${pelicula.imagen}")`, ...imgStyles}}></div>
                                                </div>
                                                <div className='card-body px-2 pb-3 pt-2'>
                                                    <h5 className="card-title mb-3 fw-bold">{pelicula.titulo}</h5>
                                                    <div className='d-flex gap-2 justify-content-start'>
                                                        <NavLink to={`/media/${pelicula._id}`} className="btn btn-sm btn-primary">Descripción</NavLink>
                                                        <a 
                                                            href={pelicula.urlPelicula} 
                                                            target='_blank' 
                                                            rel="noopener noreferrer" 
                                                            className='btn btn-sm btn-success' >
                                                            Ver ahora
                                                        </a>
                                                    </div>
                                                    <p className='m-0 mt-3 text-secondary' style={{ "fontSize": ".90rem" }}>Estreno: {pelicula.fechaEstreno.slice(0,10)}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }</div>
                            :
                                <div className='row mt-3'>
                                    <div className='col-md-8 mx-auto'>
                                        <p className='text-secondary text-center'>No hay elementos para mostrar</p>
                                    </div>
                                </div>
                    }
                    
                </div>
            </div>
        </div>
    )


}

export default MainMovies