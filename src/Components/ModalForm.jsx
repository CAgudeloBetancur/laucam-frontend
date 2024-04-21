import React, { useEffect } from 'react'
import axios from 'axios'

const ModalForm = ({ 
  tituloModal, 
  formInputs, 
  errors, 
  options, 
  campos, 
  previsualizacionUrl, 
  setErrors,
  operacion,
  modelo,
  show_alert,
  setPrevisualizacionUrl,
  urlBase,
  setCampos,
  enviarConsulta
  }) => {

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

  const validarUrl = errores => {
    const patronUrl = /^(http|https):\/\/[\w.-]+(\.[\w-]+)+([\w-.,@?^=%&:/~+#]*[\w-@?^=%&/~+#])?$/;
    for(let input of formInputs) {
      if(input.name === 'imagen' || input.name === 'urlPelicula') {
        if((campos.hasOwnProperty(input.name) && campos[input.name].length > 0) && !patronUrl.test(campos[input.name])) {
          
          errores = {
            ...errores,
            [input.name]: [`${input.name} solo recibe url válidas`]
          }
        }
      }
    }
    // console.log('desde validarUrl:')
    return errores;
  }

  const validarCampos = async () => {
    let parametros = {}
    let metodo;
    let errores = validarCamposVacios()   
    errores = validarUrl(errores)

    console.log(errores)

    setErrors(errores)

    setTimeout(() => {
      setErrors({})
    },7000)

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
    }
  }
  
  return (
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
                                <p key={i} className='text-danger mb-2'>{error}</p>
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
  )
}

export default ModalForm