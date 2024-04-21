import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const MainMovies = () => {
    const urlBase = "http://localhost:4001";
    const [listaPeliculas, setListaPeliculas] = useState([])
    const obtenerLista = async () => {
        const respuesta = await axios.get(`${urlBase}/media/lista`)
        setListaPeliculas(respuesta.data);
    }

    useEffect(() => {
        obtenerLista()
    }, [])

    return (
        <div className='container mt-3'>
            <div className='row'>
                <div className='col-12 col-md-8 mx-auto'>
                    <div className='container'>
                    <div className='d-flex flex-row gap-2 flex-wrap'>{
                        listaPeliculas.map((pelicula, i) => {
                            return (
                             <div className='mb-3'>
                                <div key = {i} className="card d-block" 
                                    style = {{"maxWidth" : "18rem", "maxHeight" : "300px" , "minWidth" : "15rem"}}
                                    >
                                     <img src={pelicula.imagen} alt="img" style = {{ "maxWidth":"400px", "maxHeight" : "300px" }} />
                                        <div className="card-body">
                                            <h5 className="card-title">{pelicula.titulo}</h5>
                                            <NavLink className = "btn btn-primary" to={`/media/${pelicula._id}`}>ver detalle</NavLink>
                                        </div>

                                </div>
                            </div>
                            )
                        })
                    }</div>


                    </div>
                    
                </div>
            </div>
        </div>
    )


}

export default MainMovies