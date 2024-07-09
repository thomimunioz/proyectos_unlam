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
    const emailAMostrar = document.getElementById("emailColocar");
    const nombreActual = document.getElementById("nombreUsuarioAColocar");
    const nombreUsuarioNuevo = document.getElementById("nuevoUsuario");

    let usuarioLogueado = {};
    let datosUsuarios = [];

    iconElements.forEach(icon => {
        icon.addEventListener("click", () => {
            profileImage.src = icon.src;
            submitButton.disabled = false; 
        });
    });

    function cerrarSesion() {
        
        const confirmacion = confirm("¿Está seguro que quiere eliminar su cuenta?");
    
        if (confirmacion) {
            const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));
            let datosUsuarios = JSON.parse(localStorage.getItem("datosUsuario")) || [];
    
            
            const index = datosUsuarios.findIndex(user => user.email === usuarioLogueado.email);
    
            if (index !== -1) {
                
                datosUsuarios.splice(index, 1);
                
                localStorage.setItem("datosUsuario", JSON.stringify(datosUsuarios));
            }
    
            
            localStorage.removeItem("usuarioLogueado");
    
            
            window.location.href = "../index.html";
        }
    }

    function cargarEstado() {
        usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado")) || {};
        datosUsuarios = JSON.parse(localStorage.getItem("datosUsuario")) || [];
        
        profileImage.src = usuarioLogueado.profileImage || '';
        tarjetaCheck.checked = usuarioLogueado.tarjetaCheck || false;
        tarjetaInput.value = usuarioLogueado.tarjetaInput || '';
        cvcInput.value = usuarioLogueado.cvcInput || '';
        fechaInput.value = usuarioLogueado.fechaInput || '';
        cuponCheck.checked = usuarioLogueado.cuponCheck || false;
        pagoFacilCheck.checked = usuarioLogueado.pagoFacilCheck || false;
        rapipagoCheck.checked = usuarioLogueado.rapipagoCheck || false;
        transferenciaBancaria.checked = usuarioLogueado.transferenciaBancaria || false;
        nombreActual.textContent = usuarioLogueado.nombreUsuario || '';
        nombreUsuarioNuevo.value = usuarioLogueado.nombreUsuario || '';
        emailAMostrar.textContent = usuarioLogueado.email;

        submitButton.disabled = true; 
    }

    function guardarEstado() {
        const index = datosUsuarios.findIndex(user => user.email === usuarioLogueado.email);

        usuarioLogueado.profileImage = profileImage.src;
        usuarioLogueado.tarjetaCheck = tarjetaCheck.checked;
        usuarioLogueado.tarjetaInput = tarjetaInput.value;
        usuarioLogueado.cvcInput = cvcInput.value;
        usuarioLogueado.fechaInput = fechaInput.value;
        usuarioLogueado.cuponCheck = cuponCheck.checked;
        usuarioLogueado.pagoFacilCheck = pagoFacilCheck.checked;
        usuarioLogueado.rapipagoCheck = rapipagoCheck.checked;
        usuarioLogueado.transferenciaBancaria = transferenciaBancaria.checked;
        usuarioLogueado.nombreUsuario = nombreUsuarioNuevo.value;

        datosUsuarios[index] = usuarioLogueado;

        localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioLogueado));
        localStorage.setItem("datosUsuario", JSON.stringify(datosUsuarios));
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

    function verificarNombreUsuario() {
        const nuevoNombreUsuario = nombreUsuarioNuevo.value.trim();
        if (nuevoNombreUsuario === usuarioLogueado.nombreUsuario) {
            submitButton.disabled = true;
            alert("El nuevo nombre de usuario no puede ser igual al anterior.");
            return;
        }

        const nombreUsuarioExistente = datosUsuarios.some(user => user.nombreUsuario === nuevoNombreUsuario);
        if (nombreUsuarioExistente) {
            submitButton.disabled = true;
            alert("El nombre de usuario ya está en uso. Por favor, elija otro.");
            return;
        }

        submitButton.disabled = false;
    }

    [tarjetaCheck, cuponCheck, transferenciaBancaria].forEach(chk => {
        chk.addEventListener('change', () => {
            if (chk.checked) {
                desmarcarOtrosExceptoCupon(chk);
            }
            desmarcarRapipagoYPagoFacil();
            submitButton.disabled = false; 
        });
    });

    pagoFacilCheck.addEventListener('change', () => {
        if (pagoFacilCheck.checked) {
            rapipagoCheck.checked = false;
        }
        submitButton.disabled = false; 
    });

    rapipagoCheck.addEventListener('change', () => {
        if (rapipagoCheck.checked) {
            pagoFacilCheck.checked = false;
        }
        submitButton.disabled = false; 
    });

    nombreUsuarioNuevo.addEventListener('input', () => {
        verificarNombreUsuario();
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
               
            } else {
                alert("La tarjeta es inválida.");
                isValid = false;
            }
        }

        if (isValid) {
            guardarEstado();
            nombreActual.textContent = nombreUsuarioNuevo.value; 
            alert("Los cambios se han guardado correctamente.");
            submitButton.disabled = true; 
        }
    });

    cerrarSesionButton.addEventListener("click", () => {
        cerrarSesion();
    });

    window.onload = cargarEstado;

    const btnCerrarSesion = document.getElementById('btnCerrarSesion')

    btnCerrarSesion.addEventListener('click',() => {
        localStorage.removeItem('usuarioLogueado')
    } )

});
