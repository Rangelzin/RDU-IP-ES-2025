import { buscarPacientes } from "/app/getPatients.js";

const statusMessage = document.getElementById("statusMessage");
const buscaNomeCpf = document.getElementById("buscaNomeCpf");
const filtroStatusSaude = document.getElementById("filtroStatusSaude");
const tabelaPacientes = document.getElementById("tabelaPacientes");
const btnNovoPaciente = document.getElementById("btnNovoPaciente");

let pacientesAtuais = [];
let paginaAtual = 1;
const pacientesPorPagina = 6;

async function carregarPacientes() {
    if (statusMessage) statusMessage.textContent = "Carregando pacientes...";
    try {
        pacientesAtuais = await buscarPacientes();
        if (statusMessage) statusMessage.textContent = "";
        paginaAtual = 1;
        renderizarTabelaPacientes();
    } catch (error) {
        console.error("Erro ao carregar pacientes:", error);
        if (statusMessage) statusMessage.textContent = `Erro ao carregar pacientes: ${error.message}`;
        if (tabelaPacientes) tabelaPacientes.innerHTML = `<tr><td colspan="7" class="px-6 py-4 text-center text-red-500">Erro ao carregar pacientes.</td></tr>`;
    }
}

function renderizarTabelaPacientes() {
    if (!tabelaPacientes) return;

    const termoBusca = (buscaNomeCpf ? buscaNomeCpf.value : '').toLowerCase().trim();
    const statusSaude = (filtroStatusSaude ? filtroStatusSaude.value : 'todos').toLowerCase();

    tabelaPacientes.innerHTML = "";

    const filtrados = pacientesAtuais.filter(paciente => {
        const nomeMatch = (paciente.nome_completo || '').toLowerCase().includes(termoBusca);
        const cpfMatch = (paciente.cpf || '').toLowerCase().includes(termoBusca);
        const statusMatch = statusSaude === "todos" || (paciente.statusSaude && paciente.statusSaude.toLowerCase() === statusSaude);
        return (nomeMatch || cpfMatch) && statusMatch;
    });

    const totalPaginas = Math.ceil(filtrados.length / pacientesPorPagina);
    if (paginaAtual > totalPaginas) paginaAtual = totalPaginas || 1;

    if (filtrados.length === 0) {
        tabelaPacientes.innerHTML = `<tr><td colspan="7" class="px-6 py-6 text-center text-gray-500 text-lg font-semibold bg-gray-50">Nenhum paciente encontrado.</td></tr>`;
        statusMessage.innerHTML = "";
        return;
    }

    const inicio = (paginaAtual - 1) * pacientesPorPagina;
    const fim = inicio + pacientesPorPagina;
    const pacientesPagina = filtrados.slice(inicio, fim);

    const formatarData = (dataString) => {
        if (!dataString) return 'N/A';
        const data = new Date(dataString);
        if (isNaN(data)) return 'Data Inválida';
        return data.toLocaleDateString("pt-BR");
    };

    pacientesPagina.forEach((paciente, index) => {
        const tr = document.createElement("tr");
        tr.className = `hover:bg-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`;
        tr.innerHTML = `
            <td class="px-6 py-3 whitespace-nowrap font-medium text-gray-900">${paciente.nome_completo || ''}</td>
            <td class="px-6 py-3 whitespace-nowrap text-gray-700">${paciente.cpf || ''}</td>
            <td class="px-6 py-3 whitespace-nowrap text-gray-700">${paciente.telefone || 'N/A'}</td>
            <td class="px-6 py-3 whitespace-nowrap text-gray-700">${formatarData(paciente.data_nascimento)}</td>
            <td class="px-6 py-3 whitespace-nowrap text-gray-700">${paciente.cep || 'N/A'}</td>
            <td class="px-6 py-3 whitespace-nowrap text-gray-700">${paciente.cartao_sus || 'N/A'}</td>
            <td class="px-6 py-3 whitespace-nowrap text-center text-sm font-medium">
                <a href="#" onclick="visualizarPaciente('${paciente.id}')" class="text-blue-600 hover:text-blue-900 mr-4">Visualizar</a>
                <a href="#" onclick="editarPaciente('${paciente.id}')" class="text-indigo-600 hover:text-indigo-900 mr-4">Editar</a>
                <a href="#" onclick="excluirPaciente('${paciente.id}')" class="text-red-600 hover:text-red-900">Excluir</a>
            </td>
        `;
        tabelaPacientes.appendChild(tr);
    });

    const nav = document.createElement("div");
    nav.className = "mt-4 flex justify-center gap-4";

    const btnAnterior = document.createElement("button");
    btnAnterior.textContent = "Anterior";
    btnAnterior.disabled = paginaAtual === 1;
    btnAnterior.className = "px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50";
    btnAnterior.onclick = () => {
        paginaAtual--;
        renderizarTabelaPacientes();
    };

    const btnProxima = document.createElement("button");
    btnProxima.textContent = "Próxima";
    btnProxima.disabled = paginaAtual === totalPaginas;
    btnProxima.className = "px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50";
    btnProxima.onclick = () => {
        paginaAtual++;
        renderizarTabelaPacientes();
    };

    nav.appendChild(btnAnterior);
    nav.appendChild(document.createTextNode(`Página ${paginaAtual} de ${totalPaginas}`));
    nav.appendChild(btnProxima);

    statusMessage.innerHTML = "";
    statusMessage.appendChild(nav);
}

window.abrirNovoPaciente = () => window.location.href = `/admin/paciente/criar`;
window.visualizarPaciente = id => window.location.href = `/admin/paciente/visualizar?id=${id}`;
window.editarPaciente = id => window.location.href = `/admin/paciente/editar?id=${id}`;
window.excluirPaciente = id => {
    if (confirm(`Tem certeza que deseja excluir o paciente com ID ${id}?`)) {
        alert(`Paciente ${id} excluído (simulado).`);
        carregarPacientes();
    }
};

if (buscaNomeCpf) buscaNomeCpf.addEventListener("input", () => { paginaAtual = 1; renderizarTabelaPacientes(); });
if (filtroStatusSaude) filtroStatusSaude.addEventListener("change", () => { paginaAtual = 1; renderizarTabelaPacientes(); });
if (btnNovoPaciente) btnNovoPaciente.addEventListener("click", abrirNovoPaciente);
document.addEventListener('DOMContentLoaded', carregarPacientes);
