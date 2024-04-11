import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Administrar
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li><NavLink to="/tipo" className="dropdown-item">Tipo</NavLink></li>
            <li><NavLink to="/productora" className="dropdown-item">Productora</NavLink></li>
            <li><NavLink to="/director" className="dropdown-item">Director</NavLink></li>
            <li><NavLink to="/genero" className="dropdown-item">Genero</NavLink></li>
            <li><NavLink to="/" className="dropdown-item">Media</NavLink></li>            
        </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
  )
}

export default Navbar