import React, { useEffect, useState } from 'react'
import { show_alert } from '../functions.js';
import axios from 'axios';

import ModalForm from './ModalForm.jsx';
import Table from './Table.jsx';

const capitalizarString = (str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`

const ElementsTable = ({modelo, columnas, formInputs}) => {

  // Estados locales 

  const urlBase = "https://laucam-backend.onrender.com"
  // const urlBase = "http://localhost:4001";
  const [campos, setCampos] = useState({});
  const [operacion, setOperacion] = useState(0);
  const [elementos, setElementos] = useState([]);
  const [tituloModal, setTituloModal] = useState('');
  const [options, setOptions] = useState({});
  const [errors, setErrors] = useState({});
  const [previsualizacionUrl, setPrevisualizacionUrl] = useState();

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
        if(response.data.length === 0) {
          setErrors(errors => {
            return {
              ...errors,
              [input.name]: [`Debes registrar al menos un ${input.model}`]
            }
          })
        }
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

  const enviarConsulta = async (metodo, parametros) => {
    await axios({
      method: metodo,
      url: `${urlBase}/${modelo}/${(metodo !== 'POST') ? parametros._id : ''}`,
      data: parametros
    }).then(function(respuesta) {
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
      document.getElementById('btnCerrar').click();
      obtenerLista();      
    }).catch(function(error) {
      console.log(error)
      show_alert(error.response.data.errors[0].msg, "error");
    })
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

        {/* Tabla */}

        {
          elementos.length > 0 
            ?
              <Table
                capitalizarString = {capitalizarString}
                openModal = {openModal}
                modelo = {modelo}
                columnas = {columnas}
                elementos = {elementos}
                show_alert = {show_alert}
                enviarConsulta = {enviarConsulta}/>
            : 
              <div className='row mt-3'>
                <div className='col-md-8 mx-auto'>
                  <p className='text-secondary text-center'>No hay elementos para mostrar</p>
                </div>
              </div>
        }

      </div>

      {/* Formulario Modal */}

      <ModalForm
        modelo = {modelo}
        setErrors = {setErrors}
        operacion = {operacion}
        tituloModal = {tituloModal}
        formInputs = {formInputs}
        errors = {errors}
        options = {options}
        campos = {campos}
        previsualizacionUrl = {previsualizacionUrl}
        obtenerLista = {obtenerLista}
        show_alert = {show_alert}
        setPrevisualizacionUrl = {setPrevisualizacionUrl}
        urlBase = {urlBase}
        setCampos = {setCampos}
        enviarConsulta = {enviarConsulta}/>

    </div>
  )
}

export default ElementsTable;