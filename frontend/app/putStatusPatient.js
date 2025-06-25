// frontend/app/updatePatientStatus.js
import { fetchComToken } from "/src/utils/fetchPagesToken.js";
import "/environment/environment.js";

export async function updatePatientStatus(patientId, status) {
    const response = await fetchComToken(window.API_ENDERECO + "patients/status/" + patientId, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: status }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: `Erro HTTP: ${response.status}` }));
        throw new Error(errorData.message);
    }

    return await response.json();
}