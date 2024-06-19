const QUERY_PARAMS_NOMBRE = 'nombre';
const urlVista = document.location.href;
const url = new URL(urlVista);
const nombreEntrevista = url.searchParams.get(QUERY_PARAMS_NOMBRE);

const ENTREVISTAS = JSON.parse(localStorage.getItem('entrevistas'));

if (ENTREVISTAS) {
    // Buscar entrevista por nombre
    const entrevistaData = ENTREVISTAS.find(entrevista => entrevista.nombre === nombreEntrevista);

    if (entrevistaData) {
        const entrevista = new Entrevista(entrevistaData);

        document.getElementById('entrevistaTitulo').textContent = entrevista.nombre;
        document.querySelector('iframe').src = entrevista.iframe;
        document.getElementById('entrevistaDuracion').textContent = entrevista.duracion
        document.getElementById('entrevistaPrograma').textContent = entrevista.canal;
        document.getElementById('entrevistaResumen').textContent = entrevista.resumen;
        document.getElementById('linkReproducirEntrevista').href = entrevista.videoLink;

        function rellenarParticipantes(){
        const participantesContainer = document.querySelector('.nombresParticipantes');
        participantesContainer.innerHTML = '';
        const participantes = entrevista.participantes;

        console.log('Participantes:', participantes);
        participantes.forEach(participante => {
            const link = document.createElement('a');
            link.href = participante.participanteLink;
            link.textContent = participante.nombreParticipante;
            link.target = '_blank';
            participantesContainer.appendChild(link);
        })}

        rellenarParticipantes();
    } else{
        console.error('No se encontro entrevista con este nombre:',nombrePelicula);
    }
}else {
    console.error('No se encontro informacion en LocalStorage')
}
