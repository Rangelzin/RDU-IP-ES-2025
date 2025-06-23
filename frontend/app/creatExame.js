import { fetchComToken } from "/src/utils/fetchPagesToken.js";
import "/environment/environment.js";

export async function registraExame(exameData, cpf) {

  const response = await fetchComToken(window.API_ENDERECO + "exams/" + cpf, {
    method: "POST",
    body: JSON.stringify(exameData)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: `Erro HTTP: ${response.status}` }));
    throw new Error(errorData.message);
  }

  return await response.json();
}