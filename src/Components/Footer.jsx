import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <div className="container-fluid py-2 bg-light">
    <div className="row">
      <div className="col-12 col-md-8 mx-auto">
        <div className='d-flex flex-column align-items-center'>
          <NavLink to="/" className="navbar-brand fw-bold fs-4">LauCam</NavLink>
          <div className='d-flex gap-3 mt-3'>
            <p className='text-secondary'>Desarrollado por:</p>
            <p className='d-flex flex-row align-items-center'><a className="d-flex flex-row align-items-center text-decoration-none text-secondary" target="_blank" rel="noreferrer" href="https://github.com/laurablandonm"><i className='fa-brands fa-github fs-4 text-secondary pe-2'></i><span>Laura Blandón</span></a><span className='px-3'>|</span><a className="d-flex flex-row align-items-center text-decoration-none text-secondary" target="_blank" rel="noreferrer" href="https://github.com/CAgudeloBetancur"><i className='fa-brands fa-github fs-4 text-secondary pe-2'></i>Camilo Agudelo</a></p>
          </div>
        </div>
      </div>
    </div>
</div>
  )
}

export default Footer