// frontend/app/putUsers.js (ou similar, onde suas funções de API estão)

import { fetchComToken } from "/src/utils/fetchPagesToken.js";
import "/environment/environment.js"; 

export async function getUserByCpf(cpf) {
    const response = await fetchComToken(`${window.API_ENDERECO}users/${cpf}`, {
        method: "GET",
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: `Erro HTTP: ${response.status}` }));
        throw new Error(errorData.message);
    }

    return await response.json();
}


export async function updateUser(originalCpf, userData) {
    const response = await fetchComToken(`${window.API_ENDERECO}users/${originalCpf}`, { 
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: `Erro HTTP: ${response.status}` }));
        throw new Error(errorData.message);
    }

    return await response.json(); 
}

export async function deleteUser(id) {
    const response = await fetchComToken(`${window.API_ENDERECO}users/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: `Erro HTTP: ${response.status}` }));
        throw new Error(errorData.message);
    }

}