import { jwtDecode } from '/src/utils/jwtDecode.js';
import { registrarEtapaAnamnese } from '/app/postAnamnese.js';

class anamneseLayout extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    
    shadow.innerHTML = `
            <link rel="stylesheet" href="/assets/css/anamnese.css">

            <div class="exm-page">
                <form action="" method="post">
                    <div class="box-div">
                        <h2 class="box-div-title">Dados da Anamnese</h2>
                    </div>
                    <div class="two-column-layout">
                        <div class="column-left">
                            <div class="ln">
                                <div class="fieldset-motivo-exame">
                                    <legend>1. Motivo do exame <span class="required-asterisk">*</span></legend>
                                    <div class="input-motivo-exame">
                                        <input autocomplete="off" id="radio-rastreamento" name="motivo_exame" type="radio" value="rastreamento" required>
                                        <label for="radio-rastreamento">Rastreamento</label>

                                        <input autocomplete="off" id="radio-repeticao" name="motivo_exame" type="radio" value="repeticao">
                                        <label for="radio-repeticao">Repetição (exame alterado ASCUS/Baixo grau)</label>

                                        <input autocomplete="off" id="radio-seguimento" name="motivo_exame" type="radio" value="seguimento">
                                        <label for="radio-seguimento">Seguimento (pós diagnóstico colposcópico / tratamento)</label>
                                    </div>
                                </div>
                            </div>
                            <div class="ln">
                                <div class="fieldset-fez-preventivo">
                                    <legend>2. Fez o exame preventivo (Papanicolaou) alguma vez? <span class="required-asterisk">*</span></legend>
                                    <div class="input-fez-preventivo">
                                        <input autocomplete="off" id="radio-preventivo-sim" name="fez_preventivo" type="radio" value="1" required>
                                        <label for="radio-preventivo-sim">Sim</label>

                                        <div class="input-ano-ultimo-exame">
                                            <label for="ano-ultimo-exame">Quando fez o último exame? (Ano)</label>
                                            <input autocomplete="off" name="ano_ultimo_exame" id="ano-ultimo-exame" type="text" maxlength="4" placeholder="AAAA" disabled>
                                        </div>

                                        <input autocomplete="off" id="radio-preventivo-nao" name="fez_preventivo" type="radio" value="0">
                                        <label for="radio-preventivo-nao">Não</label>

                                        <input autocomplete="off" id="radio-preventivo-nao-sabe" name="fez_preventivo" type="radio" value="2">
                                        <label for="radio-preventivo-nao-sabe">Não sabe</label>
                                    </div>
                                </div>
                            </div>
                            <div class="ln">
                                <div class="fieldset-usa-diu">
                                    <legend>3. Usa DIU? <span class="required-asterisk">*</span></legend>
                                    <div class="input-usa-diu">
                                        <input autocomplete="off" id="radio-diu-sim" name="usa_diu" type="radio" value="1" required>
                                        <label for="radio-diu-sim">Sim</label>

                                        <input autocomplete="off" id="radio-diu-nao" name="usa_diu" type="radio" value="0">
                                        <label for="radio-diu-nao">Não</label>

                                        <input autocomplete="off" id="radio-diu-nao-sabe" name="usa_diu" type="radio" value="2">
                                        <label for="radio-diu-nao-sabe">Não sabe</label>
                                    </div>
                                </div>
                            </div>
                            <div class="ln">
                                <div class="fieldset-gravida">
                                    <legend>4. Está grávida? <span class="required-asterisk">*</span></legend>
                                    <div class="input-gravida">
                                        <input autocomplete="off" id="radio-gravida-sim" name="gravida" type="radio" value="1" required>
                                        <label for="radio-gravida-sim">Sim</label>

                                        <input autocomplete="off" id="radio-gravida-nao" name="gravida" type="radio" value="0">
                                        <label for="radio-gravida-nao">Não</label>

                                        <input autocomplete="off" id="radio-gravida-nao-sabe" name="gravida" type="radio" value="2">
                                        <label for="radio-gravida-nao-sabe">Não sabe</label>
                                    </div>
                                </div>
                            </div>
                            <div class="ln">
                                <div class="fieldset-usa-pilula">
                                    <legend>5. Usa pílula anticoncepcional? <span class="required-asterisk">*</span></legend>
                                    <div class="input-usa-pilula">
                                        <input autocomplete="off" id="radio-pilula-sim" name="usa_pilula" type="radio" value="1" required>
                                        <label for="radio-pilula-sim">Sim</label>

                                        <input autocomplete="off" id="radio-pilula-nao" name="usa_pilula" type="radio" value="0">
                                        <label for="radio-pilula-nao">Não</label>

                                        <input autocomplete="off" id="radio-pilula-nao-sabe" name="usa_pilula" type="radio" value="2">
                                        <label for="radio-pilula-nao-sabe">Não sabe</label>
                                    </div>
                                </div>
                            </div>
                            <div class="ln">
                                <div class="fieldset-usa-hormonio">
                                    <legend>6. Usa hormônio / remédio para tratar a menopausa? <span class="required-asterisk">*</span></legend>
                                    <div class="input-usa-hormonio">
                                        <input autocomplete="off" id="radio-hormonio-sim" name="usa_hormonio" type="radio" value="1" required>
                                        <label for="radio-hormonio-sim">Sim</label>

                                        <input autocomplete="off" id="radio-hormonio-nao" name="usa_hormonio" type="radio" value="0">
                                        <label for="radio-hormonio-nao">Não</label>

                                        <input autocomplete="off" id="radio-hormonio-nao-sabe" name="usa_hormonio" type="radio" value="2">
                                        <label for="radio-hormonio-nao-sabe">Não sabe</label>
                                    </div>
                                </div>
                            </div>
                        </div> 
                        <div class="column-right">
                            <div class="ln">
                                <div class="fieldset-radioterapia">
                                    <legend>7. Já fez tratamento por radioterapia? <span class="required-asterisk">*</span></legend>
                                    <div class="input-radioterapia">
                                        <input autocomplete="off" id="radio-radioterapia-sim" name="radioterapia" type="radio" value="1" required>
                                        <label for="radio-radioterapia-sim">Sim</label>

                                        <input autocomplete="off" id="radio-radioterapia-nao" name="radioterapia" type="radio" value="0">
                                        <label for="radio-radioterapia-nao">Não</label>

                                        <input autocomplete="off" id="radio-radioterapia-nao-sabe" name="radioterapia" type="radio" value="2">
                                        <label for="radio-radioterapia-nao-sabe">Não sabe</label>
                                    </div>
                                </div>
                            </div>
                            <div class="ln">
                                <div class="input-ultima-menstruacao">
                                    <label for="ultima-menstruacao">8. Data da última menstruação / regra:</label>
                                    <input autocomplete="off" name="ultima_menstruacao" id="ultima-menstruacao" type="text" placeholder="DD/MM/AAAA" maxlength="10">
                                    <div class="checkbox-nao-sabe-nao-lembra">
                                        <input autocomplete="off" id="checkbox-nao-sabe-menstruacao" name="ultima_menstruacao_nao_sabe" type="checkbox" value="1">
                                        <label for="checkbox-nao-sabe-menstruacao">Não sabe/Não lembra</label>
                                    </div>
                                </div>
                            </div>
                            <div class="ln">
                                <div class="fieldset-sangramento-relacao">
                                    <legend>9. Tem/teve algum sangramento após relações sexuais? <span class="required-asterisk">*</span><br>(não considerar a primeira relação sexual na vida)</legend>
                                    <div class="input-sangramento-relacao">
                                        <input autocomplete="off" id="radio-sangramento-relacao-sim" name="sangramento_relacao" type="radio" value="1" required>
                                        <label for="radio-sangramento-relacao-sim">Sim</label>

                                        <input autocomplete="off" id="radio-sangramento-relacao-nao" name="sangramento_relacao" type="radio" value="0">
                                        <label for="radio-sangramento-relacao-nao">Não/Não sabe/Não lembra</label>
                                    </div>
                                </div>
                            </div>
                            <div class="ln">
                                <div class="fieldset-sangramento-menopausa">
                                    <legend>10. Tem ou teve algum sangramento após a menopausa? <span class="required-asterisk">*</span><br>(não considerar o(s) sangramento(s) na vigência de reposição hormonal)</legend>
                                    <div class="input-sangramento-menopausa">
                                        <input autocomplete="off" id="radio-sangramento-menopausa-sim" name="sangramento_menopausa" type="radio" value="1" required>
                                        <label for="radio-sangramento-menopausa-sim">Sim</label>

                                        <input autocomplete="off" id="radio-sangramento-menopausa-nao" name="sangramento_menopausa" type="radio" value="0">
                                        <label for="radio-sangramento-menopausa-nao">Não/Não sabe/Não lembra/Não está na menopausa</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
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
        // 1. Motivo do exame
        'radio-rastreamento': shadow.querySelector('#radio-rastreamento'),
        'radio-repeticao': shadow.querySelector('#radio-repeticao'),
        'radio-seguimento': shadow.querySelector('#radio-seguimento'),

        // 2. Fez o exame preventivo (Papanicolaou) alguma vez?
        'radio-preventivo-sim': shadow.querySelector('#radio-preventivo-sim'),
        'radio-preventivo-nao': shadow.querySelector('#radio-preventivo-nao'),
        'radio-preventivo-nao-sabe': shadow.querySelector('#radio-preventivo-nao-sabe'),
        'ano-ultimo-exame': shadow.querySelector('#ano-ultimo-exame'),

        // 3. Usa DIU?
        'radio-diu-sim': shadow.querySelector('#radio-diu-sim'),
        'radio-diu-nao': shadow.querySelector('#radio-diu-nao'),
        'radio-diu-nao-sabe': shadow.querySelector('#radio-diu-nao-sabe'),

        // 4. Está grávida?
        'radio-gravida-sim': shadow.querySelector('#radio-gravida-sim'),
        'radio-gravida-nao': shadow.querySelector('#radio-gravida-nao'),
        'radio-gravida-nao-sabe': shadow.querySelector('#radio-gravida-nao-sabe'),

        // 5. Usa pílula anticoncepcional?
        'radio-pilula-sim': shadow.querySelector('#radio-pilula-sim'),
        'radio-pilula-nao': shadow.querySelector('#radio-pilula-nao'),
        'radio-pilula-nao-sabe': shadow.querySelector('#radio-pilula-nao-sabe'),

        // 6. Usa hormônio / remédio para tratar a menopausa?
        'radio-hormonio-sim': shadow.querySelector('#radio-hormonio-sim'),
        'radio-hormonio-nao': shadow.querySelector('#radio-hormonio-nao'),
        'radio-hormonio-nao-sabe': shadow.querySelector('#radio-hormonio-nao-sabe'),

        // 7. Já fez tratamento por radioterapia?
        'radio-radioterapia-sim': shadow.querySelector('#radio-radioterapia-sim'),
        'radio-radioterapia-nao': shadow.querySelector('#radio-radioterapia-nao'),
        'radio-radioterapia-nao-sabe': shadow.querySelector('#radio-radioterapia-nao-sabe'),

        // 8. Data da última menstruação / regra:
        'ultima-menstruacao': shadow.querySelector('#ultima-menstruacao'),
        'checkbox-nao-sabe-menstruacao': shadow.querySelector('#checkbox-nao-sabe-menstruacao'),

        // 9. Tem/teve algum sangramento após relações sexuais?
        'radio-sangramento-relacao-sim': shadow.querySelector('#radio-sangramento-relacao-sim'),
        'radio-sangramento-relacao-nao': shadow.querySelector('#radio-sangramento-relacao-nao'),

        // 10. Tem ou teve algum sangramento após a menopausa?
        'radio-sangramento-menopausa-sim': shadow.querySelector('#radio-sangramento-menopausa-sim'),
        'radio-sangramento-menopausa-nao': shadow.querySelector('#radio-sangramento-menopausa-nao')
    };


    // Disable "Ano" input if "Não" is selected for "Fez preventivo"
    inputs['radio-preventivo-nao'].addEventListener('change', () => {
        if (inputs['radio-preventivo-nao'].checked) {
            inputs['ano-ultimo-exame'].disabled = true;
            inputs['ano-ultimo-exame'].value = ''; // Clear the value when disabled
        }
    });

    inputs['radio-preventivo-sim'].addEventListener('change', () => {
        if (inputs['radio-preventivo-sim'].checked) {
            inputs['ano-ultimo-exame'].disabled = false;
        }
    });

    inputs['radio-preventivo-nao-sabe'].addEventListener('change', () => {
        if (inputs['radio-preventivo-nao-sabe'].checked) {
            inputs['ano-ultimo-exame'].disabled = true;
            inputs['ano-ultimo-exame'].value = ''; // Clear the value when disabled
        }
    });

    // Disable "Data da última menstruação" if "Não sabe/Não lembra" is checked
    inputs['checkbox-nao-sabe-menstruacao'].addEventListener('change', () => {
        if (inputs['checkbox-nao-sabe-menstruacao'].checked) {
            inputs['ultima-menstruacao'].disabled = true;
            inputs['ultima-menstruacao'].value = ''; // Clear the value when disabled
        } else {
            inputs['ultima-menstruacao'].disabled = false;
        }
    });   

    // Mask
    inputs['ultima-menstruacao'].addEventListener( 'input' ,(e) => {
        let v = e.target.value.replace(/\D/g, '');
        v = v.replace(/(\d{2})(\d)/, "$1/$2");
        v = v.replace(/(\d{2})(\d)/, "$1/$2");
        e.target.maxLength = 10;
        e.target.value = v;
    });


    //função que pega o forms
    function getForms() {
            const data = {};

            // Helper to get checked radio button value by name
            const getRadioValue = (name) => {
                const radioButtons = shadow.querySelectorAll(`input[name="${name}"]:checked`);
                return radioButtons.length > 0 ? radioButtons[0].value : null;
            };

            // 1. Motivo do exame (string)
            data.Motivo_exame = getRadioValue('motivo_exame');

            // 2. Fez o exame preventivo (int: 0=Não, 1=Sim, 2=Não sabe)
            data.Fez_preventivo = parseInt(getRadioValue('fez_preventivo'));

            // Ano_ultimo_exame (string, only if fez_preventivo is '1')
            data.Ano_ultimo_exame = (data.Fez_preventivo === 1 && !inputs['ano-ultimo-exame'].disabled)
                ? inputs['ano-ultimo-exame'].value
                : ""; // Return empty string if disabled or "Não" / "Não sabe"

            // 3. Usa DIU (int: 0=Não, 1=Sim, 2=Não sabe)
            data.Usa_diu = parseInt(getRadioValue('usa_diu'));

            // 4. Está grávida (int: 0=Não, 1=Sim, 2=Não sabe)
            data.Gravida = parseInt(getRadioValue('gravida'));

            // 5. Usa pílula anticoncepcional (int: 0=Não, 1=Sim, 2=Não sabe)
            data.Usa_pilula = parseInt(getRadioValue('usa_pilula'));

            // 6. Usa hormônio / remédio para tratar a menopausa (int: 0=Não, 1=Sim, 2=Não sabe)
            data.Usa_hormonio = parseInt(getRadioValue('usa_hormonio'));

            // 7. Já fez tratamento por radioterapia (int: 0=Não, 1=Sim, 2=Não sabe)
            data.Radioterapia = parseInt(getRadioValue('radioterapia'));

            // 8. Ultima_menstruacao (time.Time string - ISO 8601 format recommended for Go time.Time)
            // Assuming DD/MM/AAAA format for input, convert to YYYY-MM-DD for ISO 8601
            let ultimaMenstruacaoValue = inputs['ultima-menstruacao'].value;
            if (inputs['checkbox-nao-sabe-menstruacao'].checked || ultimaMenstruacaoValue === '') {
                data.Ultima_menstruacao = null; // Or an empty string if null is not desired for time.Time
            } else {
                const parts = ultimaMenstruacaoValue.split('/');
                if (parts.length === 3) {
                    // Create a Date object in local time and then format as YYYY-MM-DD
                    const date = new Date(`${parts[2]}-${parts[1]}-${parts[0]}T00:00:00`);
                    if (!isNaN(date.getTime())) { // Check for valid date
                        data.Ultima_menstruacao = date.toISOString(); // Example: "2024-06-25T03:43:27.000Z"
                    } else {
                        data.Ultima_menstruacao = null; // Invalid date input
                    }
                } else {
                    data.Ultima_menstruacao = null; // Invalid date format
                }
            }


            // 9. Sangramento_relacao (int: 0=Não/Não sabe/Não lembra, 1=Sim)
            data.Sangramento_relacao = parseInt(getRadioValue('sangramento_relacao'));

            // 10. Sangramento_menopausa (int: 0=Não/Não sabe/Não lembra/Não está na menopausa, 1=Sim)
            data.Sangramento_menopausa = parseInt(getRadioValue('sangramento_menopausa'));

            data.Responsavel_id = userId;
            
            return data;
    };

    //valida o forms
    function validateFormFields(shadowRoot) {
        const errors = [];

        // Seleciona todos os campos que têm o atributo 'required'
        const requiredFields = shadowRoot.querySelectorAll('input[required], textarea[required], select[required]');

        requiredFields.forEach(field => {
            // Ignora campos desabilitados, pois não são esperados para preenchimento
            if (field.disabled) {
                return;
            }

            let isFieldValid = true;
            let fieldName = '';

            // Tenta obter o nome do campo a partir da label associada ou do id/placeholder
            // Prioriza a label associada ao input pelo 'for' ou 'previousElementSibling'
            if (field.labels && field.labels.length > 0) {
                fieldName = field.labels[0].textContent.replace('*', '').trim();
            } else if (field.previousElementSibling && field.previousElementSibling.tagName === 'LABEL') {
                fieldName = field.previousElementSibling.textContent.replace('*', '').trim();
            } else if (field.placeholder) {
                fieldName = field.placeholder;
            } else {
                fieldName = `Campo ${field.id}`;
            }
            
            // Ajuste para legendas de grupos de radio buttons (que não têm label direta para cada input)
            // O nome do grupo de radio geralmente vem da <legend> do fieldset que o contém.
            if (field.type === 'radio') {
                const containerDiv = field.closest('div[class^="fieldset-"]'); 
                if (containerDiv) {
                    const legend = containerDiv.querySelector('legend');
                    if (legend) {
                        // Remove o número da questão e o asterisco da legenda
                        fieldName = legend.textContent.replace(/^[0-9]+\.\s*/, '').replace(' *', '').trim();
                    }
                }
            }


            if (field.type === 'radio') {
                const radioGroupName = field.name;
                const radiosInGroup = shadowRoot.querySelectorAll(`input[type="radio"][name="${radioGroupName}"]`);
                const isAnyRadioChecked = Array.from(radiosInGroup).some(radio => radio.checked);
                if (!isAnyRadioChecked) {
                    isFieldValid = false;
                    errors.push(`Selecione uma opção para "${fieldName}".`);
                }
            } else if (field.type === 'checkbox') {
                // A validação de checkbox só é necessária se não for o checkbox condicional da menstruação
                // O checkbox de menstruação é validado na seção específica abaixo.
                if (field.id !== 'checkbox-nao-sabe-menstruacao' && !field.checked) {
                    isFieldValid = false;
                    errors.push(`O campo "${fieldName}" é obrigatório e deve ser marcado.`);
                }
            } else if (field.tagName === 'SELECT') {
                if (!field.value || field.value.trim() === '') {
                    isFieldValid = false;
                    errors.push(`Selecione uma opção para "${fieldName}".`);
                }
            } else { // Para inputs de texto, number, etc.
                if (!field.value || field.value.trim() === '') {
                    isFieldValid = false;
                    errors.push(`O campo "${fieldName}" é obrigatório.`);
                }
            }
        });

        // --- Validação específica para "Fez o exame preventivo" e "Ano do último exame" ---
        const radioPreventivoSim = shadowRoot.querySelector('#radio-preventivo-sim');
        const anoUltimoExameInput = shadowRoot.querySelector('#ano-ultimo-exame');
        
        if (radioPreventivoSim && radioPreventivoSim.checked) {
            // Se "Sim" para preventivo estiver marcado, o ano é obrigatório
            if (!anoUltimoExameInput.value || anoUltimoExameInput.value.trim() === '') {
                errors.push('O campo "Quando fez o último exame? (Ano)" é obrigatório quando a opção "Sim" é selecionada.');
            } else if (anoUltimoExameInput.value.trim().length !== anoUltimoExameInput.maxLength) {
                // Também valida o maxlength se ele for obrigatório
                errors.push(`O campo "Quando fez o último exame? (Ano)" deve ser preenchido com ${anoUltimoExameInput.maxLength} caracteres.`);
            } else if (!/^\d{4}$/.test(anoUltimoExameInput.value)) {
                // Garante que é um ano válido de 4 dígitos
                errors.push('O campo "Quando fez o último exame? (Ano)" deve conter um ano válido com 4 dígitos numéricos.');
            } else {
                const currentYear = new Date().getFullYear();
                const inputYear = parseInt(anoUltimoExameInput.value, 10);
                if (inputYear > currentYear) {
                    errors.push('O ano do último exame não pode ser uma data futura.');
                } else if (inputYear < 1900) { // Exemplo de limite mínimo razoável
                    errors.push('O ano do último exame parece muito antigo. Por favor, verifique.');
                }
            }
        }


        // --- Validação específica para o campo de data de menstruação ---
        const ultimaMenstruacaoInput = shadowRoot.querySelector('#ultima-menstruacao');
        const checkboxNaoSabeMenstruacao = shadowRoot.querySelector('#checkbox-nao-sabe-menstruacao');

        // Valida se o campo de data está preenchido OU se o checkbox "Não sabe/Não lembra" está marcado.
        // Se o input de data está disabled (porque o checkbox foi marcado via JS), ele não é obrigatório para preenchimento.
        if (!ultimaMenstruacaoInput.disabled && !checkboxNaoSabeMenstruacao.checked) {
            if (!ultimaMenstruacaoInput.value || ultimaMenstruacaoInput.value.trim() === '') {
                errors.push('A "Data da última menstruação / regra:" é obrigatória, ou marque "Não sabe/Não lembra".');
            } else {
                // Expressão regular para validar o formato DD/MM/AAAA
                const dateFormatRegex = /^\d{2}\/\d{2}\/\d{4}$/;
                if (!dateFormatRegex.test(ultimaMenstruacaoInput.value)) {
                    errors.push('A "Data da última menstruação / regra:" deve estar no formato DD/MM/AAAA.');
                } else {
                    // Tenta criar uma data real para verificar se é válida (ex: 31/02/2024 é inválido)
                    const parts = ultimaMenstruacaoInput.value.split('/');
                    const day = parseInt(parts[0], 10);
                    const month = parseInt(parts[1], 10) - 1; // Mês é 0-indexado
                    const year = parseInt(parts[2], 10);
                    const date = new Date(year, month, day);

                    // Verifica se a data é real e se corresponde ao que foi inserido
                    if (date.getFullYear() !== year || date.getMonth() !== month || date.getDate() !== day || isNaN(date.getTime())) {
                        errors.push('A "Data da última menstruação / regra:" é inválida. Por favor, insira uma data real.');
                    } else if (date > new Date()) { // Verifica se a data não é futura
                        errors.push('A "Data da última menstruação / regra:" não pode ser uma data futura.');
                    }
                }
            }
        } else if (ultimaMenstruacaoInput.disabled && !checkboxNaoSabeMenstruacao.checked) {
            // Se a data está desabilitada (pela lógica JS) e o checkbox NÃO está marcado, é um erro.
            // Isso cobre o caso em que alguém desabilita manualmente a data sem marcar o checkbox.
            errors.push('Marque "Não sabe/Não lembra" para a "Data da última menstruação / regra:" se ela não for preenchida.');
        } else if (!ultimaMenstruacaoInput.disabled && checkboxNaoSabeMenstruacao.checked && ultimaMenstruacaoInput.value.trim() !== '') {
            // Se o checkbox está marcado, mas a data não está desabilitada e tem valor, pode ser um conflito.
            errors.push('O campo "Data da última menstruação / regra:" deve estar vazio se "Não sabe/Não lembra" estiver marcado.');
        }


        if (errors.length > 0) {
            alert("Por favor, corrija os seguintes erros:\n\n" + errors.join("\n"));
            return false;
        }

        return true;
    }    

    // Ao clicar no botão 
    document.addEventListener("getFormData", async () => {
        if (!validateFormFields(shadow)) {
            return; // Se a validação falhar, interrompe a execução
        }
        
        const dataAnamnesia = getForms();
        
        try{
            await registrarEtapaAnamnese(nProtocol, dataAnamnesia)
        } catch {
            alert("erro ao registrar etapa do exame")
            return
        }
        

        window.location.replace("/main/usuario/exame/2")
    });
  }
}

if (!customElements.get('exam-anamnese')) {
  customElements.define('exam-anamnese', anamneseLayout);
}
