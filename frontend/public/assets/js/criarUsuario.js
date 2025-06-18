import { cadastrarUsuario } from "/app/creatUser.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formUsuario");
  const crmInput = document.getElementById("crm");
  const roleSelect = document.getElementById("role");

  roleSelect.addEventListener("change", () => {
    if (roleSelect.value === "medico") {
      crmInput.disabled = false;
      crmInput.classList.remove("bg-red-100", "cursor-not-allowed");
      crmInput.classList.add("cursor-text", "bg-[#D9D9D9]");
      crmInput.placeholder = "Digite o CRM (apenas para médicos)";
    } else {
      crmInput.disabled = true;
      crmInput.value = "";
      crmInput.classList.remove("cursor-text", "bg-[#D9D9D9]");
      crmInput.classList.add("bg-red-100", "cursor-not-allowed");
      crmInput.placeholder = "Campo disponível apenas para médicos";
    }
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const cpf = document.getElementById("cpf").value.replace(/[^\d]/g, "");
    if (!/^\d{11}$/.test(cpf) || /^(\d)\1{10}$/.test(cpf)) {
      alert("CPF inválido.");
      return;
    }

    const payload = {
    nome: document.getElementById("nome").value,
    cpf,
    email: document.getElementById("email").value,
    role: roleSelect.value,
    crm: roleSelect.value === "medico" ? crmInput.value : null,
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
      crmInput.disabled = true;
      crmInput.classList.remove("cursor-text", "bg-[#D9D9D9]");
      crmInput.classList.add("bg-red-100", "cursor-not-allowed");
      crmInput.placeholder = "Campo disponível apenas para médicos";
    } catch (error) {
      alert("Erro ao criar usuário: " + error.message);
    }
  });
});
