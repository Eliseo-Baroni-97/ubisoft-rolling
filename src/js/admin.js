import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import '../css/style.css';
import Jueguito from "./juegoClass";
import $ from "jquery";
import "@fortawesome/fontawesome-free/js/all.js"


let listaJuegos = [];
leerDatos();
let JuegoExistente = false; //cuando sea falso tengo que agregar un nuevo producto y cuando sea verdadero tengo que modificar un producto

window.agregarProducto = function() {
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

        Swal.fire(
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
    let tbody = document.getElementById("tablaProducto");
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