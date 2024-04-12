export const formInputsMedia = [
  {
    name: 'serial',
    type: 'text'
  },
  {
    name: 'titulo',
    type: 'text ',
  },
  {
    name: 'sinopsis',
    type: 'textarea'
  },
  {
    name: 'urlPelicula',
    type: 'text'
  },
  {
    name: 'imagen',
    type: 'text'
  },
  {
    name: 'fechaEstreno',
    type: 'date'
  },
  {
    name: 'generoPrincipal',
    model: 'genero',
    type: 'select'
  },
  {
    name: 'directorPrincipal',
    model: 'director',
    type: 'select'
  },
  {
    name: 'productora',
    model: 'productora',
    type: 'select'
  },
  {
    name: 'tipo',
    model: 'tipo',
    type: 'select'
  }
]

export const formInputsDirector = [
  {
    name: 'nombre',
    type: 'text'
  },
  {
    name: 'estado',
    type: 'select'
  }
]

export const formInputsGenero = [
  {
    name: 'nombre',
    type: 'text'
  },
  {
    name: 'estado',
    type: 'select'
  },
  {
    name: 'descripcion',
    type: 'textarea'
  }
]

export const formInputsProductora = [
  {
    name: 'nombre',
    type: 'text'
  },
  {
    name: 'estado',
    type: 'select'
  },
  {
    name: 'slogan',
    type: 'text'
  },
  {
    name: 'descripcion',
    type: 'textarea'
  }
]

export const formInputsTipo = [
  {
    name: 'nombre',
    type: 'text'
  },
  {
    name: 'descripcion',
    type: 'textarea'
  },
]