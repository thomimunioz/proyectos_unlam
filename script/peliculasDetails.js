const QUERY_PARAMS_NOMBRE = 'nombre';
const urlVista = document.location.href;
const url = new URL(urlVista);
const nombrePelicula = url.searchParams.get(QUERY_PARAMS_NOMBRE);

const PELICULAS = JSON.parse(localStorage.getItem('peliculas'));

if (PELICULAS) {
    // Buscar pelicula por nombre
    const peliculaData = PELICULAS.find(pelicula => pelicula.nombre === nombrePelicula);

    if (peliculaData) {
        const pelicula = new Pelicula(peliculaData);

        document.getElementById('peliculaTitulo').textContent = pelicula.nombre;
        document.querySelector('iframe').src = pelicula.iframe;
        document.getElementById('peliculaDuracion').textContent = pelicula.duracion
        document.getElementById('peliculaGenero').textContent = pelicula.genero;
        document.getElementById('peliculaResumen').textContent = pelicula.descripcion;
        document.getElementById('linkReproducirVideo').href = pelicula.youtubeLink;

        function rellenarProductores(){
        const productoresContainer = document.querySelector('.nombresProductor');
        productoresContainer.innerHTML = ''; // Saca por las dudas los productores anteriores
        const productores = pelicula.productores;
        productores.forEach(productor => {
            const link = document.createElement('a');
            link.href = productor.productorLink;
            link.textContent = productor.nombreProductor;
            link.target = '_blank';
            productoresContainer.appendChild(link);
        })}

        rellenarProductores();
    } else{
        console.error('No se encontro pelicula con este nombre:',nombrePelicula);
    }
}else {
    console.error('No se encontro informacion en LocalStorage')
}

const btnCerrarSesion = document.getElementById('btnCerrarSesion')

btnCerrarSesion.addEventListener('click',() => {
    localStorage.removeItem('usuarioLogueado')
} )
