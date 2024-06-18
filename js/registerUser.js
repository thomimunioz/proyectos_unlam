document.addEventListener('DOMContentLoaded', function() {
    
    const nombreInput = document.querySelector('input[type="text"][placeholder="  Ingrese nombre"]');
    const apellidoInput = document.querySelector('input[type="text"][placeholder="  Ingrese apellido"]');
    const emailInput = document.querySelector('input[type="email"][placeholder="  Ingrese email"]');
    const usuarioInput = document.querySelector('input[type="text"][placeholder="  Ingrese usuario"]');
    const contraseniaInput = document.querySelector('input[type="password"][placeholder="  Ingrese contraseña"]');
    const repetirContraseniaInput = document.querySelector('input[type="password"][placeholder="  Repetir contraseña"]');
    const tarjetaInput = document.querySelector('input[placeholder="Número de la tarjeta"]');
    const grupoRadioMetodoPago = document.querySelectorAll('input[type="checkbox"]');
    const confirmarButton = document.querySelector('.confirmar');
    const cancelarButton = document.querySelector('.cancelar');

    
    const letrasRegex = /^[a-zA-ZÁÉÍÓÚáéíóúñÑüÜ\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usuarioRegex = /^[a-zA-Z0-9]+$/;
    const contraseniaRegex = /^(?=.*[a-zA-Z].*[a-zA-Z])(?=.*\d.*\d)(?=.*[!@#$%^&*()_+}{":;'?/>.<,]).{8,}$/;
    const tarjetaRegex = /^[1-9]\d{15,18}$/;

    
    function validarCampos() {
        
        if (!nombreInput.value.match(letrasRegex)) {
            nombreInput.setCustomValidity('Ingrese solo letras');
        } else {
            nombreInput.setCustomValidity('');
        }

        
        if (!apellidoInput.value.match(letrasRegex)) {
            apellidoInput.setCustomValidity('Ingrese solo letras');
        } else {
            apellidoInput.setCustomValidity('');
        }

        
        if (!emailInput.value.match(emailRegex)) {
            emailInput.setCustomValidity('Ingrese un email válido');
        } else {
            emailInput.setCustomValidity('');
        }

        
        if (!usuarioInput.value.match(usuarioRegex)) {
            usuarioInput.setCustomValidity('Ingrese solo letras y números');
        } else {
            usuarioInput.setCustomValidity('');
        }

        validarContrasenias();

        if (tarjetaInput.value === '000') {
            tarjetaInput.setCustomValidity('Número de tarjeta inválido');
        } else if (tarjetaInput.value !== '' && !tarjetaInput.value.match(tarjetaRegex)) {
            tarjetaInput.setCustomValidity('Número de tarjeta inválido');
        } else {
            tarjetaInput.setCustomValidity('');
        }

        
        let metodoPagoSeleccionado = false;
        grupoRadioMetodoPago.forEach(function(input) {
            if (input.checked) {
                metodoPagoSeleccionado = true;
            }
        });

        
        confirmarButton.disabled = !(nombreInput.checkValidity() &&
                                     apellidoInput.checkValidity() &&
                                     emailInput.checkValidity() &&
                                     usuarioInput.checkValidity() &&
                                     contraseniaInput.checkValidity() &&
                                     repetirContraseniaInput.checkValidity() &&
                                     tarjetaInput.checkValidity() &&
                                     metodoPagoSeleccionado);
    }

    // Validación de contraseñas
    function validarContrasenias() {
        const contrasenia = contraseniaInput.value;
        const repetirContrasenia = repetirContraseniaInput.value;

        if (contrasenia !== repetirContrasenia) {
            repetirContraseniaInput.setCustomValidity('Las contraseñas no coinciden');
        } else if (!contrasenia.match(contraseniaRegex)) {
            repetirContraseniaInput.setCustomValidity('La contraseña no cumple con los requisitos mínimos');
        } else {
            repetirContraseniaInput.setCustomValidity('');
        }
    }

    
    nombreInput.addEventListener('input', validarCampos);
    apellidoInput.addEventListener('input', validarCampos);
    emailInput.addEventListener('input', validarCampos);
    usuarioInput.addEventListener('input', validarCampos);
    contraseniaInput.addEventListener('input', validarContrasenias);
    repetirContraseniaInput.addEventListener('input', validarContrasenias);
    tarjetaInput.addEventListener('input', validarCampos);

    
    grupoRadioMetodoPago.forEach(function(input) {
        input.addEventListener('change', validarCampos);
    });

    
    confirmarButton.addEventListener('click', function(event) {
        event.preventDefault(); 

        
        window.location.href = 'login.html'; 
    });

    
    cancelarButton.addEventListener('click', function(event) {
        event.preventDefault(); 

        
        window.location.href = 'login.html'; 
    });

    
    validarCampos();
});