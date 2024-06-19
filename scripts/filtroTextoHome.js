document.addEventListener('DOMContentLoaded', () => {
    const elementos = [
        ...ERAS,
        ...PELICULAS,
        ...ENTREVISTAS
    ];

    const searchInput = document.getElementById("searchInput");
    const contenedorResultados = document.getElementById('contenedorResultados');

    searchInput.addEventListener('input', (event) => {
        const filtro = event.target.value.toLowerCase().trim();
        console.log("Texto ingresado:", filtro);

        const resultados = elementos.filter(elemento =>
            elemento.nombre.toLowerCase().includes(filtro)
        );

        console.log("Resultados filtrados:", resultados);
        mostrarResultados(resultados);

        if (filtro === '') {
            mostrarElementos(['contenedorBanner', 'menu_desplegable', 'seccionPrincipal']);
        } else {
            ocultarElementos(['contenedorBanner', 'menu_desplegable', 'seccionPrincipal']);
        }

        if (resultados.length === 0) {
            mostrarMensajeNoCoincidencias();
        } else {
            ocultarMensajeNoCoincidencias();
        }
    });

    function mostrarResultados(resultados) {
        contenedorResultados.innerHTML = '';

        resultados.forEach(result => {
            const div = document.createElement('div');
            div.classList.add('resultado');

            const enlace = document.createElement('a');

            let href = '';
            if (ERAS.includes(result)) {
                href = `./erasDetails.html?nombre=${result.nombre}`;
            } else if (PELICULAS.includes(result)) {
                href = `./peliculasDetails.html?nombre=${result.nombre}`;
            } else if (ENTREVISTAS.includes(result)) {
                href = `./entrevistasDetails.html?nombre=${result.nombre}`;
            }
            enlace.href = href;

            const img = document.createElement('img');
            img.src = result.imagen;
            img.alt = result.nombre;

            enlace.appendChild(img);

            div.appendChild(enlace);

            contenedorResultados.appendChild(div);
        });
    }

    function mostrarElementos(ids) {
        ids.forEach(id => {
            const elemento = document.getElementById(id);
            if (elemento) {
                elemento.classList.remove('hide');
            }
        });
    }

    function ocultarElementos(ids) {
        ids.forEach(id => {
            const elemento = document.getElementById(id);
            if (elemento) {
                elemento.classList.add('hide');
            }
        });
    }

    function mostrarMensajeNoCoincidencias() {
        const mensaje = document.createElement('p');
        mensaje.textContent = 'No se han encontrado coincidencias';
        mensaje.classList.add('mensaje-no-coincidencias', 'noHayCoincidencias'); 
        contenedorResultados.appendChild(mensaje);
    }
    

    function ocultarMensajeNoCoincidencias() {
        const mensaje = contenedorResultados.querySelector('.mensaje-no-coincidencias');
        if (mensaje) {
            mensaje.remove();
        }
    }

    searchInput.addEventListener('keyup', (event) => {
        if (event.key === 'Backspace' || event.key === 'Delete') {
            if (searchInput.value.trim() === '') {
                mostrarElementos(['contenedorBanner', 'menu_desplegable', 'seccionPrincipal']);
                contenedorResultados.innerHTML = '';
            }
        }
    });
});