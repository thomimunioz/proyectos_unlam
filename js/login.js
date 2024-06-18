document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector(".Contenedor form");
    const loginBoton = document.querySelector(".boton");
    const usuarioInput = loginForm.querySelector("input[type='text']");
    const contraseñaInput = loginForm.querySelector("input[type='password']");

    loginBoton.addEventListener("click", function (event) {
        event.preventDefault(); 

        const usuario = usuarioInput.value.trim();
        const contraseña = contraseñaInput.value.trim();

        if (usuario === "" || contraseña === "") {
            alert("Por favor, complete ambos campos.");
            return;
        }

        
        localStorage.setItem("usuario", usuario);

        
        window.location.href = "../pages/home.html";  
    });
});