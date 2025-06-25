import { fetchComToken } from "/src/utils/fetchPagesToken.js";
import "/environment/environment.js";

export async function registrarEtapaClinico(id, dataAnamnesia) {

  const response = await fetchComToken(window.API_ENDERECO + "citology_forms/" + id + "/clinico", {
    method: "POST",
    body: JSON.stringify(dataAnamnesia)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: `Erro HTTP: ${response.status}` }));
    throw new Error(errorData.message);
  }

  return await response.json();
}