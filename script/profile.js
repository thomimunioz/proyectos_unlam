
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

    iconElements.forEach(icon => {
        icon.addEventListener("click", () => {
            profileImage.src = icon.src;
        });
    });



function cerrarSesion(){
    localstorage.removeItem("profileImage");
    localstorage.removeItem("tarjetaCheck");
    localstorage.removeItem("tarjetaInput");
    localstorage.removeItem("cvcInput");
    localstorage.removeItem("fechaInput");
    localstorage.removeItem("cuponCheck");
    localstorage.removeItem("pagoFacilCheck");
    localstorage.removeItem("rapipagoCheck");
    localstorage.removeItem("transferenciaBancaria");

}


function cargarEstado() {
profileImage.src = localStorage.getItem("profileImage") || '';
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
localStorage.setItem("profileImage", profileImage.src);
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
    
        const CVCNumero = cvcInput.value;
        let arrayCVC = Array.from(CVCNumero);
        let cvcero = 0;


        for(let i = 0; i < arrayCVC.length; i++){
            if(arrayCVC[i] === "0"){
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
        
        for (let i = 0; i< arrayTarjeta.length - 1; i++){
            suma += parseInt(arrayTarjeta[i], 10);
        }

        const ultimoDigito = parseInt(arrayTarjeta[arrayTarjeta.length-1],10);

        if((suma%2 === 0 && ultimoDigito % 2 !== 0) || (suma%2 !== 0 && ultimoDigito %2 === 0)){
           
        } else {
            alert("La tarjeta es inválida.");
                isValid = false;
        }


        if (isValid) {
            alert("Los cambios se han guardado correctamente.");
        } 

        } 
            
        if(cuponPago.checked){
                if(pagoFacilCheck.checked && !rapipagoCheck.checked){
                    alert("Los cambios se han guardado correctamente.");
                } else {
                    if(!pagoFacilCheck.checked && rapipagoCheck.checked){
                        alert("Los cambios se han guardado correctamente.");
                    } else {
                        alert("La opción no es válida.");
                    }
                }

            }
        
        if (transferenciaBancaria.checked){ 
            alert("Los cambios se han guardado correctamente.");
        }
        
        
    });

    
    const usernameInput = document.querySelector(".infoPerfil input[type='text']");
    usernameInput.addEventListener("change", () => {
        console.log(`Nuevo nombre de usuario: ${usernameInput.value}`);
    });



    submitButton.addEventListener("click", (event) => {
        event.preventDefault();
        guardarEstado();
    });


    cerrarSesionButton.addEventListener("click", () => {
        cerrarSesion();
        
        
    });

    window.onload = cargarEstado;

});
