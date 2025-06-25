// frontend/public/assets/js/editarUsuarios.js

import { getUserByCpf, updateUser } from "/app/putUsers.js"; 
import { buscarUsuarios } from "/app/getUsers.js";
import "/src/utils/auth.js"; 
import "/src/utils/fetchPagesToken.js"; 
import "/environment/environment.js"; 

function formatarCPF(cpf) {
    if (!cpf) return '';
    cpf = String(cpf).replace(/\D/g, ''); 
    if (cpf.length <= 11) { 
        return cpf.replace(/(\d{3})(\d)/, '$1.$2')
                  .replace(/(\d{3})(\d)/, '$1.$2')
                  .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }
    return cpf; 
}

function desformatarCPF(cpfFormatado) {
    if (!cpfFormatado) return '';
    return String(cpfFormatado).replace(/\D/g, ''); 
}

document.addEventListener("DOMContentLoaded", async () => {
    const form = document.getElementById("formEditarUsuario");
    const nomeInput = document.getElementById("nome");
    const emailInput = document.getElementById("email");
    const cpfInput = document.getElementById("cpf");
    const roleSelect = document.getElementById("role");
    const crmInput = document.getElementById("crm");
    const novaSenhaInput = document.getElementById("novaSenha");
    const confirmarSenhaInput = document.getElementById("confirmarSenha");

    // Mapeamento de profissão para o dígito (para enviar no payload)
    const professionToDigit = {
      "paciente": "0",
      "admin": "1",
      "medico": "2",
      "enfermeiro": "3",
      "outros": "4"
    };

    // Mapeamento de dígito para profissão (para preencher o select ao carregar)
    const digitToProfession = {
      "0": "paciente",
      "1": "admin",
      "2": "medico",
      "3": "enfermeiro",
      "4": "outros"
    };

    // Define a ordem das permissões (para construir/desconstruir a string binária)
    const permissionOrder = [
        "consultar_exames",
        "gerenciar_pacientes",
        "realizar_coleta_exame",
        "realizar_analise_clinica",
        "laudar_resultados"
    ];

    // Campo CRM precisa ser ajustado com base na sua nova estrutura (não tem mais um 'crmGroup' específico)
    // O CRM está dentro de uma div padrão, então podemos manipular diretamente o input e seu pai para esconder/mostrar
    const crmInputParent = crmInput.parentElement;
    
    const toggleCrmField = (roleValue) => {
        if (roleValue === "medico") { // Atualizado para "medico"
            crmInputParent.style.display = 'block'; // Mostra o campo CRM
            crmInput.required = true; 
            crmInput.disabled = false; 
            crmInput.classList.remove('bg-red-100', 'cursor-not-allowed'); 
            crmInput.classList.add('bg-white'); 
        } else {
            crmInputParent.style.display = 'none'; // Esconde o campo CRM
            crmInput.required = false; 
            crmInput.value = ''; 
            crmInput.disabled = true; 
            crmInput.classList.add('bg-red-100', 'cursor-not-allowed'); 
            crmInput.classList.remove('bg-white');
        }
    };

    roleSelect.addEventListener('change', () => toggleCrmField(roleSelect.value));

    let usuarioOriginalCpf; 
    let usuarioOriginal; 

    async function preencherFormulario() {
        const urlParams = new URLSearchParams(window.location.search);
        usuarioOriginalCpf = urlParams.get('cpf'); 

        if (usuarioOriginalCpf) {
            try {
                const todosUsuarios = await buscarUsuarios(); 
                usuarioOriginal = todosUsuarios.find(u => u.cpf === desformatarCPF(usuarioOriginalCpf));

                if (!usuarioOriginal) {
                    throw new Error("Usuário não encontrado na lista completa.");
                }

                nomeInput.value = usuarioOriginal.nome;
                emailInput.value = usuarioOriginal.email; 
                cpfInput.value = formatarCPF(usuarioOriginal.cpf); 
                
                // Extrair e preencher profissão e permissões do campo 'role' (6 caracteres)
                if (usuarioOriginal.role && usuarioOriginal.role.length === 6) {
                    const professionDigit = usuarioOriginal.role[0];
                    const permissionsBinary = usuarioOriginal.role.substring(1);

                    // Preenche o select de profissão
                    roleSelect.value = digitToProfession[professionDigit] || '';

                    // Preenche os checkboxes de permissão
                    permissionOrder.forEach((permissionName, index) => {
                        const checkbox = document.getElementById(`perm_${permissionName}`);
                        if (checkbox) {
                            checkbox.checked = permissionsBinary[index] === '1';
                        }
                    });
                } else {
                    // Lidar com 'role' inválido ou ausente, talvez definir padrões
                    roleSelect.value = ''; // Nenhuma profissão selecionada
                    permissionOrder.forEach(permissionName => { // Desmarca todas as permissões
                        const checkbox = document.getElementById(`perm_${permissionName}`);
                        if (checkbox) checkbox.checked = false;
                    });
                }

                crmInput.value = usuarioOriginal.crm || ''; 
                
                // Chama a função para ajustar o CRM com base na role carregada
                toggleCrmField(roleSelect.value);

            } catch (error) {
                console.error("Erro ao carregar dados do usuário:", error);
                alert("Erro ao carregar dados do usuário: " + error.message);
                window.location.href = "/admin/usuario"; 
            }
        } else {
            alert("CPF do usuário não especificado na URL.");
            window.location.href = "/admin/usuario"; 
        }
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); 

        const cpfParaEnviar = desformatarCPF(cpfInput.value); 

        if (novaSenhaInput.value && novaSenhaInput.value !== confirmarSenhaInput.value) {
            alert("As senhas não coincidem!");
            return; 
        }

        // Construir a string 'role' de 6 caracteres para o payload
        const selectedProfession = roleSelect.value;
        const professionDigit = professionToDigit[selectedProfession] || "0";

        let permissionBinaryString = '';
        permissionOrder.forEach(permissionName => {
            const checkbox = document.getElementById(`perm_${permissionName}`);
            permissionBinaryString += (checkbox && checkbox.checked) ? '1' : '0';
        });

        const finalRoleString = professionDigit + permissionBinaryString;

        const payload = {
            id: usuarioOriginal.id, 
            nome: nomeInput.value,
            email: emailInput.value, 
            cpf: cpfParaEnviar, 
            role: finalRoleString, // 'role' agora é a string de 6 caracteres
            crm: roleSelect.value === "medico" ? (crmInput.value || null) : null, // Atualizado para "medico"
            ubs_id: usuarioOriginal.ubs_id 
        };

        if (novaSenhaInput.value) {
            payload.senha = novaSenhaInput.value;
        }

        try {
            // Remove undefineds do payload antes de enviar
            const finalPayload = {};
            for (const key in payload) {
                if (payload[key] !== undefined) { 
                    finalPayload[key] = payload[key];
                }
            }

            await updateUser(usuarioOriginalCpf, finalPayload); 

            alert("Usuário atualizado com sucesso!");
            window.location.href = "/admin/usuario"; 
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
            alert("Erro ao atualizar usuário: " + error.message);
        }
    });

    preencherFormulario();
});