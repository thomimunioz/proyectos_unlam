

document.addEventListener("DOMContentLoaded", function () {
    const emailInput = document.querySelector("input[type='email']");
    const usuarioInput = document.querySelector("input[type='text']");
    const confirmarButton = document.querySelector(".botones button[type='submit']");
    const volverButton = document.querySelector(".botones button[type='button']");

    confirmarButton.addEventListener("click", function (event) {
        event.preventDefault();

        const emailValue = emailInput.value.trim();
        const usuarioValue = usuarioInput.value.trim();

        if (emailValue === "" || usuarioValue === "") {
            alert("Por favor, complete ambos campos.");
            return;
        }

        const datosUsuarios = JSON.parse(localStorage.getItem('datosUsuario')) || [];

        const usuarioEncontrado = datosUsuarios.find(user => user.email === emailValue);
        const usuarioCorrecto = usuarioEncontrado && usuarioEncontrado.nombreUsuario === usuarioValue;

        if (!usuarioEncontrado || !usuarioCorrecto) {
            alert("Datos incorrectos, revise los datos y vuelva a intentar.");
            return;
        }

        
        window.location.href = "../pages/login.html";
    });

    volverButton.addEventListener("click", function () {
        window.history.back();
    });
});
