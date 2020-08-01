import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "../css/style.css";
import Jueguito from "./juegoClass";
import $ from "jquery";
import "@fortawesome/fontawesome-free/js/all.js";
import swal from "sweetalert2";

let listaDeJuegos = [];
leerDatos();
let productoExistente = false; //cuando sea falso tengo que agregar un nuevo producto y cuando sea verdadero tengo que modificar un producto;

window.agregarJuego = function () {
  event.preventDefault();
  //traigo los elementos del documento...
  let codigo = document.getElementById("codigo"),
    nombre = document.getElementById("nombre"),
    categoria = document.getElementById("categoria"),
    descripcion = document.getElementById("descripcion"),
    imagen = document.getElementById("imagen"),
    video = document.getElementById('video');
  //validamos el formulario...
  if (
    revisarCodigo(codigo) &&
    requerido(nombre) &&
    requerido(categoria) &&
    requerido(descripcion) &&
    requerido(imagen) &&
    requerido(video)
  ) {
    let producto = new Jueguito(
      codigo.value,
      nombre.value,
      categoria.value,
      descripcion.value,
      imagen.value,
      video.value
    );
    listaDeJuegos.push(producto);
    localStorage.setItem("juegosKey", JSON.stringify(listaDeJuegos));
    leerDatos();
    limpiarForm();

    let ventanaModal = document.getElementById("modalJuego");
    $(ventanaModal).modal("hide");

    swal.fire(
      "Producto agregado",
      "Tu producto fue agregado correctamente",
      "success"
    );
  } else {
    alert("Faltan completar datos");
  }
};

window.revisarCodigo = function (checkCodigo) {
  if (checkCodigo.value != "" && !isNaN(checkCodigo.value)) {
    console.log(checkCodigo);
    checkCodigo.className = "form-control is-valid";
    return true;
  } else {
    checkCodigo.className = "form-control is-invalid";
    return false;
  }
};

window.requerido = function (checkNombre) {
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
    if (listaDeJuegos.length == 0) {
      listaDeJuegos = arregloLS;
    }
    //Borrar filas
    borrarFila();
    //Dibujar las filas de la tabla
    dibujarFilas(arregloLS);
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

function dibujarFilas(arregloLS) {
  let tbody = document.getElementById("tablaJuego");
  let codigoHTML = "";
  for (let i in arregloLS) {
    codigoHTML = `<div>
    <tr>
        <td>${arregloLS[i].codigo}</td>
        <td>${arregloLS[i].nombre}</td>
        <td>${arregloLS[i].categoria}</td>
        <td>${arregloLS[i].descripcion}</td>
        <td>${arregloLS[i].imagen}</td>
        <td>${arregloLS[i].video}</td>
        <td class="d-flex justify-content-center d-flex align-items-center">
            <button class="btn btn-outline-info"  onclick="modificarJuego(${arregloLS[i].codigo})"><i class="fas fa-pencil-alt "></i></button>
            <button class="btn btn-outline-danger" onclick="eliminarJuego(${arregloLS[i].codigo})"><i class="fas fa-trash-alt "></i></button>
            <button class="btn btn-outline-success" onclick="destacarJuego(${arregloLS[i].codigo}"><i class="fas fa-star "></i></button>
        </td>
    </tr>
</div>`;
    tbody.innerHTML += codigoHTML;
  };
};

window.limpiarForm = function () {
  let formProducto = document.getElementById("formJuego");
  formProducto.reset();
  productoExistente = false;
};

window.eliminarJuego = function (codigo) {
    //Buscar en el arreglo el objeto con el codigo recibido por parametro
    //Opcion 1
    //   for (let i in listaProductos) {
    //    if (listaProductos[i].codigo == codigo) {
    //encontrar el producto buscado
    //   }
    //  }
    //Eliminar el ojeto del arreglo
    //Opcion 2
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
          let juegosFiltrados = listaDeJuegos.filter(function (Jueguito) {
            return Jueguito.codigo != codigo;
          });
          //Alctualizar el local storage
          localStorage.setItem("juegosKey", JSON.stringify(juegosFiltrados));
          //Dibujar tabla
          leerDatos();
          listaDeJuegos = juegosFiltrados;
          swalWithBootstrapButtons.fire(
            "Producto eliminado",
            "Tu producto fue eliminado correctamente",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelado",
            "Tu producto no fue eliminado",
            "info"
          );
        }
      });
  };

window.modificarJuego = function (codigo) {
    //Buscar el producto con el codigo recibido por parametro
    let objetoEncontrado = listaDeJuegos.find(function (Jueguito) {
      return Jueguito.codigo == codigo;
    });
    console.log(objetoEncontrado);
    //Asignar al formulario del modal los valores del objeto encontrado
    document.getElementById("codigo").value = objetoEncontrado.codigo;
    document.getElementById("nombre").value = objetoEncontrado.nombre;
    document.getElementById("categoria").value = objetoEncontrado.categoria;
    document.getElementById("descripcion").value = objetoEncontrado.descripcion;
    document.getElementById("imagen").value = objetoEncontrado.imagen;
    document.getElementById('video').value = objetoEncontrado.value;
    //Mostrar la ventana modal
    let ventanaModal = document.getElementById("modalJuego");
    $(ventanaModal).modal("show");
    productoExistente = true;
  };
  
  window.agregarModificar = function (e) {
    e.preventDefault();
  
    if (productoExistente == false) {
      agregarJuego();
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
      imagen = document.getElementById("imagen").value,
      video = document.getElementById('video').value;
    //buscar dentro del arreglo el producto que estoy modificando y actualizar los valores
    for (let i in listaDeJuegos) {
      if (listaDeJuegos[i].codigo == codigo) {
        listaDeJuegos[i].nombre = nombre;
        listaDeJuegos[i].descripcion = descripcion;
        listaDeJuegos[i].categoria = categoria;
        listaDeJuegos[i].imagen = imagen;
        listaDeJuegos[i].video = video;
      }
    }
    //actualizar el local storage
    localStorage.setItem("juegosKey", JSON.stringify(listaDeJuegos));
    //volver a dibujar la tabla
    leerDatos();
    limpiarForm();
  
    let ventanaModal = document.getElementById("modalJuego");
    $(ventanaModal).modal("hide");
  
    swal.fire(
      "Producto modificado",
      "Tu producto fue modificado correctamente",
      "info"
    );
  }

  window.destacarJuego = function(juegoSeleccionado){
    //llevar al objeto seleccionado al frente del arreglo...
    
  };