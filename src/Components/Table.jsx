import React from 'react'
import TableRow from './TableRow'
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

const Table = ({openModal, modelo, columnas, elementos, show_alert, enviarConsulta}) => {

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

  return (
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
                elementos?.map((elemento, i) => {
                  return (
                    <TableRow
                      key={i} 
                      elemento = {elemento}
                      columnas = {columnas}
                      openModal = {openModal}
                      eliminarElemento = {eliminarElemento}
                      modelo = {modelo}/>
                  );
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Table