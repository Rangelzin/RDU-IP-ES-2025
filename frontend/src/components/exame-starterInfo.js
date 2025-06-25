import { registraPaciente } from "/app/creatPatient.js";
import { buscarPacientePeloCPF } from "/app/getPatientCPF.js";
import { buscarExamePeloProtocolo } from "/app/getExamByProtoc.js"
import { registraExame } from "/app/creatExame.js";
import { updatePatient } from "/app/putPatient.js";


class ExamLayoutStarterInfo extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });

    shadow.innerHTML = `
        <link rel="stylesheet" href="/assets/css/starter-info.css"/>

        <div class="exm-page">
            <div class="header">
                <div class="h-title">
                    <h1 class="title">Ministério da saúde</h1>
                    <h1 class="title">Requisição de exame citopatológico - Colo de útero</h1>
                </div>
                <h2 class="sub-title">Programa nacional de controle do câncer do colo de útero</h2>
            </div>
            <form action="" method="post">
                <div class ="ln">
                    <div class="input-uf">
                        <label for="uf">UF</label>
                        <input maxlength="2" autocomplete="off" name="uf" id="uf" type="text" disabled>
                    </div>
                    <div class="input-cnes">
                        <label for="cnes ">CNES da unidade de Saúde</label>
                        <input autocomplete="off" name="cnes" id="cnes" type="text" disabled>
                    </div>
                    <div class="input-n-protocolo">
                        <label for="n-protocolo">N° Protocolo </label>
                        <div>
                            <input autocomplete="off" name="n-protocolo" id="n-protocolo" type="text" maxlength="14">
                            <label for="n-protocolo ">(n° gerado automaticamente pelo SISCAN)</label>
                        </div>
                    </div>
                </div>
                <div class ="ln">
                    <div class="input-unidade-de-saude">
                        <label for="unidade-de-saude ">Unidade de Saúde</label>
                        <input autocomplete="off" name="unidade-de-saude" id="unidade-de-saude" type="text" disabled>
                    </div>
                </div>
                <div class ="ln">
                    <div class="input-municipio">
                        <label for="municipio ">Município</label>
                        <input autocomplete="off" name="municipio" id="municipio" type="text" disabled>
                    </div>
                    <div class="input-prontuario">
                        <label for="prontuario ">Prontuário</label>
                        <input autocomplete="off" name="prontuario" id="prontuario" type="text" maxlength="10">
                    </div>
                </div>
                <div class="box-div">
                    <h2 class="box-div-title">INFORMAÇÕES PESSOAIS</h2>
                </div> 
                <div class="ln">
                    <div class="input-cart-sus">
                        <label for="cart-sus ">Cartão SUS <span class="required-asterisk">*</span></label>
                        <input autocomplete="off" name="cart-sus" id="cart-sus" type="text" required>
                    </div>
                </div>
                <div class="ln">
                    <div class="input-nome-completo">
                        <label for="nome-completo">Nome Completo da Mulher <span class="required-asterisk">*</span></label>
                        <input autocomplete="off" name="nome-completo" id="nome-completo" type="text" required>
                    </div>
                </div>
                <div class="ln">
                    <div class="input-nome-mae">
                        <label for="nome-mae">Nome Completo da mãe <span class="required-asterisk">*</span></label>
                        <input autocomplete="off" name="nome-mae" id="nome-mae" type="text" required>
                    </div>
                    <div class="input-apelido-mulher">
                        <label for="apelido-mulher">Apelido da Mulher</label>
                        <input autocomplete="off" name="apelido-mulher" id="apelido-mulher" type="text">
                    </div>
                </div>
                <div class="ln">
                    <div class="input-cpf">
                        <label for="cpf ">CPF <span class="required-asterisk">*</span></label>
                        <input autocomplete="off" name="cpf" id="cpf" type="text" required>
                    </div>
                    <div class="input-nacionalidade">
                        <label for="nacionalidade">nacionalidade</label>
                        <input autocomplete="off" name="nacionalidade" id="nacionalidade" type="text">
                    </div>
                </div>
                <div class="ln">
                    <div class="input-data-nascimento">
                        <label for="date">Data de Nascimento <span class="required-asterisk">*</span></label>
                        <input autocomplete="off" name="date" id="date" type="text" required>
                    </div>
                    <div class="input-idade">
                        <label for="idade">Idade</label>
                        <input autocomplete="off" name="idade" id="idade" type="text" disabled>
                    </div>
                    <fieldset class="fieldset-raca-cor" id="fieldset-raca-cor">
                        <legend>Raça/Cor</legend>
                        <div class="input-raca-cor">
                            <input autocomplete="off" id="radio-branca" name="raça-cor" type="radio" value="branca">
                            <label for="radio-branca">Branca</label>

                            <input autocomplete="off" id="radio-preta" name="raça-cor" type="radio" value="preta">
                            <label for="radio-preta">Preta</label>

                            <input autocomplete="off" id="radio-parda" name="raça-cor" type="radio" value="parda">
                            <label for="radio-parda">Parda</label>

                            <input autocomplete="off" id="radio-amarela" name="raça-cor" type="radio" value="amarela">
                            <label for="radio-amarela">Amarela</label>

                            <input autocomplete="off" id="radio-indigena-etinia" name="raça-cor" type="radio" value="indigena-etinia">
                            <label for="radio-indigena-etinia">Indígena/Etinia</label>

                            <input autocomplete="off" id="input-text" name="raça-cor" type="text" disabled>
                        </div>
                    </fieldset>
                </div>
                <div class="line-div">
                    <h2 class="line-div-title">Dados Residenciais</h2>
                </div>
                <div class="ln">
                    <div class="input-cep">
                        <label for="cep">CEP</label>
                        <input autocomplete="off" name="cep" id="cep" type="cep">
                    </div>
                    <div class="input-uf-mulher">
                        <label for="uf-mulher">UF</label>
                        <input autocomplete="off" name="uf-mulher" id="uf-mulher" type="text" maxlength="2">
                    </div>
                    <div class="input-municipio-mulher">
                        <label for="municipio-mulher">Município</label>
                        <input autocomplete="off" name="municipio-mulher" id="municipio-mulher" type="text">
                    </div>
                    <div class="input-codigo-municipio">
                        <label for="codigo-municipio">Código do Município</label>
                        <input autocomplete="off" name="codigo-municipio" id="codigo-municipio" type="text">
                    </div>
                </div>
                <div class="ln">
                    <div class="input-logradouro">
                        <label for="logradouro">Logradouro</label>
                        <input autocomplete="off" id="logradouro" name="logradouro" type="text">
                    </div>
                </div>
                <div class="ln">
                    <div class="input-complemento">
                        <label for="complemento">Complemento</label>
                        <input autocomplete="off" id="complemento" name="complemento" type="text">
                    </div>
                    <div class="input-numero"> <!-- RESTAURADO: Div para agrupar o label e input do número -->
                        <label for="numero">Número</label>
                        <input autocomplete="off" id="numero" name="numero" type="text">
                    </div>
                </div>
                <div class="ln">
                    <div class="input-bairro">
                        <label for="bairro">Bairro</label>
                        <input autocomplete="off" id="bairro" name="bairro" type="text">
                    </div>
                    <div class="input-ddd">
                        <label for="ddd">DDD</label>
                        <input autocomplete="off" id="ddd" name="ddd" type="text">
                    </div>
                    <div class="input-telefone-celular">
                        <label for="telefone-celular">Telefone/Celular</label>
                        <input autocomplete="off" id="telefone-celular" name="telefone-celular" type="tel">
                    </div>
                </div>
                <div class="ln">
                    <div class="input-ponto-referencia">
                        <label for="ponto-referencia">Ponto de Referência</label>
                        <input autocomplete="off" id="ponto-referencia" name="ponto-referencia" type="text">
                    </div>
                </div>
                <div class="ln">
                    <fieldset class="fieldset-escolariedade">
                        <legend>Escolariedade:</legend>
                        <div class="input-escolariedade">
                            <input autocomplete="off" id="radio-analfabeto" name="escolariedade" type="radio" value="analfabeto">
                            <label for="radio-analfabeto">Analfabeto</label>

                            <input autocomplete="off" id="radio-ens-fund-incom" name="escolariedade" type="radio" value="ensino-fundamental-incompleto">
                            <label for="radio-ens-fund-incom">Ensino Fundamental Incompleto</label>

                            <input autocomplete="off" id="radio-ens-fund-compl" name="escolariedade" type="radio" value="ensino-fundamental-completo">
                            <label for="radio-ens-fund-compl">Ensino Fundamental Completo</label>

                            <input autocomplete="off" id="radio-ens-medi-compl" name="escolariedade" type="radio" value="ensino-medio-completo">
                            <label for="radio-ens-medi-compl">Ensino Médio Completo</label>

                            <input autocomplete="off" id="radio-ens-super-compl" name="escolariedade" type="radio" value="ensino-superior-completo">
                            <label for="radio-ens-super-compl">Ensino Superior Completo</label>
                        </div>
                    </fieldset>
                </div>
            </form>
        </div>
    `;

    const cartSus = shadow.querySelector('#cart-sus');
    const cpf = shadow.querySelector('#cpf');
    const cep = shadow.querySelector('#cep');
    const uf = shadow.querySelector('#uf-mulher');
    const municipio = shadow.querySelector('#municipio-mulher');
    const codIBGE = shadow.querySelector('#codigo-municipio');
    const logradouro = shadow.querySelector('#logradouro');
    const bairro = shadow.querySelector('#bairro');
    const bornDate = shadow.querySelector('#date');
    const age = shadow.querySelector('#idade');
    const nProtocol = shadow.querySelector('#n-protocolo');
    const compName = shadow.querySelector('#nome-completo');
    const radioIndigenaEtinia = shadow.querySelector('#radio-indigena-etinia');
    const racaInputText = shadow.querySelector('#input-text');
    const fieldsetRacaCor = shadow.querySelector('#fieldset-raca-cor');
    const ddd = shadow.querySelector('#ddd');
    const telefoneCelular = shadow.querySelector('#telefone-celular');

    // Mapeamento dos inputs para fácil acesso
    const inputs = {
        'nome-completo': shadow.querySelector('#nome-completo'),
        'nome-mae': shadow.querySelector('#nome-mae'),
        'apelido-mulher': shadow.querySelector('#apelido-mulher'),
        'cpf': shadow.querySelector('#cpf'),
        'date': shadow.querySelector('#date'),
        'logradouro': shadow.querySelector('#logradouro'),
        'numero': shadow.querySelector('#numero'),
        'complemento': shadow.querySelector('#complemento'),
        'bairro': shadow.querySelector('#bairro'),
        'municipio-mulher': shadow.querySelector('#municipio-mulher'),
        'uf-mulher': shadow.querySelector('#uf-mulher'),
        'cep': shadow.querySelector('#cep'),
        'ddd': shadow.querySelector('#ddd'),
        'telefone-celular': shadow.querySelector('#telefone-celular'),
        'ponto-referencia': shadow.querySelector('#ponto-referencia'),
        'cart-sus': shadow.querySelector('#cart-sus'),
        'nacionalidade': shadow.querySelector('#nacionalidade'),
        'input-text': shadow.querySelector('#input-text'), // Campo para etnia
        'idade': shadow.querySelector('#idade') // Campo de idade
    };

    cep.addEventListener('change', autoFill_EdressByCEP);
    bornDate.addEventListener('change', ageFill);
    nProtocol.addEventListener('input', (e) => autoFill_InputToSessionStorageeValue(e, 'numero-protocolo'));
    compName.addEventListener('input', (e) => autoFill_InputToSessionStorageeValue(e, 'profile-name'));
    fieldsetRacaCor.addEventListener('input', textAbleLogic);
    cpf.addEventListener('change', handleCpfBlur); // Adicionado evento de blur ao CPF

    cpf.addEventListener('input', cpf_Mask);
    cartSus.addEventListener('input', cartSus_Mask);
    cep.addEventListener('input', cep_Mask);
    bornDate.addEventListener('input', date_Mask);
    ddd.addEventListener('input', ddd_Mask);
    telefoneCelular.addEventListener('input', cel_Mask);
    nProtocol.addEventListener('input', inputProtocol_Mask)

    function autoFill_InputToSessionStorageeValue(e, sessionStorageKey) {
        const inputValue = e.target.value;
        sessionStorage.setItem(sessionStorageKey, inputValue);
        const storageEvent = new CustomEvent("sessionStorageUpdated", {
                detail: { key: sessionStorageKey, value: inputValue },
                bubbles: true,
                composed: true
        });
        document.dispatchEvent(storageEvent);
    }

    // Função para preencher o formulário com os dados do paciente
    async function fillFormWithPatientData(patientData) {
        inputs['nome-completo'].value = patientData.nome_completo || '';
        inputs['nome-mae'].value = patientData.nome_mae || '';
        inputs['apelido-mulher'].value = patientData.apelido || '';
        
        // Formatar data de nascimento
        if (patientData.data_nascimento) {
            const dateObj = new Date(patientData.data_nascimento);
            const day = String(dateObj.getDate()).padStart(2, '0');
            const month = String(dateObj.getMonth() + 1).padStart(2, '0');
            const year = dateObj.getFullYear();
            inputs['date'].value = `${day}/${month}/${year}`;
            ageFill(); // Recalcula a idade após preencher a data de nascimento
        } else {
            inputs['date'].value = '';
        }

        inputs['logradouro'].value = patientData.logradouro || '';
        inputs['numero'].value = patientData.numero || '';
        inputs['complemento'].value = patientData.complemento || '';
        inputs['bairro'].value = patientData.bairro || '';
        inputs['municipio-mulher'].value = patientData.municipio || '';
        inputs['uf-mulher'].value = patientData.uf || '';
        
        inputs['cep'].value = patientData.cep ? patientData.cep.replace(/(\d{5})(\d)/, "$1-$2") : ''; // Aplica máscara
        
        // Dividir telefone em DDD e número
        if (patientData.telefone) {
            const tel = String(patientData.telefone).replace(/\D/g, ''); // Limpa o telefone
            if (tel.length >= 2) {
                inputs['ddd'].value = `(${tel.substring(0, 2)})`; // Aplica máscara DDD
                inputs['telefone-celular'].value = tel.substring(2).replace(/(\d{5})(\d{4})/, "$1-$2"); // Aplica máscara celular
            } else {
                inputs['ddd'].value = tel;
                inputs['telefone-celular'].value = '';
            }
        } else {
            inputs['ddd'].value = '';
            inputs['telefone-celular'].value = '';
        }

        inputs['ponto-referencia'].value = patientData.ponto_referencia || '';
        inputs['cart-sus'].value = patientData.cartao_sus ? patientData.cartao_sus.replace(/(\d{3})(\d{4})(\d{4})(\d{4})/, "$1 $2 $3 $4") : ''; // Aplica máscara
        inputs['nacionalidade'].value = patientData.nacionalidade || '';

        // Preencher raca_cor (radio buttons e campo de texto)
        const racaCorRadios = shadow.querySelectorAll('input[name="raça-cor"]');
        let racaCorFound = false;
        racaCorRadios.forEach(radio => {
            let radioValue = radio.value;
            let etniaValue = '';

            // Se for indígena, verifica se o valor da API corresponde e extrai a etnia
            if (patientData.raca_cor && patientData.raca_cor.startsWith('indigena-etinia:')) {
                radioValue = 'indigena-etinia';
                etniaValue = patientData.raca_cor.split(':')[1] || '';
            }

            if (radioValue === patientData.raca_cor) {
                radio.checked = true;
                racaCorFound = true;
            } else if (radio.value === 'indigena-etinia' && patientData.raca_cor && patientData.raca_cor.startsWith('indigena-etinia:')) {
                radio.checked = true;
                inputs['input-text'].value = etniaValue;
                inputs['input-text'].disabled = false;
                racaCorFound = true;
            }
        });
        // Se a raça/cor da API não corresponder a nenhum rádio, desmarca todos e desabilita o campo de etnia
        if (!racaCorFound) {
            racaCorRadios.forEach(radio => radio.checked = false);
            inputs['input-text'].value = '';
            inputs['input-text'].disabled = true;
        }


        // Preencher escolaridade (radio buttons)
        const escolaridadeRadios = shadow.querySelectorAll('input[name="escolariedade"]');
        escolaridadeRadios.forEach(radio => {
            if (radio.value === patientData.escolaridade) {
                radio.checked = true;
            } else {
                radio.checked = false;
            }
        });

        const storageEvent = new CustomEvent("sessionStorageUpdated", {
                detail: { key: "profile-name", value: inputs['nome-completo'].value },
                bubbles: true,
                composed: true
        });
        document.dispatchEvent(storageEvent);

        sessionStorage.setItem("profile-name", inputs['nome-completo'].value)
    };

    // Função para lidar com o evento de 'blur' no campo CPF
    async function handleCpfBlur() {
        const rawCpf = cpf.value.replace(/\D/g, ''); // Remove formatação

        if (rawCpf.length === 11) {
            try {
                const patientData = await buscarPacientePeloCPF(rawCpf);
                fillFormWithPatientData(patientData);
                console.log("Paciente encontrado e formulário preenchido!");
            } catch (error) {
                console.error("Erro ao buscar paciente:", error);
                // Verifica se o erro é um 404 (Not Found)
                if (error.message.includes("404") || error.message.includes("Erro HTTP: 404")) {
                    console.log("Paciente não encontrado. Não foram feitas alterações no formulário.");
                } else {
                    console.log("Erro ao buscar paciente: " + error.message + ". Não foram feitas alterações no formulário.");
                }
                // Nenhuma ação para limpar ou desabilitar inputs aqui, conforme solicitado
            }
        } else if (rawCpf.length > 0) {
            console.log("CPF inválido. Por favor, insira um CPF com 11 dígitos.");
            // Nenhuma ação para limpar ou desabilitar inputs aqui, conforme solicitado
        } else {
            // CPF vazio, nenhuma ação de limpeza, conforme solicitado
        }

        
    };

    fillUbsInfo(shadow)
    async function fillUbsInfo(shadow) {
        async function loadUbsConfig() {
            try {
                const response = await fetch('/configs/ubs_config.json'); // Caminho para o arquivo JSON
                if (!response.ok) {
                    console.error(`Erro ao carregar ubs_config.json: ${response.status} ${response.statusText}`);
                    return null;
                }
                return await response.json();
            } catch (error) {
                console.error("Erro na leitura do arquivo de configuração da UBS:", error);
                return null;
            }
        }

        const cnesInput = shadow.querySelector('#cnes');
        const unidadeSaudeInput = shadow.querySelector('#unidade-de-saude');
        const municipioInput = shadow.querySelector('#municipio');
        const ufInput = shadow.querySelector('#uf');

        const inputsToManage = [
            { element: cnesInput, configKey: 'cnes', targetValue: null },
            { element: unidadeSaudeInput, configKey: 'ubs_name', targetValue: null }, // Mapeia para ubs_name no JSON
            { element: municipioInput, configKey: 'municipio', targetValue: null },
            { element: ufInput, configKey: 'uf', targetValue: null }
        ];

        const config = await loadUbsConfig();

        if (config) {
            // Preenche e gerencia o estado dos inputs
            inputsToManage.forEach(item => {
                const element = item.element;
                const configValue = config[item.configKey];

                if (element) {
                    if (configValue && String(configValue).trim() !== '') {
                        element.value = configValue;
                        element.disabled = true; // Desabilita se preenchido com sucesso do config
                    } else {
                        element.value = ''; // Limpa se o valor do config for vazio
                        element.disabled = false; // Habilita para preenchimento manual
                    }
                }
            });

        } else {   
            inputsToManage.forEach(item => {
                console.log(inputsToManage)
                if (item.element) {
                    item.element.value = ''; // Garante que estejam vazios
                    item.element.disabled = false; // Habilita para preenchimento manual
                }
            });
            console.warn("Não foi possível carregar as configurações da UBS. Campos de UBS habilitados para preenchimento manual.");
        }
    }

    function ageFill() {
        if (bornDate.value === "") return;

        const bornDateValue = bornDate.value.split('/');
        const dateNow = new Date();
        const yearNow = dateNow.getFullYear();
        const monthNow = dateNow.getMonth() + 1;
        const dayNow = dateNow.getDate();
        const [dayBorn, monthBorn, yearBorn] = bornDateValue.map(Number);

        let ageCalc = yearNow - yearBorn;
        if (monthNow < monthBorn || (monthNow === monthBorn && dayNow < dayBorn)) ageCalc--;

        age.value = ageCalc;
    }

    async function autoFill_EdressByCEP() {
        const URL_CEP_API = `https://brasilapi.com.br/api/cep/v1/${cep.value.replace(/\D/g, '')}`; // Limpa o CEP para a API
        const respApiCEP = await fetch(URL_CEP_API);
        if (respApiCEP.status !== 200) {
            console.log("CEP não encontrado ou inválido.");
            return;
        }

        const addressInfo = await respApiCEP.json();
        if (!addressInfo.state) return;

        const URL_IBGE_API = `https://brasilapi.com.br/api/ibge/municipios/v1/${addressInfo.state}?providers=dados-abertos-br,gov,wikipedia`;
        const respApiIBGE = await fetch(URL_IBGE_API);

        if (respApiIBGE.status === 200) {
            const ibgeList = await respApiIBGE.json();
            const i = IBGE_binSearsh(addressInfo.city, ibgeList);
            if (i !== -1) codIBGE.value = ibgeList[i].codigo_ibge;
        }

        uf.value = addressInfo.state;
        municipio.value = addressInfo.city;
        logradouro.value = addressInfo.street;
        bairro.value = addressInfo.neighborhood;
    }

    function normalize(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
    }

    function IBGE_binSearsh(city, IBGElist) {
        city = normalize(city)
        let min = 0, max = IBGElist.length - 1;
        while (min <= max) {
            let mid = (min + max) >> 1;
            if (normalize(IBGElist[mid].nome) == city) return mid;
            else if (city > normalize(IBGElist[mid].nome)) min = mid + 1;
            else max = mid - 1;
        }
        return -1;
    }

    function textAbleLogic() {
        racaInputText.disabled = !radioIndigenaEtinia.checked;
    }

    function getPacienteData() {
        const shadow = this.shadowRoot;

        const getValue = id => shadow.querySelector(`#${id}`)?.value?.trim() || "";
        const getOptionalValue = id => {
            const val = shadow.querySelector(`#${id}`)?.value?.trim();
            return val === "" ? null : val;
        };

        const nomeCompleto = getValue("nome-completo");
        const nomeMae = getValue("nome-mae");
        const apelido = getValue("apelido-mulher");
        const cpf = getValue("cpf");
        const dataNascimento = getValue("date");
        const logradouro = getValue("logradouro");
        const numero = getValue("numero");
        const complemento = getOptionalValue("complemento");
        const bairro = getValue("bairro");
        const municipio = getValue("municipio-mulher");
        const uf = getValue("uf-mulher");
        const cep = getValue("cep").replace(/\D/g, "");
        const dddVal = getValue("ddd").replace(/\D/g, "");
        const celularVal = getValue("telefone-celular").replace(/\D/g, "");
        const telefone = `${dddVal}${celularVal}`;
        const pontoReferencia = getValue("ponto-referencia");
        const escolaridade = shadow.querySelector('input[name="escolariedade"]:checked')?.value || "";
        const cartaoSus = getValue("cart-sus").replace(/\D/g, "");
        const nacionalidade = getValue("nacionalidade");

        const radioRacaCor = shadow.querySelector('input[name="raça-cor"]:checked');
        let racaCor = "";
        if (radioRacaCor) {
            if (radioRacaCor.value === "indigena-etinia") {
            const etnia = getValue("input-text");
            racaCor = `indigena-etinia:${etnia}`;
            } else {
            racaCor = radioRacaCor.value;
            }
        }

        const [day, month, year] = dataNascimento.split('/');
        // Garante o formato 'YYYY-MM-DD' para a API Go
        const dataNascimentoFormatada = dataNascimento ? `${year}-${month}-${day}T00:00:00Z` : '';


        const Fcpf = cpf.replace(/[\s.-]/g, '')

        // Gera a senha: 3 primeiras letras do nome (minúsculas) + 5 primeiros dígitos do CPF
        const senha = (nomeCompleto.substring(0, 3).toLowerCase() + Fcpf.substring(0, 5));

        return {
            nome_completo: nomeCompleto,
            nome_mae: nomeMae,
            apelido: apelido,
            cpf: Fcpf,
            data_nascimento: dataNascimentoFormatada,
            logradouro: logradouro,
            numero: numero,
            complemento: complemento,
            bairro: bairro,
            municipio: municipio,
            uf: uf,
            cep: cep,
            telefone: telefone,
            ponto_referencia: pontoReferencia,
            escolaridade: escolaridade,
            cartao_sus: cartaoSus,
            raca_cor: racaCor,
            nacionalidade: nacionalidade,
            senha: senha,
            ubs_id: 1 // Valor fixo conforme o backend
        };
    }

    function getExameData() {
        const shadow = this.shadowRoot;

        const getValue = id => shadow.querySelector(`#${id}`)?.value?.trim() || "";

        const protocolo = getValue("n-protocolo");
        const prontuario = getValue("prontuario");

        return {
            protocolo: protocolo,
            prontuario: prontuario,
            paciente_id: 0 
        };
    }

    this.getPacienteData = getPacienteData;
    this.getExameData = getExameData;

    async function creatPatientAndExam() {
        const componente = document.querySelector("exam-starter-info");
        if (!componente) return;

        const cpfValue = shadow.querySelector("#cpf")?.value?.trim();
        const Fcpf = cpfValue.replace(/[\s.-]/g, '');

        if (!/^\d{11}$/.test(Fcpf)) {
            return "CPF inválido. Por favor, insira um CPF com 11 dígitos numéricos.";
        }
        
        const patientData = componente.getPacienteData();

        try {
            console.log(Fcpf)
            const paciente = await buscarPacientePeloCPF(Fcpf);
            console.log("Paciente encontrado. Tentando atualizar:", paciente.id, patientData);
            try {// Se chegou aqui, o paciente já existe. Tenta atualizar.
                await updatePatient(paciente.id, patientData); // Usa updatePatient
                console.log("Paciente atualizado com sucesso.");
            } catch (e2) {
                console.error("Erro ao atualizar dados do paciente:", e2);
                return "Erro ao atualizar dados do paciente: " + e2.message;
            }
            
        } catch (e) {
                try {
                    console.log("Paciente não encontrado. Registrando novo paciente:", patientData);
                    await registraPaciente(patientData);
                    console.log("Paciente registrado com sucesso.");
                } catch (e2) {
                    console.error("Erro ao registrar paciente:", e2);
                    return "Erro ao registrar paciente: " + e2.message;
                }
        }

        try {
            const exameData = componente.getExameData();
            console.log("Registrando exame para o CPF:", Fcpf, "Dados do exame:", exameData);
            await registraExame(exameData, Fcpf);
            console.log("Exame registrado com sucesso.");
        } catch (e) {
            console.error("Erro ao registrar exame:", e);
            return "Erro ao registrar exame: " + e.message;
        }
        
        return null;
    }

    function validateFormFields(shadowRoot) {
        const errors = [];

        const nProtocoloInput = shadowRoot.querySelector('#n-protocolo');
        const prontuarioInput = shadowRoot.querySelector('#prontuario');

        if (nProtocoloInput && nProtocoloInput.value.trim().length !== nProtocoloInput.maxLength) {
            errors.push(`O campo "N° Protocolo" deve ser preenchido com ${nProtocoloInput.maxLength} caracteres.`);
        }
        if (prontuarioInput && prontuarioInput.value.trim().length !== prontuarioInput.maxLength) {
            errors.push(`O campo "Prontuário" deve ser preenchido com ${prontuarioInput.maxLength} caracteres.`);
        }

        const requiredFields = shadowRoot.querySelectorAll('input[required], textarea[required], select[required]');

        requiredFields.forEach(field => {
            // Ignora campos desabilitados, pois não são esperados para preenchimento
            if (field.disabled) {
                return;
            }

            let isFieldValid = true;
            let fieldName = field.previousElementSibling ? field.previousElementSibling.textContent.replace(' *', '').trim() : field.placeholder || field.id;
            
            if (fieldName === field.id && field.placeholder) {
                fieldName = field.placeholder;
            } else if (fieldName === field.id) {
                fieldName = `Campo ${field.id}`;
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
                if (!field.checked) {
                    isFieldValid = false;
                    errors.push(`O campo "${fieldName}" é obrigatório e deve ser marcado.`);
                }
            } else if (field.tagName === 'SELECT') {
                if (!field.value || field.value.trim() === '') {
                    isFieldValid = false;
                    errors.push(`Selecione uma opção para "${fieldName}".`);
                }
            } else {
                if (!field.value || field.value.trim() === '') {
                    isFieldValid = false;
                    errors.push(`O campo "${fieldName}" é obrigatório.`);
                }
            }
        });

        if (errors.length > 0) {
            alert("Por favor, corrija os seguintes erros:\n\n" + errors.join("\n"));
            return false;
        }

        return true;
    }

    document.addEventListener("getFormData", async () => {
        if (!validateFormFields(shadow)) {
            return; // Se a validação falhar, interrompe a execução
        }
        
        const err = await creatPatientAndExam();
        if (err != null){
            console.log("Erro ao registrar paciente/exame: "+ err)
            alert(err); // Exibe o erro para o usuário
            return
        }

        window.location.replace("/main/usuario/exame/1")
    }); 


