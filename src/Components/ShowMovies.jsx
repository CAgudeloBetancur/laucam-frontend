import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { show_alert } from '../functions.js';
import { NavLink } from 'react-router-dom';

const ShowMovies = () => {

  const url = 'http://localhost:4001/media/lista';

  const [tituloModal, setTituloModal] = useState('');
  const [movies, setMovies] = useState([]);

  const [id, setId] = useState('');
  const [serial, setSerial] = useState('');
  const [titulo, setTitulo] = useState('');
  const [sinopsis, setSinopsis] = useState('');
  const [urlPelicula, setUrlPelicula] = useState('');
  const [urlImagen, setUrlImagen] = useState('');
  const [operacion, setOperacion] = useState(0);

  useEffect(() => {
    getProducts();
  }, [])

  const getProducts = async () => {
    const respuesta = await axios.get(url);
    setMovies(respuesta.data);
  }

  const openModal = (operacion, id, serial, titulo, sinopsis, urlPelicula, urlImagen) => {

      setId(id);
      setSerial('');
      setTitulo('');
      setSinopsis('');
      setUrlPelicula('');
      setUrlImagen('');

      setOperacion(operacion);

      if(operacion === 1) {
        setTituloModal('Registrar Movie')
      } else if(operacion === 2) {
        setTituloModal('Editar Movie'); 
        setSerial(serial);
        setTitulo(titulo);
        setSinopsis(sinopsis);
        setUrlPelicula(urlPelicula);
        setUrlImagen(urlImagen);
      }

      window.setTimeout(function() {
        document.getElementById('serial').focus();
      },500)

    }

    const validarCampos = () => {
      let parametros;
      let metodo;
      if(serial.trim() === '') {
        show_alert('El serial es obligatorio');
      } else if(titulo.trim() === '') {
        show_alert('El titulo es obligatorio');
      } else if(sinopsis.trim() === '') {
        show_alert('La sinopsis es obligatoria');
      } else if(urlPelicula.trim() === '') {
        show_alert('La url de la pelicula es obligatoria');
      } else if(urlImagen.trim() === '') {
        show_alert('La url de la imagen es obligatoria');
      } else {
        parametros = {
          serial: serial.trim(),
          titulo: titulo.trim(),
          sinopsis: sinopsis.trim(),
          urlPelicula: urlPelicula.trim(),
          urlImagen: urlImagen.trim()
        }
        if(operacion === 1) metodo = 'POST'
        if(operacion === 2) {
          parametros.id = id.trim;
          metodo = 'PUT' 
        }
        enviarConsulta(metodo, parametros);
      }
    }

    const enviarConsulta = async (metodo, parametros) => {
      await axios({
        method: metodo,
        url: `http://localhost:4001/media/${(metodo === 'PUT' ? `${parametros.id}`: '')}`,
        data: parametros
      }).then(function(respuesta) {
        let codigo = respuesta.data[0]
        let msj = respuesta.data[1]
        show_alert(msj)
        if(codigo === 'success') {
          document.getElementById('btnCerrar').click();
          getProducts();
        }
      }).catch(function(error) {
        show_alert(error.response.data.errors[0].msg, "error");
        console.log(error);
      })
    }

    const eliminarMedia = (id, titulo) => {
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        title: `¿Seguro quieres eliminar "${titulo}"?`,
        icon: 'question',
        text: 'No se podrá deshacer esta acción',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then(result => {
        if(result.isConfirmed) {
          setId(id);
          enviarConsulta('Delete', {id: id})
        }
        else {
          show_alert('El producto NO fue eliminado', 'info');
        }
      })
    }

  return (

    <div className='App'>

      <div className='container-fluid'>

        <div className='row mt-3'>
          <div className="col-md-4 offset-md-4">
            <div className="d-grid mx-auto">
              <button 
                className='btn btn-dark'
                data-bs-toggle='modal'
                data-bs-target='#modalMovies'
                onClick={() => openModal(1)}>
                  <i className="fa-solid fa-circle-plus"></i>
                  &nbsp;
                  Añadir
              </button>
            </div>
          </div>
        </div>

        <div className='row mt-3'>
          <div className="col-12 col-lg-8 offset-0 offset-lg-2">
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Serial</th>
                    <th>Titulo</th>
                    <th>Url</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className='table-group-divider'>
                  {
                    movies.map((movie) => {
                      return (
                        <tr key={movie._id}>
                          <td>{movie.serial}</td>
                          <td><NavLink to={`/movie/${movie._id}`}>{movie.titulo}</NavLink></td>
                          <td>{movie.urlPelicula}</td>
                          <td>
                            <button 
                              onClick={ () => openModal( 2, movie._id, movie.serial, movie.titulo, movie.sinopsis, movie.urlPelicula, movie.urlImagen)}
                              className="btn btn-warning"
                              data-bs-toggle='modal'
                              data-bs-target='#modalMovies'
                              >
                              <i className='fa-solid fa-edit'></i>
                            </button>
                            &nbsp;
                            <button 
                              className='btn btn-danger'
                              onClick={() => eliminarMedia(movie._id, movie.titulo)}>
                              <i className='w-3 fa-solid fa-trash'></i>
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>

      <div id='modalMovies' className='modal fade' area-hidden='true'>
        <div className='modal-dialog'>
          <div className="modal-content">
            <div className='modal-header'>
              <label className='h5'>{tituloModal}</label>
              <button 
                type='button' 
                className='btn-close' 
                data-bs-dismiss='modal'
                aria-label='Close'>
              </button>
            </div>
            <div className='modal-body'>
              <input type="hidden" id="id"/>
              <div className="input-group mb-3">
                <span className='input-group-text'>
                  Serial
                </span>
                <input 
                  type="text"
                  id='serial'
                  className='form-control'
                  placeholder='Serial'
                  value={serial}
                  onChange={(e) => setSerial(e.target.value)}/>
              </div>
              <div className="input-group mb-3">
                <span className='input-group-text'>
                  Titulo
                </span>
                <input 
                  type="text"
                  id='titulo'
                  className='form-control'
                  placeholder='Titulo'
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}/>
              </div>
              <div className="input-group mb-3">
                <span className='input-group-text'>
                  Sinopsis
                </span>
                <input 
                  type="text"
                  id='sinopsis'
                  className='form-control'
                  placeholder='Sinopsis'
                  value={sinopsis}
                  onChange={(e) => setSinopsis(e.target.value)}/>
              </div>
              <div className="input-group mb-3">
                <span className='input-group-text'>
                  Url Pelicula
                </span>
                <input 
                  type="text"
                  id='urlPelicula'
                  className='form-control'
                  placeholder='Url Pelicula'
                  value={urlPelicula}
                  onChange={(e) => setUrlPelicula(e.target.value)}/>
              </div>
              <div className="input-group mb-3">
                <span className='input-group-text'>
                  Url Imagen
                </span>
                <input 
                  type="text"
                  id='urlImagen'
                  className='form-control'
                  placeholder='Url Imagen'
                  value={urlImagen}
                  onChange={(e) => setUrlImagen(e.target.value)}/>
              </div>
              <div className='d-grid col-6 mx-auto'>
                <button 
                  className='btn btn-success'
                  onClick={() => validarCampos()}>
                  <i className='fa-solid fa-floppy-disk'></i>
                  &nbsp;
                  Guardar
                </button>
              </div>
            </div>
            <div className='modal-footer'>
              <button 
                id="btnCerrar"
                type='button'
                className='btn btn-secondary'
                data-bs-dismiss='modal'>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default ShowMovies