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

    const crmGroup = crmInput.closest('.input-group') || crmInput.closest('div'); 
    
    const toggleCrmField = (roleValue) => {
        if (roleValue === "medico_ginecologista") { 
            crmGroup.style.display = 'block'; 
            crmInput.required = true; 
            crmInput.disabled = false; 
            crmInput.classList.remove('bg-red-100', 'cursor-not-allowed'); 
            crmInput.classList.add('bg-white'); 
        } else {
            crmGroup.style.display = 'none'; 
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
                
                crmInput.value = usuarioOriginal.crm || ''; 
                
                // Preenche a profissão
                roleSelect.value = usuarioOriginal.role;

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

        const payload = {
            id: usuarioOriginal.id, 
            nome: nomeInput.value,
            email: emailInput.value, 
            cpf: cpfParaEnviar, 
            role: roleSelect.value, 
            crm: roleSelect.value === "medico_ginecologista" ? (crmInput.value || null) : null, 
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