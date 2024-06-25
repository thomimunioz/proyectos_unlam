document.addEventListener("DOMContentLoaded", () => {
    const tarjetaCheck = document.getElementById("tarjeta");
    const tarjetaInput = document.querySelector(".inputDos input");
    const cvcInput = document.querySelector(".inputTres input");
    const fechaInput = document.querySelector(".inputCuatro input");

    const submitButton = document.getElementById("confirmarCambios");
    const cerrarSesionButton = document.getElementById("cerrarSesion");

    const cuponCheck = document.getElementById("cuponPago");
    const pagoFacilCheck = document.getElementById("pagoFacil");
    const rapipagoCheck = document.getElementById("rapipago");

    const transferenciaBancaria = document.getElementById("transferenciaBancaria");

    const iconElements = document.querySelectorAll(".seleccion img");
    const profileImage = document.querySelector(".fotoPerfil .grande img");

    const nombreActual = document.getElementById("nombreUsuarioAColocar");
    const nombreUsuarioNuevo = document.getElementById("nuevoUsuario");

    iconElements.forEach(icon => {
        icon.addEventListener("click", () => {
            profileImage.src = icon.src;
            submitButton.disabled = false; // Habilitar el botón al cambiar la foto de perfil
        });
    });

    function cerrarSesion() {
        localStorage.removeItem("datosUsuario");
    }

    function cargarEstado() {
        const datosUsuario = JSON.parse(localStorage.getItem("datosUsuario")) || {};
        profileImage.src = datosUsuario.profileImage || '';
        tarjetaCheck.checked = datosUsuario.tarjetaCheck || false;
        tarjetaInput.value = datosUsuario.tarjetaInput || '';
        cvcInput.value = datosUsuario.cvcInput || '';
        fechaInput.value = datosUsuario.fechaInput || '';
        cuponCheck.checked = datosUsuario.cuponCheck || false;
        pagoFacilCheck.checked = datosUsuario.pagoFacilCheck || false;
        rapipagoCheck.checked = datosUsuario.rapipagoCheck || false;
        transferenciaBancaria.checked = datosUsuario.transferenciaBancaria || false;
        nombreActual.textContent = datosUsuario.nombreUsuario || '';
        nombreUsuarioNuevo.value = datosUsuario.nombreUsuario || '';
    }

    function guardarEstado() {
        const datosUsuario = JSON.parse(localStorage.getItem("datosUsuario")) || {};

        datosUsuario.profileImage = profileImage.src;
        datosUsuario.tarjetaCheck = tarjetaCheck.checked;
        datosUsuario.tarjetaInput = tarjetaInput.value;
        datosUsuario.cvcInput = cvcInput.value;
        datosUsuario.fechaInput = fechaInput.value;
        datosUsuario.cuponCheck = cuponCheck.checked;
        datosUsuario.pagoFacilCheck = pagoFacilCheck.checked;
        datosUsuario.rapipagoCheck = rapipagoCheck.checked;
        datosUsuario.transferenciaBancaria = transferenciaBancaria.checked;
        datosUsuario.nombreUsuario = nombreUsuarioNuevo.value;

        localStorage.setItem("datosUsuario", JSON.stringify(datosUsuario));
    }

    function desmarcarOtrosExceptoCupon(checkbox) {
        const checkboxes = [tarjetaCheck, cuponCheck, transferenciaBancaria];
        checkboxes.forEach(chk => {
            if (chk !== checkbox) {
                chk.checked = false;
            }
        });
    }

    function desmarcarRapipagoYPagoFacil() {
        if (!cuponCheck.checked) {
            pagoFacilCheck.checked = false;
            rapipagoCheck.checked = false;
        }
    }

    function permitirSoloUnaOpcion() {
        if (pagoFacilCheck.checked && rapipagoCheck.checked) {
            rapipagoCheck.checked = false;
        }
    }

    [tarjetaCheck, cuponCheck, transferenciaBancaria].forEach(chk => {
        chk.addEventListener('change', () => {
            if (chk.checked) {
                desmarcarOtrosExceptoCupon(chk);
            }
            desmarcarRapipagoYPagoFacil();
            submitButton.disabled = false; // Habilitar el botón al cambiar la forma de pago
        });
    });

    pagoFacilCheck.addEventListener('change', () => {
        if (pagoFacilCheck.checked) {
            rapipagoCheck.checked = false;
        }
        submitButton.disabled = false; // Habilitar el botón al cambiar la opción de pago fácil
    });

    rapipagoCheck.addEventListener('change', () => {
        if (rapipagoCheck.checked) {
            pagoFacilCheck.checked = false;
        }
        submitButton.disabled = false; // Habilitar el botón al cambiar la opción de rapipago
    });

    nombreUsuarioNuevo.addEventListener('input', () => {
        submitButton.disabled = false; // Habilitar el botón al cambiar el nombre de usuario
    });

    submitButton.addEventListener("click", (event) => {
        event.preventDefault();

        let isValid = true;

        if (tarjetaCheck.checked) {
            if (tarjetaInput.value.length < 16 || tarjetaInput.value.length > 19) {
                isValid = false;
                alert("El número de tarjeta debe tener entre 16 y 19 dígitos.");
            }

            const CVCNumero = cvcInput.value;
            let arrayCVC = Array.from(CVCNumero);
            let cvcero = 0;

            for (let i = 0; i < arrayCVC.length; i++) {
                if (arrayCVC[i] === "0") {
                    cvcero++;
                }
            }

            if (CVCNumero.length !== 3 || cvcero !== 0) {
                isValid = false;
                alert("El CVC es inválido.");
            }

            if (!fechaInput.value) {
                isValid = false;
                alert("Debe ingresar una fecha de vencimiento.");
            }

            const tarjetaNumero = tarjetaInput.value;
            let arrayTarjeta = Array.from(tarjetaNumero);
            let suma = 0;

            for (let i = 0; i < arrayTarjeta.length - 1; i++) {
                suma += parseInt(arrayTarjeta[i], 10);
            }

            const ultimoDigito = parseInt(arrayTarjeta[arrayTarjeta.length - 1], 10);

            if ((suma % 2 === 0 && ultimoDigito % 2 !== 0) || (suma % 2 !== 0 && ultimoDigito % 2 === 0)) {
                // La tarjeta es válida
            } else {
                alert("La tarjeta es inválida.");
                isValid = false;
            }
        }

        if (isValid) {
            guardarEstado();
            nombreActual.textContent = nombreUsuarioNuevo.value; // Actualizar el nombre de usuario mostrado
            alert("Los cambios se han guardado correctamente.");
            submitButton.disabled = true; // Deshabilitar el botón después de guardar los cambios
        }
    });

    cerrarSesionButton.addEventListener("click", () => {
        cerrarSesion();
    });

    window.onload = cargarEstado;
});
