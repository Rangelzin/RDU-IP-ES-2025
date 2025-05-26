document.getElementById("login-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const login = document.getElementById("login").value;
    const senha = document.getElementById("senha").value;

    try {
      const response = await 
      fetch("http://localhost:8080/api/login",{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          login: login,
          senha: senha
        })
      });

      if (!response.ok) throw new Error("Login inválido");

      const data = await response.json();
      console.log("✅ Login bem-sucedido:", data);

      // Redirecionar ou armazenar token
    } catch (err) {
      console.error("❌ Erro no login:", err);
    }
});