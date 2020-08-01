import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import '../css/style.css';
import Jueguito from "./juegoClass";
import $ from "jquery";
import "@fortawesome/fontawesome-free/js/all.js"
import swal from "sweetalert2";


let listaJuegos = [];
leerDatos();
let juegoExistente = false; //cuando sea falso tengo que agregar un nuevo producto y cuando sea verdadero tengo que modificar un producto

window.agregarJuego = function() {
    console.log("en la funcion");
    let codigo = document.getElementById("codigo"),
        nombre = document.getElementById("nombre"),
        categoria = document.getElementById("categoria"),
        descripcion = document.getElementById("descripcion"),
        estadoPublicado = document.getElementById("estadoPublicado"),
        imagen = document.getElementById("imagen");
    //Validar formulario
    if (
        revisarCodigo(codigo) &&
        requerido(nombre) &&
        requerido(categoria) &&
        requerido(descripcion) &&
        requerido(estadoPublicado) &&
        requerido(imagen)
    ) {
        let producto = new Jueguito(
            codigo.value,
            nombre.value,
            categoria.value,
            descripcion.value,
            estadoPublicado.value,
            imagen.value
        );
        listaJuegos.push(producto);
        localStorage.setItem("juegosKey", JSON.stringify(listaJuegos));
        leerDatos();
        limpiarForm();

        let ventanaModal = document.getElementById("modalJuego");
        $(ventanaModal).modal("show");

        swal.fire(
            "Producto Juego",
            "Tu juego se adhirió",
            "success"
        );
    } else {
        alert("Faltan completar datos");
    }
};

window.revisarCodigo = function(checkCodigo) {
    if (checkCodigo.value != "" && !isNaN(checkCodigo.value)) {
        console.log(checkCodigo);
        checkCodigo.className = "form-control is-valid";
        return true;
    } else {
        checkCodigo.className = "form-control is-invalid";
        return false;
    }
};

window.requerido = function(checkNombre) {
    if (checkNombre.value != "") {
        checkNombre.className = "form-control is-valid";
        return true;
    } else {
        checkNombre.className = "form-control is-invalid";
        return false;
    }
};

function leerDatos() {
    if (localStorage.length > 0) {
        let arregloLS = JSON.parse(localStorage.getItem("juegosKey"));
        if (listaJuegos.length == 0) {
            listaJuegos = arregloLS;
        }
        //Borrar filas
        borrarFila();
        //Dibujar las filas de la tabla
        dibujarFilas(arregloLS);
    }
}

function dibujarFilas(arregloLS) {
    let tbody = document.getElementById("tablaJuego");
    let codigoHTML = "";

    for (let i in arregloLS) {
        codigoHTML = `<tr>
                          <th scope="row">${arregloLS[i].codigo}</th>
                          <td>${arregloLS[i].nombre}</td>
                          <td>${arregloLS[i].categoria}</td>
                          <td>${arregloLS[i].descripcion}</td>
                          <td>${arregloLS[i].estadoPublicado}</td>
                          <td>${arregloLS[i].imagen}</td>
                          <td>
                          <button class="btn btn-outline-info "><i class="fas fa-pencil-alt "onclick="modificarJuego(${arregloLS[i].codigo})"></i></button>
                              <button class="btn btn-outline-info" onclick="modificarJuego(${arregloLS[i].codigo})"><i class="fas fa-edit"></i></button>
                              <button class="btn btn-outline-danger"onclick="eliminarJuego(${arregloLS[i].codigo})"><i class="fas fa-trash-alt "></i></button>
                              <button class="btn btn-outline-success" onclick="destacarJuego(${arregloLS[i].codigo})"><i class="fas fa-star "></i></button>
                              </td>
                      </tr>`;
        tbody.innerHTML += codigoHTML;
    }
}

function borrarFila() {
    let tbody = document.getElementById("tablaJuego");

    if (tbody.children.length > 0) {
        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild);
        }
    }
}

window.limpiarForm = function() {
    let formJuego = document.getElementById("formJuego");
    formJuego.reset();
    juegoExistente = false;
};
window.eliminarJuego = function(codigo) {
    const swalWithBootstrapButtons = swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger mx-3",
        },
        buttonsStyling: false,
    });

    swalWithBootstrapButtons
        .fire({
            title: "Estas seguro de eliminar?",
            text: "Si se elimina no se podran recuperar los datos!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si",
            cancelButtonText: "Cancelar",
            reverseButtons: true,
        })
        // .then(function (result) { }) esto es lo mismo que la linea de abajo
        .then((result) => {
            if (result.value) {
                let juegosFiltrados = listaJuegos.filter(function(juego) {
                    return juego.codigo != codigo;
                });
                //Alctualizar el local storage
                localStorage.setItem("juegosKey", JSON.stringify(juegosFiltrados));
                //Dibujar tabla
                leerDatos();
                listaJuegos = juegosFiltrados;
                swalWithBootstrapButtons.fire(
                    "Juego eliminado",
                    "Tu juego fue eliminado correctamente prrooo",
                    "success"
                );
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    "Cancelado",
                    "Tu Juego no fue eliminado",
                    "info"
                );
            }
        });
};

window.modificarJuego = function(codigo) {
    //Buscar el producto con el codigo recibido por parametro
    let juegoEncontrado = listaJuegos.find(function(juego) {
        return juego.codigo == codigo;
    });
    console.log(juegoEncontrado);
    //Asignar al formulario del modal los valores del objeto encontrado
    document.getElementById("codigo").value = objetoEncontrado.codigo;
    document.getElementById("nombre").value = objetoEncontrado.nombre;
    document.getElementById("categoria").value = objetoEncontrado.categoria;
    document.getElementById("descripcion").value = objetoEncontrado.descripcion;
    document.getElementById("estadoPublicado").value = objetoEncontrado.estadoPublicado;
    document.getElementById("imagen").value = objetoEncontrado.imagen;
    //Mostrar la ventana modal
    let ventanaModal = document.getElementById("modalJuego");
    $(ventanaModal).modal("show");
    juegoExistente = true;
};

window.agregarModificar = function(e) {
    console.log("ingresoo submit")

    e.preventDefault();

    if (juegoExistente == false) {
        agregarjuego();
    } else {
        guardarJuegoModificado();
    }
};

function guardarJuegoModificado() {
    //tomar todos los valores del formulario y lo almaceno en variables
    let codigo = document.getElementById("codigo").value,
        nombre = document.getElementById("nombre").value,
        descripcion = document.getElementById("descripcion").value,
        categoria = document.getElementById("categoria").value,
        estadoPublicado = document.getElementById("estadoPublicado").value,
        imagen = document.getElementById("imagen").value;
    //buscar dentro del arreglo el producto que estoy modificando y actualizar los valores
    for (let i in listaProductos) {
        if (listaProductos[i].codigo == codigo) {
            listaJuegos[i].nombre = nombre;
            listaJuegos[i].descripcion = descripcion;
            listaJuegos[i].categoria = categoria;
            listaJuegos[i].estadoPublicado = estadoPublicado;
            listaJuegos[i].imagen = imagen;
        }
    }
    //actualizar el local storage
    localStorage.setItem("juegosKey", JSON.stringify(listaJuegos));
    //volver a dibujar la tabla
    leerDatos();
    limpiarForm();

    let ventanaModal = document.getElementById("modalJuego");
    $(ventanaModal).modal("hide");

    swal.fire(
        "Juego modificado",
        "Tu Juego fue modificado correctamente",
        "info"
    );
}