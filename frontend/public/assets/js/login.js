import {loginRequisicao} from "../../../API/authAPI.js"

console.log("Script login.js carregado!");

document.addEventListener('DOMContentLoaded', function () {
    console.log("Script login.js carregado!2");

    const form = document.querySelector("#login-form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        realizarLogin();
    });
});

function realizarLogin() {
    console.log("FUNÇÂO 1")
    const cpf = document.querySelector("#login").value
    const senha = document.querySelector("#senha").value

    loginRequisicao(cpf, senha)
}