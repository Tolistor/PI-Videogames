const regexFecha = /^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/

export const validations = (data)=> {
    let errors = {}

    if (!data.name) {
        errors.name = 'El nombre del videojuego no puede estar vacia'
    }

    if (!data.descripcion) {
        errors.descripcion = 'La descripcion del videojuego no puede estar vacia'
    }

    if (!data.imagen) {
        errors.imagen = 'La imagen del videojuego no puede estar vacia'
    }

    if (!data.rating) {
        errors.rating = 'El rating del videojuego no puede estar vacia'
    }

    if (!regexFecha.test(data.fecha_lanzamiento)) {
        errors.fecha_lanzamiento = 'La fecha debe ser en formato aaaa-mm-dd'
        
    }else if (!data.fecha_lanzamiento || data.fecha_lanzamiento === "") 
    errors.fecha_lanzamiento = 'La fecha de lanzamiento del videojuego no puede estar vacia'

    if (!data.genres) {
        errors.genres = 'El genero del videojuego no puede estar vacia'
    }

    if (!data.plataformas) {
        errors.plataformas = 'Las plataformas del videojuego no puede estar vacia'
    }

    return errors
}