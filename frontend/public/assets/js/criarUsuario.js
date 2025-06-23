import { cadastrarUsuario } from "/app/creatUser.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formUsuario");
  const crmInput = document.getElementById("crm");
  const roleSelect = document.getElementById("role");

  roleSelect.addEventListener("change", () => {
    console.log("DEBUG: Evento 'change' disparado para Profissão. Valor selecionado:", roleSelect.value);

    if (roleSelect.value === "medico_ginecologista") {
      crmInput.disabled = false;
      // Remove bg-red-100 e adiciona bg-transparent para usar o fundo da div pai
      crmInput.classList.remove("bg-red-100", "cursor-not-allowed");
      crmInput.classList.add("cursor-text", "bg-transparent"); 
      crmInput.placeholder = "Digite o CRM (apenas para médicos)";

      console.log("DEBUG: 'medico_ginecologista' selecionado.");
      console.log("DEBUG: crmInput.disabled após alteração:", crmInput.disabled);
      console.log("DEBUG: crmInput.className após alteração:", crmInput.className);
    } else {
      crmInput.disabled = true;
      crmInput.value = "";
      // Remove bg-transparent e adiciona bg-red-100 quando desabilitado
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

    const payload = {
      nome: document.getElementById("nome").value,
      cpf,
      email: document.getElementById("email").value,
      role: roleSelect.value,
      crm: roleSelect.value === "medico_ginecologista" ? crmInput.value : null,
      senha: document.getElementById("senha").value,
      permissoes: Array.from(document.querySelectorAll('input[name="permissoes"]:checked')).map(el => el.value),
      ubs_id: 1,
      status: true
    };


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