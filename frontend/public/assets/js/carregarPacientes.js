// frontend/public/assets/js/carregarPacientes.js
import { buscarPacientes } from "/app/getPatients.js";

// Variáveis globais
const statusMessage = document.getElementById("statusMessage");
const buscaNomeCpf = document.getElementById("buscaNomeCpf");
const filtroIdade = document.getElementById("filtroIdade");
const tabelaPacientes = document.getElementById("tabelaPacientes");

let pacientesAtuais = [];
let paginaAtual = 1;
const pacientesPorPagina = 6;

function calcularIdade(dataNascimento) {
    if (!dataNascimento) return null;
    const nascimento = new Date(dataNascimento);
    const hoje = new Date();
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
    }
    return idade;
}

async function carregarPacientes() {
    console.log("Iniciando carregamento de pacientes...");
    if (statusMessage) statusMessage.textContent = "Carregando pacientes...";
    try {
        pacientesAtuais = await buscarPacientes();
        console.log("Pacientes carregados:", pacientesAtuais);
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
    console.log("Renderizando tabela de pacientes...");
    if (!tabelaPacientes) {
        console.error("Elemento 'tabelaPacientes' não encontrado. Não é possível renderizar.");
        return;
    }

    const termoBusca = (buscaNomeCpf ? buscaNomeCpf.value : '').toLowerCase().trim();
    const faixaEtaria = (filtroIdade ? filtroIdade.value : 'todos').toLowerCase();

    tabelaPacientes.innerHTML = "";

    const filtrados = pacientesAtuais.filter(paciente => {
        const nomePaciente = (paciente.nome_completo || paciente.nome || '').toLowerCase();
        const nomeMatch = nomePaciente.includes(termoBusca);
        const cpfMatch = (paciente.cpf || '').toLowerCase().includes(termoBusca);

        // Filtro por faixa etária
        let idadeMatch = true;
        if (faixaEtaria !== 'todos') {
            const idade = calcularIdade(paciente.data_nascimento);
            if (idade !== null) {
                switch(faixaEtaria) {
                    case 'crianca': idadeMatch = idade >= 0 && idade <= 12; break;
                    case 'adolescente': idadeMatch = idade >= 13 && idade <= 19; break;
                    case 'adulto': idadeMatch = idade >= 20 && idade <= 59; break;
                    case 'idoso': idadeMatch = idade >= 60; break;
                    default: idadeMatch = true;
                }
            } else {
                idadeMatch = false;
            }
        }

        return (nomeMatch || cpfMatch) && idadeMatch;
    });

    const totalPaginas = Math.ceil(filtrados.length / pacientesPorPagina);
    if (paginaAtual > totalPaginas) paginaAtual = totalPaginas || 1;

    if (filtrados.length === 0) {
        tabelaPacientes.innerHTML = `<tr><td colspan="7" class="px-6 py-6 text-center text-gray-500 text-lg font-semibold bg-gray-50">Nenhum paciente encontrado.</td></tr>`;
        if (statusMessage) statusMessage.innerHTML = "";
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

        const pacienteCpfParaVisualizar = paciente.cpf ? `'${paciente.cpf}'` : `''`;

        tr.innerHTML = `
            <td class="px-6 py-3 whitespace-nowrap font-medium text-gray-900">${paciente.nome_completo || paciente.nome || ''}</td>
            <td class="px-6 py-3 whitespace-nowrap text-gray-700">${paciente.cpf || ''}</td>
            <td class="px-6 py-3 whitespace-nowrap text-gray-700">${paciente.telefone || 'N/A'}</td>
            <td class="px-6 py-3 whitespace-nowrap text-gray-700">${formatarData(paciente.data_nascimento)}</td>
            <td class="px-6 py-3 whitespace-nowrap text-gray-700">${paciente.cep || 'N/A'}</td>
            <td class="px-6 py-3 whitespace-nowrap text-gray-700">${paciente.cartao_sus || 'N/A'}</td>
            <td class="px-6 py-3 whitespace-nowrap text-center text-sm font-medium">
                <a href="#" onclick="visualizarPaciente(${pacienteCpfParaVisualizar})" class="text-blue-600 hover:text-blue-900 font-medium">Visualizar</a>
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
    nav.appendChild(document.createTextNode(`Página ${paginaAtual} de ${totalPaginas || 1}`));
    nav.appendChild(btnProxima);

    if (statusMessage) {
        statusMessage.innerHTML = "";
        statusMessage.appendChild(nav);
    }
}

// Event listeners
if (buscaNomeCpf) buscaNomeCpf.addEventListener("input", () => { paginaAtual = 1; renderizarTabelaPacientes(); });
if (filtroIdade) filtroIdade.addEventListener("change", () => { paginaAtual = 1; renderizarTabelaPacientes(); });

document.addEventListener('DOMContentLoaded', carregarPacientes);

window.carregarPacientes = carregarPacientes;