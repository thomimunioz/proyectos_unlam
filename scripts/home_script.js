const menuDesplegable = document.getElementById('menu_desplegable');
const seccionEras = document.getElementById('seccion_eras');
const seccionPeliculas = document.getElementById('seccion_peliculas');
const seccionEntrevistas = document.getElementById('seccion_entrevistas');

menuDesplegable.addEventListener('change', function(){

    seccionEras.classList.add('hide');
    seccionPeliculas.classList.add('hide');
    seccionEntrevistas.classList.add('hide');

    const seleccion = menuDesplegable.value;

    if(seleccion === 'eras'){
        seccionEras.classList.remove('hide');
    } else if (seleccion === 'peliculas'){
        seccionPeliculas.classList.remove('hide');
    } else if (seleccion === 'entrevistas'){
        seccionEntrevistas.classList.remove('hide');
    } else if (seleccion === 'seleccionar'){
        seccionEras.classList.remove('hide');
        seccionPeliculas.classList.remove('hide');
        seccionEntrevistas.classList.remove('hide');
    }
})