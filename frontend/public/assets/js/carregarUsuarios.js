// frontend/src/pages/usuarios/carregarUsuarios.js

import { buscarUsuarios } from "/app/getUsers.js";

const statusMessage = document.getElementById("statusMessage");
const buscaNome = document.getElementById("buscaNome");
const filtroCargo = document.getElementById("filtroCargo");
const filtroStatus = document.getElementById("filtroStatus");
const tabela = document.getElementById("tabelaUsuarios");
const btnNovoUsuario = document.getElementById("btnNovoUsuario");

let usuariosAtuais = [];

async function carregarUsuarios() {
  statusMessage.textContent = "Carregando usuários...";
  try {
    usuariosAtuais = await buscarUsuarios();
    statusMessage.textContent = "";
    renderTabela();
  } catch (error) {
    console.error("Erro ao carregar usuários:", error);
    statusMessage.textContent = `Erro ao carregar usuários: ${error.message}`;
    tabela.innerHTML = `<tr><td colspan="5" class="px-6 py-4 text-center text-red-500">Erro ao carregar usuários.</td></tr>`;
  }
}

function editarUsuario(usuarioId) {
  window.location.href = `/admin/usuario/criar?id=${usuarioId}`;
}

function abrirNovoUsuario() {
  window.location.href = `/admin/usuario/criar`;
}

function renderTabela() {
  const nomeBusca = buscaNome.value.toLowerCase().trim();
  const cargo = filtroCargo.value.toLowerCase();
  const status = filtroStatus.value;

  tabela.innerHTML = "";

  const filtrados = usuariosAtuais.filter(usuario => {
    const nomeMatch = usuario.nome.toLowerCase().includes(nomeBusca);
    const cargoMatch = cargo === "todos" || usuario.cargo.toLowerCase().includes(cargo);
    const statusMatch = status === "todos" || usuario.status === status;
    return nomeMatch && cargoMatch && statusMatch;
  });

  if (filtrados.length === 0) {
    tabela.innerHTML = `
      <tr>
        <td colspan="5" class="px-6 py-6 text-center text-gray-500 text-lg font-semibold bg-gray-50">Nenhum usuário encontrado.</td>
      </tr>
    `;
    return;
  }

  filtrados.forEach((usuario, index) => {
    usuario.status = "ativo"
    const tr = document.createElement("tr");
    tr.className = `hover:bg-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`;
    tr.innerHTML = `
      <td class="px-6 py-3 whitespace-nowrap font-medium text-gray-900">${usuario.nome}</td>
      <td class="px-6 py-3 whitespace-nowrap text-gray-700">${usuario.cargo}</td>
      <td class="px-6 py-3 text-gray-700 break-words max-w-xs">${usuario.email}</td>
      <td class="px-6 py-3 whitespace-nowrap">
        <span class="${usuario.status === "ativo" ? "text-green-600 font-semibold bg-green-100 px-2 py-0.5 rounded-full text-xs" : "text-red-600 font-semibold bg-red-100 px-2 py-0.5 rounded-full text-xs"}">
          ${usuario.status === "ativo" ? "Ativo" : "Inativo"}
        </span>
      </td>
      <td class="px-6 py-3 whitespace-nowrap text-right text-sm font-medium">
        <button onclick="editarUsuario('${usuario.id}')"
                class="text-indigo-600 hover:text-indigo-900 font-medium">
          Editar
        </button>
      </td>
    `;
    tabela.appendChild(tr);
  });
}

buscaNome.addEventListener("input", renderTabela);
filtroCargo.addEventListener("change", renderTabela);
filtroStatus.addEventListener("change", renderTabela);
btnNovoUsuario.addEventListener("click", abrirNovoUsuario);

carregarUsuarios();
