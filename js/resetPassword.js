document.addEventListener("DOMContentLoaded", function () {
    const emailInput = document.querySelector("input[type='email']");
    const usuarioInput = document.querySelector("input[type='text']");
    const confirmarButton = document.querySelector(".botones button[type='submit']");

    
    function validarCampos() {
        const emailValue = emailInput.value.trim();
        const usuarioValue = usuarioInput.value.trim();

        
        if (emailValue !== "" && usuarioValue !== "") {
            confirmarButton.removeAttribute("disabled");
        } else {
            confirmarButton.setAttribute("disabled", "disabled");
        }
    }

    
    emailInput.addEventListener("input", validarCampos);
    usuarioInput.addEventListener("input", validarCampos);

    
    validarCampos();
});