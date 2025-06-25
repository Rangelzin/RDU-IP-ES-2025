// frontend/public/assets/js/visualizarPaciente.js

import { buscarPacientePeloCPF } from "/app/getPatientCPF.js";
import { buscarExames } from "/app/getExam.js";

// Função para formatar CPF
function formatarCPF(cpf) {
    if (!cpf) return 'N/A';
    cpf = String(cpf).replace(/\D/g, ''); // Remove tudo que não é dígito
    if (cpf.length === 11) {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return cpf;
}

// Função para formatar Telefone
function formatarTelefone(tel) {
    if (!tel) return 'N/A';
    tel = String(tel).replace(/\D/g, ''); // Remove tudo que não é dígito
    if (tel.length === 11) { // (XX) XXXXX-XXXX
        return tel.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (tel.length === 10) { // (XX) XXXX-XXXX
        return tel.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return tel;
}

// Função para formatar Data
function formatarData(dataString) {
    if (!dataString) return 'N/A';
    const data = new Date(dataString);
    if (isNaN(data)) return 'Data Inválida';
    return data.toLocaleDateString("pt-BR");
}

export async function exibirDetalhesPacienteNaModal(patientId) {
    const statusMessageModal = document.getElementById('statusMessageModal');
    const noExamsMessageModal = document.getElementById('noExamsMessageModal');
    const examesContainerModal = document.getElementById('examesContainerModal');
   

    if (statusMessageModal) statusMessageModal.textContent = "";
    if (noExamsMessageModal) noExamsMessageModal.classList.add('hidden');
    if (examesContainerModal) examesContainerModal.innerHTML = "";

    console.log("Visualizar Paciente (Modal): ID recebido:", patientId);

    if (!patientId) {
        if (statusMessageModal) statusMessageModal.textContent = "ID do paciente não fornecido.";
        return;
    }

    try {
        if (statusMessageModal) statusMessageModal.textContent = "Carregando dados do paciente...";

        const paciente = await buscarPacientePeloCPF(patientId);
        console.log("Dados do paciente carregados:", paciente);

        if (paciente) {
            document.getElementById('nomeCompletoModal').textContent = paciente.nome_completo || 'N/A';
            document.getElementById('cpfModal').textContent = formatarCPF(paciente.cpf);
            document.getElementById('telefoneModal').textContent = formatarTelefone(paciente.telefone) || 'N/A';
            document.getElementById('dataNascimentoModal').textContent = formatarData(paciente.data_nascimento);
            document.getElementById('statusSaudeModal').textContent = paciente.statusSaude || 'N/A';
            document.getElementById('cartaoSusModal').textContent = paciente.cartao_sus || 'N/A';
            
            document.getElementById('cepModal').textContent = paciente.cep || 'N/A';
            document.getElementById('ruaModal').textContent = paciente.logradouro || 'N/A';
            document.getElementById('numeroModal').textContent = paciente.numero || 'N/A';
            document.getElementById('complementoModal').textContent = paciente.complemento || 'N/A';
            document.getElementById('bairroModal').textContent = paciente.bairro || 'N/A';
            document.getElementById('cidadeModal').textContent = paciente.municipio || 'N/A';
            document.getElementById('estadoModal').textContent = paciente.uf || 'N/A';

            const todosExames = await buscarExames();
             const examesPaciente = todosExames.filter(exame => exame.cpf === patientId);
            console.log("Exames do paciente:", examesPaciente);

            if (examesPaciente.length === 0) {
                if (noExamsMessageModal) noExamsMessageModal.classList.remove('hidden');
            } else {
                examesPaciente.forEach(exame => {
                    const exameDiv = document.createElement('div');
                    exameDiv.className = 'bg-gray-50 p-4 rounded-md shadow-sm';
                    exameDiv.innerHTML = `
                        <h3 class="text-lg font-semibold text-gray-800">Protocolo: ${exame.protocolo || 'N/A'}</h3>
                        <p class="text-gray-700"><strong>Tipo:</strong> ${exame.tipo || 'N/A'}</p>
                        <p class="text-gray-700"><strong>Data do Exame:</strong> ${formatarData(exame.data_exame)}</p>
                        <p class="text-gray-700"><strong>Resultado:</strong> ${exame.resultado || 'N/A'}</p>
                        <p class="text-gray-700"><strong>Observações:</strong> ${exame.observacoes || 'N/A'}</p>
                    `;
                    examesContainerModal.appendChild(exameDiv);
                });
            }
        } else {
            if (statusMessageModal) statusMessageModal.textContent = "Paciente não encontrado.";
        }

        if (statusMessageModal) statusMessageModal.textContent = "";

    } catch (error) {
        console.error("Erro ao carregar detalhes do paciente ou exames:", error);
        if (statusMessageModal) statusMessageModal.textContent = `Erro ao carregar dados: ${error.message}`;
    }
}