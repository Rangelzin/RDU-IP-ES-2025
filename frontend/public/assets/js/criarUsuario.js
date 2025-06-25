import { cadastrarUsuario } from "/app/creatUser.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formUsuario");
  const crmInput = document.getElementById("crm");
  const roleSelect = document.getElementById("role");

  // Mapeamento de profissão para o dígito inicial da string 'role' conforme o JSON fornecido
  const professionToDigit = {
    "paciente": "0",
    "admin": "1",
    "medico": "2",
    "enfermeiro": "3",
    "outros": "4"
  };

  // Define a ordem das permissões conforme o JSON fornecido
  const permissionOrder = [
    "consultar_exames",
    "gerenciar_pacientes",
    "realizar_coleta_exame",
    "realizar_analise_clinica",
    "laudar_resultados"
  ];

  roleSelect.addEventListener("change", () => {
    console.log("DEBUG: Evento 'change' disparado para Profissão. Valor selecionado:", roleSelect.value);

    // O campo CRM é habilitado apenas para a profissão 'medico'
    if (roleSelect.value === "medico") {
      crmInput.disabled = false;
      crmInput.classList.remove("bg-red-100", "cursor-not-allowed");
      crmInput.classList.add("cursor-text", "bg-transparent");
      crmInput.placeholder = "Digite o CRM (apenas para médicos)";

      console.log("DEBUG: 'medico' selecionado.");
      console.log("DEBUG: crmInput.disabled após alteração:", crmInput.disabled);
      console.log("DEBUG: crmInput.className após alteração:", crmInput.className);
    } else {
      crmInput.disabled = true;
      crmInput.value = "";
      crmInput.classList.remove("cursor-text", "bg-transparent");
      crmInput.classList.add("bg-red-100", "cursor-not-allowed");
      crmInput.placeholder = "Campo disponível apenas para médicos";

      console.log("DEBUG: Outra profissão selecionada.");
      console.log("DEBUG: crmInput.disabled após alteração:", crmInput.disabled);
      console.log("DEBUG: crmInput.className após alteração:", crmInput.className);
    }
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const cpf = document.getElementById("cpf").value.replace(/\D/g, "");

    if (!/^\d{11}$/.test(cpf) || /^(\d)\1{10}$/.test(cpf)) {
      alert("CPF inválido.");
      return;
    }

    // Pega o dígito da profissão
    const selectedProfession = roleSelect.value;
    const professionDigit = professionToDigit[selectedProfession] || "0"; // Padrão '0' se não mapeado

    // Pega todos os checkboxes de permissão no formulário
    const permissionCheckboxes = Array.from(document.querySelectorAll('input[name="permissoes"]'));

    // Cria a string binária de permissões (5 caracteres)
    let permissionBinaryString = '';
    permissionOrder.forEach(permissionValue => {
      const checkbox = permissionCheckboxes.find(cb => cb.value === permissionValue);
      permissionBinaryString += (checkbox && checkbox.checked) ? '1' : '0';
    });

    // Combina o dígito da profissão com a string de permissões para formar o 'role' final
    const finalRoleString = professionDigit + permissionBinaryString;

    const payload = {
      nome: document.getElementById("nome").value,
      cpf,
      email: document.getElementById("email").value,
      role: finalRoleString, // O campo 'role' agora é a string de 6 caracteres
      crm: roleSelect.value === "medico" ? crmInput.value : null, // CRM condicional à profissão 'medico'
      senha: document.getElementById("senha").value,
      ubs_id: 1,
      status: true
    };

    // Remove campos nulos/vazios do payload
    for (const key in payload) {
      if (payload[key] === null || payload[key] === undefined || payload[key] === '') {
        delete payload[key];
      }
    }

    try {
      const resultado = await cadastrarUsuario(payload);
      alert("Usuário criado com sucesso!");
      form.reset();
      // Redefine o estado do campo CRM para desabilitado e vermelho após o envio
      crmInput.disabled = true;
      crmInput.classList.remove("cursor-text", "bg-transparent");
      crmInput.classList.add("bg-red-100", "cursor-not-allowed");
      crmInput.placeholder = "Campo disponível apenas para médicos";
    } catch (error) {
      alert("Erro ao criar usuário: " + error.message);
    }
  });
});