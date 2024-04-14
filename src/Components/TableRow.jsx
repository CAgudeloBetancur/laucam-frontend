import React from 'react'
import { NavLink } from 'react-router-dom'

const TableRow = ({elemento, columnas, openModal, eliminarElemento, modelo}) => {
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
  )
}

export default TableRow