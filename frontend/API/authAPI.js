import "../environment/environment.js"

export async function loginRequisicao(cpf, psw) {
    console.log("FUNÇÂO 2")
    const credenciais = { cpf, psw }

    const response = await fetch(window.API_ENDERECO + "auth/login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credenciais)
    })

    if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: `Erro HTTP: ${response.status}` }));
            throw new Error(errorData.message);
    }

    const token = await response.json()

    localStorage.setItem("token", token)
    window.location.replace("/public/pages/main/main_admin.html")
}