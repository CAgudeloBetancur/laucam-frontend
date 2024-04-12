import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="container-fluid bg-light">
      <div className="row">
        <div className="col-12 col-md-8 mx-auto">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <NavLink to="/" className="navbar-brand fw-bold fs-4">LauCam</NavLink>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Administrar
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                      <li><NavLink to="/tipo" className="dropdown-item">Tipo</NavLink></li>
                      <li><NavLink to="/productora" className="dropdown-item">Productora</NavLink></li>
                      <li><NavLink to="/director" className="dropdown-item">Director</NavLink></li>
                      <li><NavLink to="/genero" className="dropdown-item">Genero</NavLink></li>
                      <li><NavLink to="/" className="dropdown-item">Media</NavLink></li>            
                  </ul>
                  </li>
                </ul>
              </div>
            </nav>
        </div>
      </div>
    </div>
  )
}

export default Navbar