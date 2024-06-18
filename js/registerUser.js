
const form = document.querySelector('.register-box');
const nombre = document.querySelector('input[placeholder="Ingrese nombre"]');
const apellido = document.querySelector('input[placeholder="Ingrese apellido"]');
const email = document.querySelector('input[placeholder="Ingrese email"]');
const nombreUsuario = document.querySelector('input[placeholder="Ingrese usuario"]');
const contrasena = document.querySelector('input[placeholder="Ingrese contraseña"]');
const repetirContrasena = document.querySelector('input[placeholder="Repetir contraseña"]');
const tarjetaNumero = document.querySelector('input[placeholder="Número de la tarjeta"]');
const tarjetaClave = document.querySelector('input[placeholder="XXX"]');
const confirmarBoton = document.querySelector('button.confirmar');
const cancelarBoton = document.querySelector('button.cancelar');


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


function validarFormulario() {
    const camposLlenos =
        nombre.value.trim() !== '' &&
        apellido.value.trim() !== '' &&
        email.value.trim() !== '' &&
        nombreUsuario.value.trim() !== '' &&
        contrasena.value.trim() !== '' &&
        repetirContrasena.value.trim() !== '' &&
        tarjetaNumero.value.trim() !== '' &&
        tarjetaClave.value.trim() !== '';

    const camposValidos =
        camposLlenos &&
        soloLetras(nombre.value) &&
        soloLetras(apellido.value) &&
        esEmailValido(email.value) &&
        esNombreUsuarioValido(nombreUsuario.value) &&
        esContrasenaValida(contrasena.value) &&
        coincidenContrasenas(contrasena.value, repetirContrasena.value) &&
        esTarjetaValida(tarjetaNumero.value) &&
        esClaveValida(tarjetaClave.value);

    confirmarBoton.disabled = !camposValidos;
}


[nombre, apellido, email, nombreUsuario, contrasena, repetirContrasena, tarjetaNumero, tarjetaClave].forEach(input => {
    input.addEventListener('input', validarFormulario);
});


confirmarBoton.addEventListener('click', (e) => {
    e.preventDefault();
    if (confirmarBoton.disabled) {
        alert('Por favor, complete todos los campos correctamente.');
    } else {
        window.location.href = 'login.html';
    }
});

cancelarBoton.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = 'login.html';
});


validarFormulario();