import { buscarUsuarios } from "/app/getUsers.js"; 

const statusMessage = document.getElementById("statusMessage");
const buscaNome = document.getElementById("buscaNome");
const filtroCargo = document.getElementById("filtroCargo");
const filtroStatus = document.getElementById("filtroStatus");
const tabela = document.getElementById("tabelaUsuarios");
const btnNovoUsuario = document.getElementById("btnNovoUsuario");

let usuariosAtuais = [];
let paginaAtual = 1;
const usuariosPorPagina = 6;

async function carregarUsuarios() {
    statusMessage.textContent = "Carregando usuários...";
    try {
        usuariosAtuais = await buscarUsuarios();
        statusMessage.textContent = "";
        paginaAtual = 1;
        renderTabela();
    } catch (error) {
        console.error("Erro ao carregar usuários:", error);
        statusMessage.textContent = `Erro ao carregar usuários: ${error.message}`;
        tabela.innerHTML = `<tr><td colspan="7" class="px-6 py-4 text-center text-red-500">Erro ao carregar usuários.</td></tr>`;
    }
}

function renderTabela() {
    const nomeBusca = buscaNome.value.toLowerCase().trim();
    const cargo = filtroCargo.value.toLowerCase();
    const status = filtroStatus.value;

    tabela.innerHTML = "";

    const filtrados = usuariosAtuais.filter(usuario => {
        const nomeMatch = (usuario.nome || '').toLowerCase().includes(nomeBusca);
        const cargoMatch = cargo === "todos" || (usuario.role && usuario.role.toLowerCase().includes(cargo));
        const statusMatch = status === "todos" || (usuario.status && usuario.status.toLowerCase() === status);
        return nomeMatch && cargoMatch && statusMatch;
    });

    const totalPaginas = Math.ceil(filtrados.length / usuariosPorPagina);
    if (paginaAtual > totalPaginas) paginaAtual = totalPaginas || 1;

    if (filtrados.length === 0) {
        tabela.innerHTML = `<tr><td colspan="7" class="px-6 py-6 text-center text-gray-500 text-lg font-semibold bg-gray-50">Nenhum usuário encontrado.</td></tr>`;
        statusMessage.innerHTML = "";
        return;
    }

    const inicio = (paginaAtual - 1) * usuariosPorPagina;
    const fim = inicio + usuariosPorPagina;
    const usuariosPagina = filtrados.slice(inicio, fim);

    usuariosPagina.forEach((usuario, index) => {
        const userStatus = (usuario.status || 'inativo').toLowerCase();
        const tr = document.createElement("tr");
        tr.className = `hover:bg-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`;

        tr.innerHTML = `
            <td class="px-6 py-3 whitespace-nowrap font-medium text-gray-900">${usuario.nome || ''}</td>
            <td class="px-6 py-3 whitespace-nowrap text-gray-700">${usuario.email || ''}</td>
            <td class="px-6 py-3 whitespace-nowrap text-gray-700">${usuario.cpf || ''}</td>
            <td class="px-6 py-3 whitespace-nowrap text-gray-700">${usuario.crm || ''}</td>
            <td class="px-6 py-3 whitespace-nowrap text-center">
                <span class="${userStatus === "ativo" ? "status-active" : "status-inactive"}">${userStatus === "ativo" ? "Ativo" : "Inativo"}</span>
            </td>
            <td class="px-6 py-3 whitespace-nowrap text-gray-700">${usuario.role || ''}</td>
            <td class="px-6 py-3 whitespace-nowrap text-center text-sm font-medium">
                <button onclick="editarUsuario('${usuario.id}')" class="text-indigo-600 hover:text-indigo-900 font-medium">Editar</button>
            </td>
        `;
        tabela.appendChild(tr);
    });

    // Paginação
    const nav = document.createElement("div");
    nav.className = "mt-4 flex justify-center gap-4";

    const btnAnterior = document.createElement("button");
    btnAnterior.textContent = "Anterior";
    btnAnterior.disabled = paginaAtual === 1;
    btnAnterior.className = "px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50";
    btnAnterior.onclick = () => {
        paginaAtual--;
        renderTabela();
    };

    const btnProxima = document.createElement("button");
    btnProxima.textContent = "Próxima";
    btnProxima.disabled = paginaAtual === totalPaginas;
    btnProxima.className = "px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50";
    btnProxima.onclick = () => {
        paginaAtual++;
        renderTabela();
    };

    nav.appendChild(btnAnterior);
    nav.appendChild(document.createTextNode(`Página ${paginaAtual} de ${totalPaginas}`));
    nav.appendChild(btnProxima);

    statusMessage.innerHTML = "";
    statusMessage.appendChild(nav);
}

function abrirNovoUsuario() {
    window.location.href = `/admin/usuario/criar`;
}

function editarUsuario(id) {
    window.location.href = `/admin/usuario/editar?id=${id}`;
}

buscaNome.addEventListener("input", () => { paginaAtual = 1; renderTabela(); });
filtroCargo.addEventListener("change", () => { paginaAtual = 1; renderTabela(); });
filtroStatus.addEventListener("change", () => { paginaAtual = 1; renderTabela(); });
btnNovoUsuario.addEventListener("click", abrirNovoUsuario);

document.addEventListener('DOMContentLoaded', carregarUsuarios);
