const form = document.querySelector('.register-box');
const nombre = document.querySelector('input[placeholder="Ingrese nombre"]');
const apellido = document.querySelector('input[placeholder="Ingrese apellido"]');
const email = document.querySelector('input[placeholder="Ingrese email"]');
const nombreUsuario = document.querySelector('input[placeholder="Ingrese usuario"]');
const contrasena = document.querySelector('input[placeholder="Ingrese contraseña"]');
const repetirContrasena = document.querySelector('input[placeholder="Repetir contraseña"]');
const tarjetaNumero = document.querySelector('input[placeholder="Número de la tarjeta"]');
const tarjetaClave = document.querySelector('input[placeholder="XXX"]');
const confirmarBoton = document.getElementById('confirmarBoton');
const cancelarBoton = document.querySelector('button.cancelar');
const cuponPagoRadio = document.getElementById('cupon_pago');
const pagoFacilRadio = document.getElementById('pago_facil');
const rapipagoRadio = document.getElementById('rapipago');
const metodoPagoRadios = document.getElementsByName('metodo_pago');


const createErrorElement = () => {
    const errorElement = document.createElement('span');
    errorElement.className = 'error';
    errorElement.style.color = 'red';
    errorElement.style.display = 'none';
    return errorElement;
};

const nombreError = createErrorElement();
nombre.parentNode.appendChild(nombreError);

const apellidoError = createErrorElement();
apellido.parentNode.appendChild(apellidoError);

const emailError = createErrorElement();
email.parentNode.appendChild(emailError);

const nombreUsuarioError = createErrorElement();
nombreUsuario.parentNode.appendChild(nombreUsuarioError);

const contrasenaError = createErrorElement();
contrasena.parentNode.appendChild(contrasenaError);

const repetirContrasenaError = createErrorElement();
repetirContrasena.parentNode.appendChild(repetirContrasenaError);

const tarjetaNumeroError = createErrorElement();
tarjetaNumero.parentNode.appendChild(tarjetaNumeroError);

const tarjetaClaveError = createErrorElement();
tarjetaClave.parentNode.appendChild(tarjetaClaveError);


function soloLetras(cadena) {
    return /^[A-Za-z]+$/.test(cadena);
}

