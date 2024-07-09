
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

        const datosUsuarios = JSON.parse(localStorage.getItem('datosUsuario'));

        if (!datosUsuarios) {
            alert("No hay usuarios registrados. Por favor, regístrese primero.");
            return;
        }

        const usuarioEncontrado = datosUsuarios.find(user => user.nombreUsuario === usuario);
        const contraseñaCorrecta = usuarioEncontrado && usuarioEncontrado.contrasena === contraseña;

        if (!usuarioEncontrado) {
            alert("Nombre de usuario incorrecto. Por favor, intente de nuevo.");
            return;
        }

        if (!contraseñaCorrecta) {
            alert("Contraseña incorrecta. Por favor, intente de nuevo.");
            return;
        }

        localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioEncontrado));
        window.location.href = "../pages/home.html";
    });
});