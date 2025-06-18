import { fetchComToken } from "/src/utils/fetchPagesToken.js";
import "/environment/environment.js";

export async function cadastrarUsuario(usuarioData) {
  const response = await fetchComToken(window.API_ENDERECO + "users", {
    method: "POST",
    body: JSON.stringify(usuarioData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: `Erro HTTP: ${response.status}` }));
    throw new Error(errorData.message);
  }

  return await response.json();
}
