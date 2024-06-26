const QUERY_PARAMS_NOMBRE = 'nombre';
const urlVista = document.location.href;
const url = new URL(urlVista);
const nombreEra = url.searchParams.get(QUERY_PARAMS_NOMBRE);

const ERAS = JSON.parse(localStorage.getItem('eras'));

if (ERAS) {
    // Buscar la era por su nombre
    const eraData = ERAS.find(era => era.nombre === nombreEra);

    if (eraData) {
        const era = new Era(eraData);

        document.getElementById('eraTitulo').textContent = era.nombre;
        document.querySelector('iframe').src = era.iframe;
        document.getElementById('eraGenero').textContent = era.genero;
        document.getElementById('eraResumen').textContent = era.descripcion;

        function rellenarProductores(){
        const productoresContainer = document.querySelector('.nombresProductor');
        productoresContainer.innerHTML = ''; // Saca por las dudas los productores anteriores
        const productores = era.productores;
        productores.forEach(productor => {
            const link = document.createElement('a');
            link.href = productor.productorLink;
            link.textContent = productor.nombreProductor;
            link.target = '_blank';
            productoresContainer.appendChild(link);
        })};

        function rellenarCanciones() {
            const cancionSelect = document.getElementById('cancion');
            cancionSelect.innerHTML = ''; // Saca las las opciones anteriores

            const canciones = era.canciones;
            canciones.forEach(cancion => {
                const optionElement = document.createElement('option');
                optionElement.value = cancion.nombre;
                optionElement.textContent = cancion.nombre;
                cancionSelect.appendChild(optionElement);
            });

            // Inicializa el primer video
            if (canciones.length > 0) {
                handleCancionChange(); 
            }
        }

        function handleCancionChange() {
            const cancionSelect = document.getElementById('cancion');
            const selectedSongName = cancionSelect.value;
            const selectedSong = era.canciones.find(cancion => cancion.nombre === selectedSongName);
            const videoLink = document.getElementById('linkVideoReproducir');

            /*console.log('Selected Song:', selectedSong); // Log testeo*/

            if (selectedSong) {
                const formatoSeleccionado = document.getElementById('tiporeproduccion').value;
                if (formatoSeleccionado === 'opcion1') {
                    videoLink.href = selectedSong.linkMV;
                    /*console.log(`MV link loaded: ${selectedSong.linkMV}`); // Log testeo*/
                } else if (formatoSeleccionado === 'opcion2') {
                    videoLink.href = selectedSong.linkLyric;
                    /*console.log(`Lyric link loaded: ${selectedSong.linkLyric}`); // Log testeo*/
                } else {
                    console.error('Formato no reconocido:', formatoSeleccionado);
                }
            } else {
                videoLink.href = '';
            }
        }

        rellenarCanciones();
        rellenarProductores();

        const cancionSelect = document.getElementById('cancion');
        cancionSelect.addEventListener('change', handleCancionChange);

        const formatoSelect = document.getElementById('tiporeproduccion');
        formatoSelect.addEventListener('change', handleCancionChange);
    } else {
        console.error('No se encontro era con este nombre:', nombreEra);
    }
} else {
    console.error('No se encontro informacion en LocalStorage.');
}

const btnCerrarSesion = document.getElementById('btnCerrarSesion')

btnCerrarSesion.addEventListener('click',() => {
    localStorage.removeItem('datosUsuario')
} )