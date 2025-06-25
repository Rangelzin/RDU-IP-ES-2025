document.addEventListener('DOMContentLoaded', () => {
  document.getElementById("buscarPaciente").addEventListener("click", () => {
    window.location.href = "/main/usuario/search_patient";
  });

  document.getElementById("buscarExame").addEventListener("click", () => {
    window.location.href = "/main/usuario/search_exam";
  });

  document.getElementById("cadastrarFicha").addEventListener("click", () => {
    window.location.href = "/main/usuario/exame";
  });
});