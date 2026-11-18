/*PÁGINA PRINCIPAL*/

/* ME GUSTA */

// Seleccionar las publicaciones
let publicaciones = document.querySelectorAll(".post");

// Recorrer cada publicación
publicaciones.forEach(function(publicacion) {

    let corazon = publicacion.querySelector(".acciones img");
    let contador = publicacion.querySelector(".acciones strong");

    // Verificar que tenga botón de Me gusta
    if (corazon && contador) {

        let cantidad = 0;
        let meGusta = false;

        corazon.style.cursor = "pointer";

        // Al hacer clic en el corazón
        corazon.addEventListener("click", function() {

            if (meGusta == false) {
                cantidad++;
                meGusta = true;
            } else {
                cantidad--;
                meGusta = false;
            }

            contador.textContent = cantidad;

        });
    }
});

/* FILTRO POR CATEGORÍAS */

// Seleccionar el filtro
let filtro = document.getElementById("filtro-categoria");

// Detectar cuando cambia la categoría
filtro.addEventListener("change", function() {

    let categoria = filtro.value;

    // Recorrer las publicaciones
    publicaciones.forEach(function(publicacion) {

        let categoriaPost = publicacion.dataset.categoria;

        if (categoria == "todas" || categoria == categoriaPost) {
            publicacion.closest(".fila-post").style.display = "";
        } else {
            publicacion.closest(".fila-post").style.display = "none";
        }

    });

});

/* CREAR PUBLICACIONES */

// Arreglo para guardar publicaciones nuevas
let nuevasPublicaciones = [];

// Elementos del formulario
let formulario = document.getElementById("form-publicacion");
let mensaje = document.getElementById("mensaje");
let categoria = document.getElementById("categoria");
let contenedor = document.getElementById("nuevas-publicaciones");

// Crear una publicación
formulario.addEventListener("submit", function(evento) {

    evento.preventDefault();

    // Validar el contenido
    if (mensaje.value.trim() == "") {
        alert("Debes escribir una publicación.");
        return;
    }

    // Guardar la publicación en el arreglo
    let publicacion = {
        usuario: "Santiago Hijo de Zabedeo",
        contenido: mensaje.value.trim(),
        categoria: categoria.value,
        likes: 0
    };

    nuevasPublicaciones.push(publicacion);

    mostrarNuevasPublicaciones();

    formulario.reset();

    alert("¡Publicación creada correctamente!");
});

// Mostrar las publicaciones del arreglo
function mostrarNuevasPublicaciones() {

    contenedor.innerHTML = "";

    nuevasPublicaciones.forEach(function(publicacion) {

        let articulo = document.createElement("article");
        articulo.className = "post post-texto";
        articulo.dataset.categoria = publicacion.categoria;

        // Contenedor de información del usuario
        let datosUsuario = document.createElement("div");
        datosUsuario.className = "usuario";

        // Imagen de perfil
        let foto = document.createElement("img");
        foto.src = "activos/img/perfil.png";
        foto.alt = "Foto de perfil de Santiago";
        foto.className = "foto-perfil";

        // Nombre del usuario
        let usuario = document.createElement("h4");
        usuario.textContent = publicacion.usuario;

        // Unir foto y nombre
        datosUsuario.append(foto, usuario);
        let etiqueta = document.createElement("span");
        etiqueta.className = "etiqueta";
        etiqueta.textContent = publicacion.categoria;

        let texto = document.createElement("p");
        texto.textContent = publicacion.contenido;

        let acciones = document.createElement("div");
        acciones.className = "acciones";

        let corazon = document.createElement("img");
        corazon.src = "activos/img/Corazón.png";
        corazon.alt = "Me gusta";
        corazon.style.cursor = "pointer";

        let contador = document.createElement("strong");
        contador.textContent = publicacion.likes;

        let meGusta = false;

        corazon.addEventListener("click", function() {

            if (meGusta == false) {
                publicacion.likes++;
                meGusta = true;
            } else {
                publicacion.likes--;
                meGusta = false;
            }

            contador.textContent = publicacion.likes;

        });

        // Botón para eliminar la publicación
        let eliminar = document.createElement("button");
        eliminar.textContent = "Eliminar";
        eliminar.className = "boton-eliminar";

        eliminar.addEventListener("click", function() {

            let confirmar = confirm("¿Deseas eliminar esta publicación?");

            if (confirmar) {
                let posicion = nuevasPublicaciones.indexOf(publicacion);
                nuevasPublicaciones.splice(posicion, 1);
                mostrarNuevasPublicaciones();
            }

        });

        acciones.append(corazon, contador, eliminar);
        articulo.append(datosUsuario, etiqueta, texto, acciones);

        // Crear la fila de la publicación
        let fila = document.createElement("div");
        fila.className = "fila-post";

        // Colocar la publicación dentro de la fila
        fila.appendChild(articulo);

        // Mostrar la publicación en la página
        contenedor.appendChild(fila);

        
        
    });

}

/* CONTADOR DE PUBLICACIONES */

function contarPublicaciones() {

    let originales = document.querySelectorAll(".post").length;
    let nuevas = nuevasPublicaciones.length;

    let total = originales + nuevas;

    document.getElementById("contador-publicaciones").textContent =
        total;
}

contarPublicaciones();

/* BUSCADOR DE PUBLICACIONES */

let buscador = document.getElementById("buscar-publicaciones");

buscador.addEventListener("input", function() {

    let texto = buscador.value.toLowerCase();

    let todas = document.querySelectorAll(".fila-post");

    todas.forEach(function(fila) {

        let contenido = fila.textContent.toLowerCase();

        if (contenido.includes(texto)) {
            fila.style.display = "";
        } else {
            fila.style.display = "none";
        }

    });

});


/* ELIMINAR PUBLICACIONES ORIGINALES */

publicaciones.forEach(function(publicacion) {

    let acciones = publicacion.querySelector(".acciones");

    if (acciones) {

        let eliminar = document.createElement("button");

        eliminar.textContent = "Eliminar";
        eliminar.className = "boton-eliminar";

        acciones.appendChild(eliminar);

        eliminar.addEventListener("click", function() {

            let confirmar = confirm("¿Deseas eliminar esta publicación?");

            if (confirmar) {

                let fila = publicacion.closest(".fila-post");

                if (fila) {
                    fila.remove();
                }

                contarPublicaciones();
            }

        });

    }

});
