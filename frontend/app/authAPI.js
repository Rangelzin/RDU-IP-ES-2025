import "/environment/environment.js";
import { jwtDecode } from '../src/utils/jwtDecode.js';
import { decodificarPermissoesStrToVet } from '../src/utils/roleCoderAndDecoder.js';

async function MapsByRole(token) {
    try {
        let userRolesArray = [];
        if (token) {
            const decodedToken = jwtDecode(token);
            if (decodedToken && decodedToken.payload) {
                const roleString = decodedToken.payload.role;
                userRolesArray = await decodificarPermissoesStrToVet(roleString);
            }
        }

        const primaryRole = userRolesArray[0];

        switch (primaryRole) {
            case 'paciente':
                window.location.replace("/paciente");
                break;
            case 'admin':
                window.location.replace("/admin");
                break;
            case 'medico':
            case 'enfermeiro':
                window.location.replace("/main");
                break;
            case 'outros':
                window.location.replace("/main/ACS");
                break;
            default:
                window.location.replace("/login");
                break;
        }
    } catch (error) {
        alert("Ocorreu um erro ao processar as permissões do usuário.");
    }
}

export async function loginRequisicao(cpf, psw) {
    const credenciais = { cpf, psw };

    const response = await fetch(window.API_ENDERECO + "auth/login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credenciais)
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: `Erro HTTP: ${response.status}` }));
        throw new Error(errorData.message);
    }

    const tokenObj = await response.json();
    
    localStorage.setItem("token", tokenObj.token);

    await MapsByRole(tokenObj.token);
}
