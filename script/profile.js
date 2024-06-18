
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
    const tarjetaNumero = tarjetaInput.value;
    const CVCNumero = cvcInput.value;
    
    const submitButton = document.querySelector(".botones button");




    const cuponCheck = document.getElementById("cuponPago");
    const pagoFacilCheck = document.getElementById("pagoFacil");
    const rapipagoCheck = document.getElementById("rapipago");

    const transferenciaBancaria = document.getElementById("transferenciaBancaria");


function cargarEstado() {
tarjetaCheck.checked = JSON.parse(localStorage.getItem("tarjetaCheck")) || false;
tarjetaInput.value = localStorage.getItem("tarjetaInput") || '';
cvcInput.value = localStorage.getItem("cvcInput") || '';
fechaInput.value = localStorage.getItem("fechaInput") || '';
cuponCheck.checked = JSON.parse(localStorage.getItem("cuponCheck")) || false;
pagoFacilCheck.checked = JSON.parse(localStorage.getItem("pagoFacilCheck")) || false;
rapipagoCheck.checked = JSON.parse(localStorage.getItem("rapipagoCheck")) || false;
transferenciaBancaria.checked = JSON.parse(localStorage.getItem("transferenciaBancaria")) || false;
}

function guardarEstado() {
localStorage.setItem("tarjetaCheck", JSON.stringify(tarjetaCheck.checked));
localStorage.setItem("tarjetaInput", tarjetaInput.value);
localStorage.setItem("cvcInput", cvcInput.value);
localStorage.setItem("fechaInput", fechaInput.value);
localStorage.setItem("cuponCheck", JSON.stringify(cuponCheck.checked));
localStorage.setItem("pagoFacilCheck", JSON.stringify(pagoFacilCheck.checked));
localStorage.setItem("rapipagoCheck", JSON.stringify(rapipagoCheck.checked));
localStorage.setItem("transferenciaBancaria", JSON.stringify(transferenciaBancaria.checked));
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
        if (tarjetaInput.value.length < 16 || tarjetaInput.value.length > 19) {
            isValid = false;
            alert("El número de tarjeta debe tener entre 16 y 19 dígitos.");
        }
    
        let cvcero = 0;

        for(let i = 0; i < CVCNumero.length; i++){
            if(CVCNumero[i] === 0){
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
        
        
        let suma = 0;
        
        for (let i = 0; i< tarjetaNumero.length - 1; i++){
            suma += parseInt(tarjetaNumero[i], 10);
        }

        const ultimoDigito = parseInt(tarjetaNumero[tarjetaNumero.length-1],10);

        if((suma%2 === 0 && ultimoDigito % 2 !== 0) || (suma%2 !== 0 && ultimoDigito %2 === 0)){
            alert("Método de pago validado correctamente.");
        } else {
            alert("La tarjeta es inválida.");
                isValid = false;
        }


        if (isValid) {
            alert("Método de pago validado correctamente.");
        } 

        } 
            
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
        
        if (transferenciaBancaria.checked){ 
            alert("Método de pago validado correctamente.");
        }
        
        
    });

    
    const usernameInput = document.querySelector(".infoPerfil input[type='text']");
    usernameInput.addEventListener("change", () => {
        console.log(`Nuevo nombre de usuario: ${usernameInput.value}`);
    });

    window.onload = cargarEstado;

});
