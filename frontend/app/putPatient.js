import { fetchComToken } from "/src/utils/fetchPagesToken.js";
import "/environment/environment.js";

export async function updatePatient(patientId, patientData) {
    const filteredPatientData = {};

    for (const key in patientData) {
        if (Object.prototype.hasOwnProperty.call(patientData, key)) {
            const value = patientData[key]

            if (value !== null && value !== undefined && 
                (typeof value === 'string' ? value.trim() !== '' : true)) {
                
                filteredPatientData[key] = value;
            }
        }
    }

    console.log("Dados do paciente a serem enviados para atualização (filtrados):", filteredPatientData);

    if (Object.keys(filteredPatientData).length === 0) {
        console.warn("Nenhum dado válido para atualização após a filtragem. Requisição PUT não enviada.");
        return { message: "Nenhum dado para atualizar." }; 
    }

    const response = await fetchComToken(`${window.API_ENDERECO}patients/${patientId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(filteredPatientData),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: `Erro HTTP: ${response.status}` }));
        throw new Error(errorData.message);
    }

    return await response.json(); 
}
