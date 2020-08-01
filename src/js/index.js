import "@fortawesome/fontawesome-free/js/all.min.js"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import '../css/style.css';

leerDatos();

function leerDatos() {
    if (localStorage.length > 0) {
        let arregloLS = JSON.parse(localStorage.getItem("funkoKey"));

        let cardAgregar = document.getElementById("cardAgregar");

        for (let i in arregloLS) {
            let codigoHTML = `<div class="card card-hover-shadow">
                    <a href=""><img src="/dist/img/productos/${arregloLS[i].imagen}"
                            class="card-img-top" alt="..."></a>
                    <div class="card-body">
                        <h5 class="card-title">${arregloLS[i].nombre} </h5>
                        <p class="card-text"> ${arregloLS[i].descripcion} </div>
                </div>`;

            cardAgregar.innerHTML += codigoHTML;
        }
    }
}