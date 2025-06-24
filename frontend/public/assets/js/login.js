import { loginRequisicao } from "/app/authAPI.js";

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector("#login-form");
    if (!form) {
        console.error("Formulário de login não encontrado!");
        return;
    }

    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        console.log("Formulário de login enviado. Chamando realizarLogin()...");
        try {
            await realizarLogin();
        } catch (error) {
            console.error("Erro pego no 'login.js':", error);
            alert("Falha no login: " + error.message);
        }
    });
});

async function realizarLogin() {
    const cpfInput = document.querySelector("#login");
    const senhaInput = document.querySelector("#senha");

    const cpf = cpfInput.value;
    const senha = senhaInput.value;

    if (!cpf || !senha) {
        alert("Por favor, preencha o CPF e a senha.");
        return;
    }
    
    console.log("Iniciando requisição de login...");
    await loginRequisicao(cpf, senha);
}