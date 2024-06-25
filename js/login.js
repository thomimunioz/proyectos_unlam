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

        
        const datosUsuario = JSON.parse(localStorage.getItem('datosUsuario'));

        if (!datosUsuario) {
            alert("No hay usuarios registrados. Por favor, regístrese primero.");
            return;
        }

        
        const usuarioRegistrado = datosUsuario.nombreUsuario === usuario && datosUsuario.contrasena === contraseña;

        if (!usuarioRegistrado) {
            alert("Usuario o contraseña incorrectos. Por favor, intente de nuevo.");
            return;
        }

        
        window.location.href = "../pages/home.html";
    });
});