import { jwtDecode } from '/src/utils/jwtDecode.js';
import { registrarEtapaClinico } from '/app/postClinico.js';

class clinicoLayout extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    
    shadow.innerHTML = `
        <link rel="stylesheet" href="/assets/css/clinico.css">

        <div class="exm-page">
            <form action="" method="post">
                <div class="box-div">
                    <h2 class="box-div-title">EXAME CLÍNICO</h2>
                </div>

                <fieldset class="fieldset-exame-clinico">
                    <div class="two-column-layout-clinical">
                        <div class="column-left-clinical">
                            <div class="ln">
                                <div class="fieldset-inspecao-colo">
                                    <legend>11. Inspeção do colo<span class="required-asterisk">*</span></legend>
                                    <div class="input-inspecao-colo">
                                        <input autocomplete="off" id="inspecao-colo-normal" name="inspecao_colo" type="radio" value="normal" required>
                                        <label for="inspecao-colo-normal">Normal</label>

                                        <input autocomplete="off" id="inspecao-colo-ausente" name="inspecao_colo" type="radio" value="ausente">
                                        <label for="inspecao-colo-ausente">Ausente (anomalias congênitas ou retirado cirurgicamente)</label>

                                        <input autocomplete="off" id="inspecao-colo-alterado" name="inspecao_colo" type="radio" value="alterado">
                                        <label for="inspecao-colo-alterado">Alterado</label>

                                        <input autocomplete="off" id="inspecao-colo-nao-visualizado" name="inspecao_colo" type="radio" value="nao_visualizado">
                                        <label for="inspecao-colo-nao-visualizado">Colo não visualizado</label>
                                    </div>
                                </div>
                            </div>

                            <div class="ln">
                                <div class="input-data-coleta">
                                    <label for="data-coleta-dia">Data da coleta<span class="required-asterisk">*</span></label>
                                    <div class="date-inputs">
                                        <input autocomplete="off" name="data_coleta_dia" id="data-coleta-dia" type="text" maxlength="2" placeholder="DD" required>
                                        <span class="date-separator">/</span>
                                        <input autocomplete="off" name="data_coleta_mes" id="data-coleta-mes" type="text" maxlength="2" placeholder="MM" required>
                                        <span class="date-separator">/</span>
                                        <input autocomplete="off" name="data_coleta_ano" id="data-coleta-ano" type="text" maxlength="4" placeholder="AAAA" required>
                                    </div>
                                </div>
                            </div>
                        </div><div class="column-right-clinical">
                            <div class="ln">
                                <div class="fieldset-sinais-dst">
                                    <legend>12. Sinais sugestivos de doenças sexualmente transmissíveis?</legend>
                                    <div class="input-sinais-dst">
                                        <input autocomplete="off" id="sinais-dst-sim" name="sinais_dst" type="radio" value="true">
                                        <label for="sinais-dst-sim">Sim</label>

                                        <input autocomplete="off" id="sinais-dst-nao" name="sinais_dst" type="radio" value="false">
                                        <label for="sinais-dst-nao">Não</label>
                                    </div>
                                </div>
                            </div>

                            <div class="note-box">
                                <p class="note-text">
                                    **NOTA:** Na presença de colo alterado, com lesão sugestiva de câncer, não aguardar o resultado do exame citopatológico para encaminhar a mulher para colposcopia.
                                </p>
                            </div>

                            <div class="ln">
                                <div class="input-responsavel">
                                    <label for="responsavel">Responsável<span class="required-asterisk">*</span></label>
                                    <input autocomplete="off" name="responsavel" id="responsavel" type="text" maxlength="20" required>
                                </div>
                            </div>
                        </div></div></fieldset> </form>
        </div>
    `

    function runEvent(sessionStorageKey, inputValue) {
        const storageEvent = new CustomEvent("sessionStorageUpdated", {
                detail: { key: sessionStorageKey, value: inputValue },
                bubbles: true,
                composed: true
        });
        document.dispatchEvent(storageEvent);
    }

    var token;
    var nProtocol;
    var pName;
    var userId;

    function lodingPage(){

        token = localStorage.getItem("token")
        if (!token) return "token não encontrado"

        nProtocol = sessionStorage.getItem("numero-protocolo")
        if (!nProtocol) return "número do protocolo não encontrado"

        pName = sessionStorage.getItem("profile-name")
        if (!pName) return "nome da paciente não encontrado"

        if (token) {
            const decodedToken = jwtDecode(token);
            if (decodedToken && decodedToken.payload) {
                userId = decodedToken.payload.id;
            }
        }
        if (!userId) return "id do usuario não encontrado"

        runEvent("numero-protocolo", nProtocol)
        runEvent("profile-name", pName)

        // validar permição
        
    }
    const err = lodingPage()
    if (err != null) {
        alert("erro: " + err)
        window.location.replace("/main/usuario")
    }

    // Mapeamento dos inputs para fácil acesso
    const inputs = {

        // 1. Inspeção do colo
        'inspecao-colo-normal': shadow.querySelector('#inspecao-colo-normal'),
        'inspecao-colo-ausente': shadow.querySelector('#inspecao-colo-ausente'),
        'inspecao-colo-alterado': shadow.querySelector('#inspecao-colo-alterado'),
        'inspecao-colo-nao-visualizado': shadow.querySelector('#inspecao-colo-nao-visualizado'),

        // 2. Sinais sugestivos de DST
        'sinais-dst-sim': shadow.querySelector('#sinais-dst-sim'),
        'sinais-dst-nao': shadow.querySelector('#sinais-dst-nao'),

        // Data da coleta
        'data-coleta-dia': shadow.querySelector('#data-coleta-dia'),
        'data-coleta-mes': shadow.querySelector('#data-coleta-mes'),
        'data-coleta-ano': shadow.querySelector('#data-coleta-ano'),

        // Responsável
        'responsavel': shadow.querySelector('#responsavel')
    };

    // Mask


    //função que pega o forms
    function getExamClinicData(inputs) {
        const data = {};

        // Helper para pegar valor de radio pelo name
        const getRadioValue = (name) => {
            const radioButtons = shadow.querySelectorAll(`input[name="${name}"]:checked`);
            return radioButtons.length > 0 ? radioButtons[0].value : null;
        };

        // 11. Inspeção do colo (string)
        data.inspecao_colo = getRadioValue('inspecao_colo') || '';

        // 12. Sinais sugestivos de DST (bool)
        // Aqui consideramos que "Sim" tem value="true" e "Não" tem value="false"
        const sinaisDSTValue = getRadioValue('sinais_dst');
        data.sinais_dst = sinaisDSTValue === 'true';

        // Data da coleta (Date no formato ISO para o Go interpretar como time.Time)
        const dia = inputs['data-coleta-dia']?.value.trim();
        const mes = inputs['data-coleta-mes']?.value.trim();
        const ano = inputs['data-coleta-ano']?.value.trim();

        if (dia && mes && ano) {
            const isoDateStr = `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}T00:00:00`;
            const parsedDate = new Date(isoDateStr);
            if (!isNaN(parsedDate)) {
                data.data_coleta = parsedDate.toISOString(); // ou apenas parsedDate, se for enviado como Date
            } else {
                data.data_coleta = null;
            }
        } else {
            data.data_coleta = null;
        }

        // Responsável (string)
        data.nome_responsavel = inputs['responsavel']?.value.trim() || '';

        data.responsavel_id = userId;

        return data;
    }


    //valida o forms
    function validateExamClinicSection(inputs) {
        const errors = [];

        // 11. Inspeção do colo (grupo de radio)
        const inspecaoColoGroup = [
            inputs['inspecao-colo-normal'],
            inputs['inspecao-colo-ausente'],
            inputs['inspecao-colo-alterado'],
            inputs['inspecao-colo-nao-visualizado']
        ];
        const isInspecaoColoChecked = inspecaoColoGroup.some(input => input?.checked);
        if (!isInspecaoColoChecked) {
            errors.push('Selecione uma opção para "Inspeção do colo".');
        }

        // // 12. Sinais sugestivos de DST (grupo de radio)
        // const sinaisDSTGroup = [
        //     inputs['sinais-dst-sim'],
        //     inputs['sinais-dst-nao']
        // ];
        // const isSinaisDSTChecked = sinaisDSTGroup.some(input => input?.checked);
        // if (!isSinaisDSTChecked) {
        //     errors.push('Selecione uma opção para "Sinais sugestivos de doenças sexualmente transmissíveis?".');
        // }

        // Data da coleta: dia, mês e ano
        const dia = inputs['data-coleta-dia']?.value.trim();
        const mes = inputs['data-coleta-mes']?.value.trim();
        const ano = inputs['data-coleta-ano']?.value.trim();

        if (!dia || !mes || !ano) {
            errors.push('Preencha corretamente a "Data da coleta" (dia, mês e ano).');
        } else {
            const day = parseInt(dia, 10);
            const month = parseInt(mes, 10);
            const year = parseInt(ano, 10);

            const isValidDate =
                !isNaN(day) && !isNaN(month) && !isNaN(year) &&
                day >= 1 && day <= 31 &&
                month >= 1 && month <= 12 &&
                year >= 1900 && year <= new Date().getFullYear();

            const dateObj = new Date(year, month - 1, day);
            if (
                !isValidDate ||
                dateObj.getDate() !== day ||
                dateObj.getMonth() + 1 !== month ||
                dateObj.getFullYear() !== year
            ) {
                errors.push('A "Data da coleta" é inválida. Verifique se é uma data real.');
            } else if (dateObj > new Date()) {
                errors.push('A "Data da coleta" não pode ser uma data futura.');
            }
        }

        // Responsável
        const responsavel = inputs['responsavel'];
        if (!responsavel || !responsavel.value.trim()) {
            errors.push('O campo "Responsável" é obrigatório.');
        }

        // Retorno final
        if (errors.length > 0) {
            alert("Por favor, corrija os seguintes erros:\n\n" + errors.join("\n"));
            return false;
        }

        return true;
    }


    // Ao clicar no botão 
    document.addEventListener("getFormData", async () => {
        if (!validateExamClinicSection(inputs)) return;

        const dataClinico = getExamClinicData(inputs);

        try{
            await registrarEtapaClinico(nProtocol, dataClinico)
        } catch {
            alert("erro ao registrar etapa do exame")
            return
        }
        

        window.location.replace("/main/usuario/exame/3")
        
    });
  }
}

if (!customElements.get('exam-clinico')) {
  customElements.define('exam-clinico', clinicoLayout);
}
