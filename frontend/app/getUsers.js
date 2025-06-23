// frontend/app/getUsers.js
import { fetchComToken } from "/src/utils/fetchPagesToken.js";
import "/environment/environment.js";


const API_BASE_URL = window.API_ENDERECO + "users"; 


export async function buscarUsuarios() {
  const response = await fetchComToken(API_BASE_URL, {
    method: "GET",
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: `Erro HTTP: ${response.status}` }));
    throw new Error(errorData.message);
  }

  return await response.json();
}

export async function getUserByCpf(cpf) {
    const response = await fetchComToken(`${API_BASE_URL}/${cpf}`, {
        method: "GET",
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: `Erro HTTP: ${response.status}` }));
        throw new Error(errorData.message);
    }
    return await response.json();
}