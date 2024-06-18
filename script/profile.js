
document.addEventListener("DOMContentLoaded", () => {


    const iconElements = document.querySelectorAll(".seleccion img");
    const profileImage = document.querySelector(".fotoPerfil .grande img");

    iconElements.forEach(icon => {
        icon.addEventListener("click", () => {
            profileImage.src = icon.src;
        });
    });

   
    const tarjetaCheck = document.getElementById("tarjeta");
    const tarjetaInput = document.querySelector(".inputDos input");
    const cvcInput = document.querySelector(".inputTres input");
    const fechaInput = document.querySelector(".inputCuatro input");
    const submitButton = document.querySelector(".botones button");

    const cuponCheck = document.getElementById("cuponPago");
    const pagoFacilCheck = document.getElementById("pagoFacil");
    const rapipagoCheck = document.getElementById("rapipago");

    const transferenciaBancaria = document.getElementById("transferenciaBancaria");



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
});
});


pagoFacilCheck.addEventListener('change', () => {
if (pagoFacilCheck.checked) {
    rapipagoCheck.checked = false;
}
});

rapipagoCheck.addEventListener('change', () => {
if (rapipagoCheck.checked) {
    pagoFacilCheck.checked = false;
}
});
    
    submitButton.addEventListener("click", (event) => {
        event.preventDefault();


        if(tarjetaCheck.checked){
            let isValid = true;
        if (tarjetaInput.value.length !== 16) {
            isValid = false;
            alert("El número de tarjeta debe tener 16 dígitos.");
        }
        
        if (cvcInput.value.length !== 3) {
            isValid = false;
            alert("El CVC debe tener 3 dígitos.");
        }
        
        if (!fechaInput.value) {
            isValid = false;
            alert("Debe ingresar una fecha de vencimiento.");
        }
        
        if (isValid) {
            alert("Método de pago validado correctamente.");
        } 

        } else {
            if(cuponPago.checked){
                if(pagoFacilCheck.checked && !rapipagoCheck.checked){
                    alert("Método de pago validado correctamente.");
                } else {
                    if(!pagoFacilCheck.checked && rapipagoCheck.checked){
                        alert("Método de pago validado correctamente.");
                    } else {
                        alert("La opción no es válida.");
                    }
                }

            }
        } if (transferenciaBancaria.checked){ 
            alert("Método de pago validado correctamente.");
        }
        
        
    });

    
    const usernameInput = document.querySelector(".infoPerfil input[type='text']");
    usernameInput.addEventListener("change", () => {
        console.log(`Nuevo nombre de usuario: ${usernameInput.value}`);
    });

   

});