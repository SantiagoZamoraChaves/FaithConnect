// PÁGINA "CREAR PUBLICACIONES"

/* CONTADOR DE CARACTERES */

let mensaje = document.getElementById("mensaje");
let contador = document.getElementById("contador");

mensaje.addEventListener("input", function() {

    let cantidad = mensaje.value.length;

    contador.textContent = cantidad + " / 1500";

});

/* BOTÓN LIMPIAR */

// Seleccionar el formulario y el botón
let formulario = document.getElementById("formulario");
let limpiar = document.getElementById("limpiar");

// Detectar cuando se presiona Limpiar
limpiar.addEventListener("click", function() {

    // Limpiar todos los campos del formulario
    formulario.reset();

    // Reiniciar el contador de caracteres
    contador.textContent = "0 / 1500";

});

/* BOTÓN PUBLICAR */

formulario.addEventListener("submit", function(evento) {

    evento.preventDefault();

    // Obtener el título y el mensaje
    let titulo = document.getElementById("titulo").value.trim();
    let mensajeTexto = mensaje.value.trim();

    // Validar los campos
    if (titulo == "" || mensajeTexto == "") {
        alert("Debes escribir un título y un mensaje.");
        return;
    }

    // Confirmar la publicación
    alert("¡Publicación creada correctamente!");

    // Limpiar el formulario
    formulario.reset();

    // Reiniciar el contador
    contador.textContent = "0 / 1500";

});

