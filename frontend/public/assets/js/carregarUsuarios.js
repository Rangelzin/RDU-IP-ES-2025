// frontend/public/assets/js/carregarUsuarios.js
import { buscarUsuarios } from "/app/getUsers.js";
import { deleteUser } from "/app/putUsers.js"; 

const statusMessage = document.getElementById("statusMessage");
const buscaNome = document.getElementById("buscaNome");
const filtroCargo = document.getElementById("filtroCargo");
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
        // Ajustado colspan para 6, pois agora temos 6 colunas visíveis
        tabela.innerHTML = `<tr><td colspan="6" class="px-6 py-4 text-center text-red-500">Erro ao carregar usuários.</td></tr>`;
    }
}

function formatarCargoParaExibicao(cargo) {
    if (!cargo) return '';
    switch (cargo.toLowerCase()) {
        case 'medico_ginecologista':
            return 'Médico(a) Ginecologista';
        case 'enfermeira': 
            return 'Enfermeiro(a)';
        case 'agente_comunitario':
            return 'Agente Comunitário';
        case 'outros':
            return 'Outros';
        default:
            return cargo.charAt(0).toUpperCase() + cargo.slice(1).replace(/_/g, ' ');
    }
}

function renderTabela() {
    const nomeBusca = buscaNome.value.toLowerCase().trim();
    const cargo = filtroCargo.value.toLowerCase();
    // REMOVIDO: const status = filtroStatus.value;

    tabela.innerHTML = "";

    const filtrados = usuariosAtuais.filter(usuario => {
        const nomeMatch = (usuario.nome || '').toLowerCase().includes(nomeBusca);
        const cargoMatch = cargo === "todos" || (usuario.role && usuario.role.toLowerCase() === cargo);

        return nomeMatch && cargoMatch; 
    });

    const totalPaginas = Math.ceil(filtrados.length / usuariosPorPagina);
    if (paginaAtual > totalPaginas) paginaAtual = totalPaginas || 1;

    if (filtrados.length === 0) {
        // Ajustado colspan para 6
        tabela.innerHTML = `<tr><td colspan="6" class="px-6 py-6 text-center text-gray-500 text-lg font-semibold bg-gray-50">Nenhum usuário encontrado.</td></tr>`;
        statusMessage.innerHTML = "";
        return;
    }

    const inicio = (paginaAtual - 1) * usuariosPorPagina;
    const fim = inicio + usuariosPorPagina;
    const usuariosPagina = filtrados.slice(inicio, fim);

    usuariosPagina.forEach((usuario, index) => {
        // REMOVIDO: const userStatus = (usuario.status || 'inativo').toLowerCase();
        const tr = document.createElement("tr");
        tr.className = `hover:bg-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`;

        tr.innerHTML = `
            <td class="px-6 py-3 whitespace-nowrap font-medium text-gray-900">${usuario.nome || ''}</td>
            <td class="px-6 py-3 whitespace-nowrap text-gray-700">${usuario.email || ''}</td>
            <td class="px-6 py-3 whitespace-nowrap text-gray-700">${usuario.cpf || ''}</td>
            <td class="px-6 py-3 whitespace-nowrap text-gray-700">${usuario.crm || ''}</td>
            <td class="px-6 py-3 whitespace-nowrap text-gray-700">${formatarCargoParaExibicao(usuario.role)}</td>
            <td class="px-6 py-3 whitespace-nowrap text-center text-sm font-medium">
                <button onclick="editarUsuario('${usuario.cpf}')" class="text-indigo-600 hover:text-indigo-900 font-medium">Editar</button>
                <button onclick="deletarUsuarioFront('${usuario.id}')" class="text-red-600 hover:text-red-900 ml-3">Deletar</button>
            </td>
        `;
        tabela.appendChild(tr);
    });

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

window.abrirNovoUsuario = function() {
    window.location.href = `/admin/usuario/criar`; 
};

window.editarUsuario = function(cpf) { 
    window.location.href = `/admin/usuario/editar?cpf=${cpf}`; 
};
window.deletarUsuarioFront = async function(id) { 
    if (confirm("Tem certeza que deseja deletar este usuário?")) {
        try {
            await deleteUser(id);
            alert("Usuário deletado com sucesso!");
            carregarUsuarios();
        } catch (error) {
            console.error("Erro ao deletar usuário:", error);
            alert("Erro ao deletar usuário: " + error.message);
        }
    }
};

buscaNome.addEventListener("input", () => { paginaAtual = 1; renderTabela(); });
filtroCargo.addEventListener("change", () => { paginaAtual = 1; renderTabela(); });
btnNovoUsuario.addEventListener("click", window.abrirNovoUsuario);

document.addEventListener('DOMContentLoaded', carregarUsuarios);