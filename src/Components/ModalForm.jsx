import React from 'react'

const ModalForm = ({ 
  cancelar, tituloModal, formInputs, 
  errors, options, campos, previsualizacionUrl, 
  cargando, validarCampos, capturarCampos
}) => {
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
  )
}

export default ModalForm