// Masks
    function inputProtocol_Mask(e) {
        let v = e.target.value.replace(/\D/g, '');
        e.target.maxLength = 14;
        e.target.value = v;
    }

    function cartSus_Mask(e) {
        let v = e.target.value.replace(/\D/g, '');
        v = v.replace(/(\d{3})(\d)/, "$1 $2");
        v = v.replace(/(\d{4})(\d)/g, "$1 $2");
        e.target.maxLength = 18;
        e.target.value = v;
    }

    function cpf_Mask(e) {
        let v = e.target.value.replace(/\D/g, '');
        v = v.replace(/(\d{3})(\d)/, "$1.$2");
        v = v.replace(/(\d{3})(\d)/, "$1.$2");
        v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        e.target.maxLength = 14;
        e.target.value = v;
    }

    function cep_Mask(e) {
        let v = e.target.value.replace(/\D/g, '');
        v = v.replace(/(\d{5})(\d)/, "$1-$2");
        e.target.maxLength = 9;
        e.target.value = v;
    }

    function date_Mask(e) {
        let v = e.target.value.replace(/\D/g, '');
        v = v.replace(/(\d{2})(\d)/, "$1/$2");
        v = v.replace(/(\d{2})(\d)/, "$1/$2");
        e.target.maxLength = 10;
        e.target.value = v;
    }

    function ddd_Mask(e) {
        let v = e.target.value.replace(/\D/g, '');
        v = v.replace(/(\d{1,2})/, "($1)");
        e.target.maxLength = 4;
        e.target.value = v;
    }

    function cel_Mask(e) {
        let v = e.target.value.replace(/\D/g, '');
        v = v.replace(/(\d)(\d{4})$/, "$1-$2");
        v = v.replace(/(\d)(\d{4})/, "$1 $2");
        e.target.maxLength = 11;
        e.target.value = v;
    }
  } 
}

if (!customElements.get('exam-starter-info')) {
    customElements.define('exam-starter-info', ExamLayoutStarterInfo);
}
