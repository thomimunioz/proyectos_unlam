
const iconElements = document.querySelectorAll(".seleccion img");
const profileImage = document.querySelector(".fotoPerfil .grande img");

iconElements.forEach(icon => {
    icon.addEventListener("click", () => {
        profileImage.src = icon.src;
    });
});


const tarjetaInput = document.querySelector(".inputDos input");
const cvcInput = document.querySelector(".inputTres input");
const fechaInput = document.querySelector(".inputCuatro input");
const submitButton = document.querySelector(".botones button");

submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    
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
});


const usernameInput = document.querySelector(".infoPerfil input[type='text']");
usernameInput.addEventListener("change", () => {
    console.log(`Nuevo nombre de usuario: ${usernameInput.value}`);
});


const idiomaItems = document.querySelectorAll(".seleccionarIdioma li");
idiomaItems.forEach(item => {
    item.addEventListener("click", () => {
        idiomaItems.forEach(li => li.classList.remove("selected"));
        item.classList.add("selected");
        alert(`Idioma seleccionado: ${item.textContent}`);
    });
});
