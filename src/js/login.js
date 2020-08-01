import '@fortawesome/fontawesome-free/js/all.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import '../css/style.css';

window.requerido = function(checkNombre) {
    if (checkNombre.value != "") {
        checkNombre.className = "form-control is-valid";
        return true;
    } else {
        checkNombre.className = "form-control is-invalid";
        return false;
    }
};

window.validarGeneral = function(event) {
    event.preventDefault();
    if (requerido(document.getElementById("nombre")) &&
        revisarEmail(document.getElementById("email"))) {

        alert("Bienvenido prro")
    } else {
        alert("Ocurrio un error")
    };
}