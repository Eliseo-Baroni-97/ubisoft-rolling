import "@fortawesome/fontawesome-free/js/all.js"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import '../css/style.css';

window.addEventListener("load", () => {
    Generate_Account("admin", "4545rr", 1);

    let button_login = document.getElementById("button-login");

    button_login.addEventListener("click", () => {

        console.log("login");
    });


});


function Generate_Account(usuario, password, acces) {



    if (localStorage.length >= 0 && localStorage.getItem("save") == false && acces <= 5) {
        localStorage.setItem(`user${localStorage.length+1}`, usuario);
        localStorage.setItem(`pass${localStorage.length+1}`, password);
        localStorage.setItem(`acces${localStorage.length+1}`, acces);

    } else {
        localStorage.setItem("save", true);
    }


    console.log(localStorage);
}