import { fetchComToken } from "/src/utils/fetchPagesToken.js";
import "/environment/environment.js"; 

export async function buscarExamePeloProtocolo(protocol) {
    const response = await fetchComToken(window.API_ENDERECO + "exams/" + protocol, {
        method: "GET",
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: `Erro HTTP: ${response.status}` }));
        throw new Error(errorData.message);
    }

    return await response.json();
}