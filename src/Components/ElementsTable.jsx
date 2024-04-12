import React, { useEffect, useState, useCallback } from 'react'
import { NavLink } from 'react-router-dom';
import { show_alert } from '../functions.js';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

const capitalizarString = (str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`

const ElementsTable = ({modelo, columnas, formInputs}) => {

  // Estados locales 

  const urlBase = "http://localhost:4001"
  const [campos, setCampos] = useState({});
  const [operacion, setOperacion] = useState(0);
  const [elementos, setElementos] = useState([]);
  const [tituloModal, setTituloModal] = useState('');
  const [options, setOptions] = useState({});
  const [errors, setErrors] = useState({});
  const [previsualizacionUrl, setPrevisualizacionUrl] = useState(); 
  const [cargando, setCargando] = useState(false);
  const [cancelarOperacion, setCancelarOperacion] = useState(false);

  // Abrir modal

  const openModal = (modalOperacion, elemento) => {
    setOperacion(modalOperacion);
    setErrors({})
    cargarSelects();
    
    if(modalOperacion === 1) {
      setTituloModal(`Registrar ${capitalizarString(modelo)}`)
      let camposVacios = {}
      for(let campo in campos) {
        if(campo === '_id') continue;
        camposVacios = {
          ...camposVacios,
          [campo]: (campo === 'generoPrincipal' || campo === 'directorPrincipal' || campo === 'productora' || campo === 'tipo') 
                      ? 'default' 
                      : ''
        }
      }
      setCampos(camposVacios)
    }
    if(modalOperacion === 2) {
      setTituloModal(`Editar ${capitalizarString(modelo)}`); 
      let camposFormated = {}
      for(let campo in elemento) {
        camposFormated = {
          ...camposFormated,
          [campo]: 
            (campo === 'generoPrincipal' || campo === 'directorPrincipal' || campo === 'productora' || campo === 'tipo') 
              ? elemento[campo]._id 
              : (campo === 'fechaEstreno') 
                ? elemento[campo].slice(0,10) 
                : elemento[campo] 
        }
      }
      setPrevisualizacionUrl(camposFormated.imagen)
      setCampos(camposFormated)
    }

    window.setTimeout(function() {
      document.getElementById(formInputs[0].name).focus();
    },500)

  }

  // Cargar listas (invocacion)

  useEffect(() => {
    obtenerLista();
  },[modelo])
  
  // LLenar listas (declaracion)

  const cargarSelects = async () => {
    let selectsOptions = {}
    for(let input of formInputs) {
      if(input.name==='estado') continue;
      if(input.type === 'select') {
        const response = await axios.get(`${urlBase}/${input.model}/lista?soloActivos=true`)
        selectsOptions = {
          ...selectsOptions,
          [input.model]: response.data.map(registro => { return {value: registro._id, label: registro.nombre} })
        }
      }
    }
    setOptions(selectsOptions)
  }

  // Obtener lista de cada modelo

  const obtenerLista = async () => {
    const respuesta = await axios.get(`${urlBase}/${modelo}/lista`)
    setElementos(respuesta.data);
  }

  // Eliminar elemento por id

  const eliminarElemento = (elemento) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: `¿Seguro quieres eliminar "${(elemento.titulo) ? elemento.titulo : elemento.nombre}"?`,
      icon: 'question',
      text: 'No se podrá deshacer esta acción',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if(result.isConfirmed) {
        enviarConsulta('Delete', {_id: elemento._id})
      }
      else {
        show_alert('El producto NO fue eliminado', 'info');
      }
    })
  }

  useEffect(() => {

  },[cargando]);

  // Validar campos con el botón submit

  const validarCamposVacios = () => {
    let errores = { ...errors }
    for(let input of formInputs) {
      if(!(campos.hasOwnProperty(input.name)) || campos[input.name] === '' || campos[input.name] === 'default') {
        const mensajeVacio = [`${input.name} no puede estar vacio`]
        errores = {
          ...errores,
          [input.name]: [ ...(errores[input.name] !== undefined) ? errores[input.name] : [], ...(errores[input.name]?.includes(mensajeVacio[0])) ? [] : mensajeVacio]
        }
      }
    }

    return errores;
  }

  const validarCampos = async () => {
    setCancelarOperacion(false)
    let parametros = {}
    let metodo;
    let errores = validarCamposVacios()    

    setErrors(errores)

    setTimeout(() => {
      setErrors({})
    },4000)

    if(Object.keys(errores).length === 0) {
      for(let campo in campos) {
        if(campo === '__v') continue;
        parametros = {
          ...parametros,
          [campo] : (campo === 'generoPrincipal' || campo === 'directorPrincipal' || campo === 'productora' || campo === 'tipo') 
                    ? { _id: campos[campo].trim() } 
                    : campos[campo].trim()
        }
      }
  
      if(operacion === 1) metodo = 'POST'
      
      if(operacion === 2) {
        metodo = 'PUT' 
      }
      console.log(parametros)
      enviarConsulta(metodo, parametros);
    }

  }

  // Realizar consulta (post, get[id], put, patch, delete)

  const enviarConsulta = async (metodo, parametros) => {
    await axios({
      method: metodo,
      url: `http://localhost:4001/${modelo}/${(metodo !== 'POST') ? parametros._id : ''}`,
      data: parametros
    }).then(function(respuesta) {
      document.getElementById('btnCerrar').click();
      obtenerLista();      
    }).catch(function(error) {
      console.log(error)
      show_alert(error.response.data.errors[0].msg, "error");
    })
  }

  useEffect(() => {
    console.log(campos)
  },[campos])

  // Obtener valores ingresados por los inputs del formulario

  const capturarCampos = (e) => { 

    if(e.target.name === 'imagen') setPrevisualizacionUrl(e.target.value)

    let errores = {...errors}

    if(e.target.value === '' || e.target.value === 'default') {
      errores = {
        ...errores,
        [e.target.name]: [`${e.target.name} no puede estar vacio`]
      }
    } else {
      let nuevosErrores = {...errores}
      if(nuevosErrores[e.target.name] !== undefined) {
        if(nuevosErrores[e.target.name].length > 1) {
          nuevosErrores = {
            ...nuevosErrores,
            [e.target.name]: [] 
          }
          console.log(nuevosErrores)
        }else {
          delete nuevosErrores[e.target.name]
        }
      }
      errores = {...nuevosErrores};
    }

    if(e.target.name === 'estado') {
      if(operacion === 2) {
        let nombrePropiedad = (modelo === 'genero' || modelo === 'director') ? `${modelo}Principal` : modelo;
        if(e.target.value === 'Inactivo') {
          axios.get(`${urlBase}/media/lista?${nombrePropiedad}=${campos._id}`).then(response => {
            if(response.data > 0) {
              errores = {
                ...errores,
                [e.target.name]: [ ...(errores[e.target.name] !== undefined ) ? errores[e.target.name] : [] , `Este elemento esta referenciado, no se puede inactivar`]
              }
              show_alert(`Este elemento está referenciado por ${response.data} Medias, no se puede Inactivar`)
              setErrors(errores)
            }else{
              let nuevosErrores = {...errores}
              if(nuevosErrores[e.target.name] !== undefined) {
                if(nuevosErrores[e.target.name].length > 1) {
                  nuevosErrores = {
                    ...nuevosErrores,
                    [e.target.name]: errores[e.target.name]?.pop() 
                  }
                }else {
                  delete nuevosErrores[e.target.name]
                }
              }
              errores = {...nuevosErrores};
            }
          })
        }          
      }      
    }
    
    setErrors(errores)    
    
    let camposActualizados = {
      ...campos,
      [e.target.name]: e.target.value
    }

    setCampos(camposActualizados)

  }

  const cancelar = (e) => {
    let id = e.target.id;
    if(id === 'btnCerrar' || id === 'btnCerrarX' || id === 'modalMovies') {
      setPrevisualizacionUrl(null)
      setCancelarOperacion(true)
    }
  }

  return (
    <div className='App'>
      <div className='container-fluid'>
        <div className='row mt-3'>
          <div className="col-md-4 offset-md-4">
            <div className="d-grid mx-auto">
              <h1 className='text-center mb-4'><span className='fw-semibold'>Administra</span> <span className='fw-bold'>{capitalizarString(modelo)}</span></h1>
              <button 
                className='btn btn-dark'
                data-bs-toggle='modal'
                data-bs-target='#modalMovies'
                onClick={() => openModal(1)}
                >
                  <i className="fa-solid fa-circle-plus"></i>
                  &nbsp;
                  Añadir {modelo}
              </button>
            </div>
          </div>
        </div>

        <div className='row mt-3'>
          <div className="col-12 col-lg-8 offset-0 offset-lg-2">
            <div className="table-responsive">
              <table className="table table-sm table-borderless table-striped table-hover">
                <thead>
                  <tr>
                    {
                      columnas.map((etiqueta, i) => {
                        return (<th key={i}>{etiqueta}</th>)
                      })
                    }
                    <th></th>
                  </tr>
                </thead>
                <tbody className='table-group-divider'>
                  {
                    elementos?.map((elemento) => {
                      return (
                        <tr key={elemento._id}>
                          {
                            columnas.map((propiedad, i) => {
                              return (<td key={i}>{ (propiedad === 'titulo') ? <NavLink to={`/${modelo}/${elemento._id}`}>{elemento[propiedad]}</NavLink> : elemento[propiedad] }</td>)
                            })
                          }
                          <td>
                            <div className='d-flex flex-row justify-content-center gap-3'>
                              <button 
                                onClick={ (e) => openModal( 2, elemento)}
                                className="btn btn-warning"
                                data-bs-toggle='modal'
                                data-bs-target='#modalMovies'
                                style={{ "width": "3.5rem" }}
                                >
                                <i className='fa-solid fa-edit'></i>
                              </button>
                              &nbsp;
                              <button 
                                className='btn btn-danger'
                                onClick={() => eliminarElemento(elemento)}
                                style={{ "width": "3.5rem" }}
                                >
                                <i className='w-3 fa-solid fa-trash'></i>
                              </button>
                            </div>
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

      <div id='modalMovies' className='modal fade' area-hidden='true' onClick={(e) => {cancelar(e)}}>
        <div className='modal-dialog'>
          <div className="modal-content">
            <div className='modal-header'>
              <span className='h5'>{tituloModal}</span>
              <button 
                id='btnCerrarX'
                onClick={(e) => {cancelar(e)}}
                type='button' 
                className='btn-close' 
                data-bs-dismiss='modal'
                aria-label='Close'>
              </button>
            </div>
            <div className='modal-body'>
              <input type="hidden" id="id"/>
              { 
                formInputs.map((input,i) => {
                  return (
                    <div key={i}>
                      <div className={`input-group ${errors[input.name]?.length > 0 ? 'mb-0' : 'mb-3'}`}>
                        <span className='input-group-text'>
                          {input.name}
                        </span>
                        {
                          (input.type === 'select') && 
                            <select className={`form-select ${errors[input.name]?.length > 0 ? 'is-invalid' : ''}`} name={input.name} value={campos[input.name]} onChange={capturarCampos}>
                                <option value={'default'} >-- Selecciona --</option>
                                {
                                  (input.name === 'estado')
                                  ? <>
                                      <option value='Activo'>Activo</option>
                                      <option value='Inactivo'>Inactivo</option>
                                    </>
                                  : 
                                    options[input.model]?.map((option,i) => {
                                      return (
                                        <option key={i} value={option.value}>{option.label}</option>
                                      )
                                    })
                                }
                              </select>                        
                          
                        }
                        {
                          (input.type === 'textarea') && 
                            <textarea name={input.name} id={input.name} className={`form-control ${errors[input.name]?.length > 0 ? 'is-invalid' : ''}`} value={campos[input.name]} onChange={capturarCampos} placeholder={input.name}></textarea>
                        }                    
                        {
                          (input.type !== 'textarea' && input.type !== 'select' && input.type !== 'file') &&
                            <input 
                              type={[input.type]}
                              name={input.name}
                              id={input.name}
                              className={`form-control ${errors[input.name]?.length > 0 ? 'is-invalid' : ''}`}
                              placeholder={input.name}
                              value={campos[input.name]}
                              onChange={capturarCampos}/>
                        }
                        
                      </div>
                      <div>
                        {
                          (errors[input.name] !== undefined && errors[input.name]?.length > 0) && 
                            errors[input.name]?.map((error, i) => {
                              return(
                                <p key={i} className='text-danger mb-3'>{error}</p>
                              )
                          })
                        }
                      </div>
                      {
                        (previsualizacionUrl && input.name === 'imagen') && 
                        <div className='mt-3 mb-3'>
                          <div className="d-flex align-items-center justify-content-center">
                            <img className='d-inline-block' src={previsualizacionUrl} alt="" style={{ 'width' : '250px' }}/>
                          </div>
                        </div>
                      }
                    </div>
                  )
                })
              }
              <div className='d-grid col-6 mx-auto'>
                <button 
                  disabled={cargando}
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
                onClick={(e) => cancelar(e)}
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

export default ElementsTable;