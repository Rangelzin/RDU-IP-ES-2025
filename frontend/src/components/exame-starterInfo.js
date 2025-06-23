import { registraPaciente } from "/app/creatPatient.js";
import { buscarPacientePeloCPF } from "/app/getPatientCPF.js";
import { registraExame } from "/app/creatExame.js";


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
                        <input maxlength="2" autocomplete="off" name="uf" id="uf" type="text" value="GO" disabled>
                    </div>
                    <div class="input-cnes">
                        <label for="cnes ">CNES da unidade de Saúde</label>
                        <input autocomplete="off" name="cnes" id="cnes" type="text" value="6423434" disabled>
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
                        <input autocomplete="off" name="unidade-de-saude" id="unidade-de-saude" type="text" value="TRS TERAPIA RENAL SUBSTITUTIVA" disabled>
                    </div>
                </div>
                <div class ="ln">
                    <div class="input-municipio">
                        <label for="municipio ">Município</label>
                        <input autocomplete="off" name="municipio" id="municipio" type="text" value="Goiânia" disabled>
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
                    <div class="input-numero">
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
    const lorgadouro = shadow.querySelector('#logradouro');
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

    cep.addEventListener('change', autoFill_EdressByCEP);
    bornDate.addEventListener('change', ageFill);
    nProtocol.addEventListener('input', (e) => autoFill_InputToSessionStorageeValue(e, 'numero-protocolo'));
    compName.addEventListener('input', (e) => autoFill_InputToSessionStorageeValue(e, 'profile-name'));
    fieldsetRacaCor.addEventListener('input', textAbleLogic);

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
        const URL_CEP_API = `https://brasilapi.com.br/api/cep/v1/${cep.value}`;
        const respApiCEP = await fetch(URL_CEP_API);
        if (respApiCEP.status !== 200) return;

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
        lorgadouro.value = addressInfo.street;
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
        const ddd = getValue("ddd").replace(/\D/g, "");
        const celular = getValue("telefone-celular").replace(/\D/g, "");
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

        const [dia, mes, ano] = dataNascimento.split('/');
        const dataNascimentoFormatada = `${ano}-${mes}-${dia}T00:00:00Z`;

        const Fcpf = cpf.replace(/[\s.-]/g, '')

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
            telefone: `${ddd}${celular}`,
            ponto_referencia: pontoReferencia,
            escolaridade: escolaridade,
            cartao_sus: cartaoSus,
            raca_cor: racaCor,
            nacionalidade: nacionalidade,
            ubs_id: 1
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

        const cpf = shadow.querySelector("#cpf")?.value?.trim();
        const Fcpf = cpf.replace(/[\s.-]/g, '');

        try {
            if (!/^\d{11}$/.test(Fcpf)) return;
            await buscarPacientePeloCPF(Fcpf);
        } catch (e) {
            const patientData = componente.getPacienteData();
            try {
                await registraPaciente(patientData);
                await buscarPacientePeloCPF(Fcpf);
            } catch (e2) {
                return e2.message;
            }
        }
        
        try {
            const exame = componente.getExameData()
            registraExame(exame, Fcpf)
        } catch (e) {
            return e.message
        }
        
        return null;
    }

    document.addEventListener("getFormData", async () => {
        
        const err = await creatPatientAndExam();
        if (err != null){
            console.log("Erro ao registrar paciente: "+ err)
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