function esEmailValido(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function esNombreUsuarioValido(usuario) {
    return /^[A-Za-z0-9]+$/.test(usuario);
}

function esContrasenaValida(contrasena) {
    const contrasenaRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return contrasenaRegex.test(contrasena);
}

function coincidenContrasenas(contrasena1, contrasena2) {
    return contrasena1 === contrasena2;
}

function esTarjetaValida(numero) {
    const longitudValida = numero.length >= 16 && numero.length <= 19;
    const esNumero = /^[0-9]+$/.test(numero);
    if (!longitudValida || !esNumero) return false;

    const sumaDigitos = numero.slice(0, -1).split('').reduce((a, b) => parseInt(a) + parseInt(b), 0);
    const ultimoDigito = parseInt(numero.slice(-1));
    if ((sumaDigitos % 2 === 0 && ultimoDigito % 2 !== 0) || (sumaDigitos % 2 !== 0 && ultimoDigito % 2 === 0)) {
        return true;
    }
    return false;
}

function esClaveValida(clave) {
    return /^[1-9]{3}$/.test(clave);
}

function mostrarError(elemento, mensaje) {
    elemento.textContent = mensaje;
    elemento.style.display = 'block';
}

function ocultarError(elemento) {
    elemento.textContent = '';
    elemento.style.display = 'none';
}

function esEmailDuplicado(email) {
    const usuarios = JSON.parse(localStorage.getItem('datosUsuario')) || [];
    return usuarios.some(usuario => usuario.email === email);
}

function esNombreUsuarioDuplicado(nombreUsuario) {
    const usuarios = JSON.parse(localStorage.getItem('datosUsuario')) || [];
    return usuarios.some(usuario => usuario.nombreUsuario.toLowerCase() === nombreUsuario.toLowerCase());
}


function validarFormulario() {
    let esValido = true;

    if (!nombre.value.trim()) {
        mostrarError(nombreError, 'El nombre es requerido.');
        esValido = false;
    } else if (!soloLetras(nombre.value)) {
        mostrarError(nombreError, 'El nombre solo contiene letras.');
        esValido = false;
    } else {
        ocultarError(nombreError);
    }

    if (!apellido.value.trim()) {
        mostrarError(apellidoError, 'El apellido es requerido.');
        esValido = false;
    } else if (!soloLetras(apellido.value)) {
        mostrarError(apellidoError, 'El apellido solo contiene letras.');
        esValido = false;
    } else {
        ocultarError(apellidoError);
    }

    if (!email.value.trim()) {
        mostrarError(emailError, 'El email es requerido.');
        esValido = false;
    } else if (!esEmailValido(email.value)) {
        mostrarError(emailError, 'El email no es válido.');
        esValido = false;
    } else if (esEmailDuplicado(email.value)) {
        mostrarError(emailError, 'El email ya está en uso.');
        esValido = false;
    } else {
        ocultarError(emailError);
    }

    if (!nombreUsuario.value.trim()) {
        mostrarError(nombreUsuarioError, 'El usuario es requerido.');
        esValido = false;
    } else if (!esNombreUsuarioValido(nombreUsuario.value)) {
        mostrarError(nombreUsuarioError, 'El usuario solo puede contener letras y números.');
        esValido = false;
    } else if (esNombreUsuarioDuplicado(nombreUsuario.value)) {
        mostrarError(nombreUsuarioError, 'El nombre de usuario ya está en uso.');
        esValido = false;
    } else {
        ocultarError(nombreUsuarioError);
    }

    if (!contrasena.value.trim()) {
        mostrarError(contrasenaError, 'La contraseña es requerida.');
        esValido = false;
    } else if (!esContrasenaValida(contrasena.value)) {
        mostrarError(contrasenaError, 'La contraseña debe tener al menos 8 caracteres, 2 letras, 2 números y 2 caracteres especiales.');
        esValido = false;
    } else {
        ocultarError(contrasenaError);
    }

    if (!repetirContrasena.value.trim()) {
        mostrarError(repetirContrasenaError, 'Debe repetir la contraseña.');
        esValido = false;
    } else if (!coincidenContrasenas(contrasena.value, repetirContrasena.value)) {
        mostrarError(repetirContrasenaError, 'Las contraseñas no coinciden.');
        esValido = false;
    } else {
        ocultarError(repetirContrasenaError);
    }

    if (tarjetaNumero.value.trim() && !esTarjetaValida(tarjetaNumero.value)) {
        mostrarError(tarjetaNumeroError, 'El número de tarjeta no es válido.');
        esValido = false;
    } else {
        ocultarError(tarjetaNumeroError);
    }

    if (tarjetaClave.value.trim() && !esClaveValida(tarjetaClave.value)) {
        mostrarError(tarjetaClaveError, 'La clave debe ser de 3 dígitos distintos de cero.');
        esValido = false;
    } else {
        ocultarError(tarjetaClaveError);
    }

    confirmarBoton.disabled = !esValido;

    return esValido;
}


[nombre, apellido, email, nombreUsuario, contrasena, repetirContrasena, tarjetaNumero, tarjetaClave].forEach(campo => {
    campo.addEventListener('input', validarFormulario);
});

const guardarDatosEnLocalStorage = () => {
    const datosUsuario = {
        nombre: nombre.value,
        apellido: apellido.value,
        email: email.value,
        nombreUsuario: nombreUsuario.value,
        contrasena: contrasena.value,
        tarjetaNumero: tarjetaNumero.value,
        tarjetaClave: tarjetaClave.value
    };

    let usuarios = JSON.parse(localStorage.getItem('datosUsuario')) || [];
    usuarios.push(datosUsuario);
    localStorage.setItem('datosUsuario', JSON.stringify(usuarios));
};


confirmarBoton.addEventListener('click', function(event) {
    event.preventDefault(); 
    if (validarFormulario()) {
        guardarDatosEnLocalStorage();
        window.location.href = "./login.html";
    }
});

document.addEventListener('DOMContentLoaded', () => {
    confirmarBoton.disabled = true;
});

// Manejo del cambio de método de pago
cuponPagoRadio.addEventListener('change', function() {
    if (cuponPagoRadio.checked) {
        pagoFacilRadio.disabled = false;
        rapipagoRadio.disabled = false;
    } else {
        pagoFacilRadio.disabled = true;
        rapipagoRadio.disabled = true;
        pagoFacilRadio.checked = false;
        rapipagoRadio.checked = false;
    }
});

metodoPagoRadios.forEach(radio => {
    radio.addEventListener('change', function() {
        if (!cuponPagoRadio.checked) {
            pagoFacilRadio.disabled = true;
            rapipagoRadio.disabled = true;
            pagoFacilRadio.checked = false;
            rapipagoRadio.checked = false;
        }
    });
});