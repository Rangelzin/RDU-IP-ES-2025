
var inputs = document.querySelectorAll('input[type="text"]');

var cartSus = document.querySelector('#cart-sus');
var cpf = document.querySelector('#cpf');
var cep = document.querySelector('#cep');
var uf = document.querySelector('#uf-mulher');
var municipio = document.querySelector('#municipio-mulher');
var codIBGE = document.querySelector('#codigo-municipio');
var lorgadouro = document.querySelector('#logradouro');
var bairro = document.querySelector('#bairro');
var bornDate = document.querySelector('#date');
var age = document.querySelector('#idade');
var nProtocol = document.querySelector('#n-protocolo');
var compName = document.querySelector('#nome-completo');
var radioIndigenaEtinia = document.querySelector('#radio-indigena-etinia');
var racaInputText = document.querySelector('#input-text');
var fieldsetRacaCor = document.querySelector('#fieldset-raca-cor');
var ddd = document.querySelector('#ddd');
var telefoneCelular = document.querySelector('#telefone-celular');

cep.addEventListener('change', autoFill_EdressByCEP);
bornDate.addEventListener('change', ageFill);
nProtocol.addEventListener('input', function(e){autoFill_InputToTextValue(e, '#text-n-protocolo')});
compName.addEventListener('input', function(e){autoFill_InputToTextValue(e, '#profile-name')});
fieldsetRacaCor.addEventListener('input', textAbleLogic);

nProtocol.addEventListener('input', NProtocol_Mask);
cpf.addEventListener('input', function(e){cpf_Mask(e)});
cartSus.addEventListener('input', function(e){cartSus_Mask(e)});
cep.addEventListener('input', function(e){cep_Mask(e)});
bornDate.addEventListener('input', function(e){date_Mask(e)});
ddd.addEventListener('input', function(e){ddd_Mask(e)});
telefoneCelular.addEventListener('input', function(e){cel_Mask(e)});

function autoFill_InputToTextValue(e, textValueId){
    let textValue = document.querySelector(textValueId);
    textValue.textContent = e.target.value;
}

function ageFill(){
    if (bornDate.value == "") {
        console.log('born date value is nil')
    }

    let bornDateValue = bornDate.value.split('/');
    let dateNow = new Date();

    monthNow = dateNow.getMonth()+1;
    yearNow = dateNow.getFullYear();
    dayNow = dateNow.getDate();
    monthBorn = bornDateValue[1];
    yearBorn = bornDateValue[2];
    dayBorn = bornDateValue[0];

    ageCalc = parseInt(yearNow) - parseInt(yearBorn);
    if (monthNow <  monthBorn || monthNow ==  monthBorn && dayNow <= dayBorn){
        ageCalc--
    }

    age.value = ageCalc
}

async function autoFill_EdressByCEP(){
    let addressInfo;
    let ibgeCode;
    let ibgeList;

    const URL_CEP_API = "https://brasilapi.com.br/api/cep/v1/"+cep.value;
    const respApiCEP = await fetch(URL_CEP_API);

    if (respApiCEP.status != 200){
        console.log('error in cep api response: '+respApiCEP.status)
        return
    }

    addressInfo = await respApiCEP.json();

    if (addressInfo.state == ''){
        console.log('error state valaue is nil')
    }else {
        const URL_IBGE_API = "https://brasilapi.com.br/api/ibge/municipios/v1/"+addressInfo.state+"?providers=dados-abertos-br,gov,wikipedia";
        const respApiIBGE = await fetch(URL_IBGE_API);

        if (respApiIBGE.status != 200){
            console.log('error in ibge api response: '+respApiIBGE.status);
        }else{
            ibgeList = await respApiIBGE.json();
            i = IBGE_binSearsh(addressInfo.city.toUpperCase(), ibgeList)
            if (i == -1){
                console.log('erro na busca do múnicipio na lista do ibge')
            }else{
                ibgeCode = ibgeList[i].codigo_ibge;
            }
            
        }


    }

    uf.value = addressInfo.state;
    municipio.value = addressInfo.city;
    if(ibgeCode){codIBGE.value = ibgeCode;}
    lorgadouro.value = addressInfo.street;
    bairro.value = addressInfo.neighborhood;
}

function IBGE_binSearsh(city, IBGElist) {
    let min = 0;
    let max = IBGElist.length - 1;

    while (min <= max) {
        let mid = (min + max) >> 1; // mesmo que (min + max)/2

        if (IBGElist[mid].nome == city) {
            return mid;
        } else if (city > IBGElist[mid].nome) {
            min = mid + 1;
        } else {
            max = mid - 1;
        }
    }

    return -1
}

function textAbleLogic(){
    if (radioIndigenaEtinia.checked == true){
        racaInputText.disabled = false
    }else {
        racaInputText.disabled = true
    }
}

function imageFill(){
    let img = document.querySelector('#profile-img')

    img.src = "../assets/img/defaulPerfil_IMG/perfil_02.svg"


}

// masks
function NProtocol_Mask(){
    let textNProtocol = document.querySelector('#text-n-protocolo');

    repeat = 14 - textNProtocol.textContent.length;

    textNProtocol.textContent = textNProtocol.textContent+'0'.repeat(repeat);
}

function cartSus_Mask(e){
    let v = e.target.value;

    v=v.replace(/\D/g,"");
    v=v.replace(/(\d{3})(\d)/,"$1 $2");
    v=v.replace(/(\d{4})(\d)/,"$1 $2");
    v=v.replace(/(\d{4})(\d)/,"$1 $2");
    v=v.replace(/(\d{4})(\d)/,"$1 $2");
    e.target.maxLength = 18;

    e.target.value = v;
}

function cpf_Mask(e){
    let v = e.target.value;

    v=v.replace(/\D/g,"");                    //Remove tudo o que não é dígito
    v=v.replace(/(\d{3})(\d)/,"$1.$2");       //Coloca um ponto entre o terceiro e o quarto dígitos
    v=v.replace(/(\d{3})(\d)/,"$1.$2");       //Coloca um ponto entre o terceiro e o quarto dígitos (para o segundo bloco de números)
    v=v.replace(/(\d{3})(\d{1,2})$/,"$1-$2"); //Coloca um hífen entre o terceiro e o quarto dígitos
    e.target.maxLength = 14;

    e.target.value = v;
}

function cep_Mask(e){
    let v = e.target.value;

    v=v.replace(/\D/g,"");
    v=v.replace(/(\d{5})(\d)/,"$1-$2");
    e.target.maxLength = 9;

    e.target.value = v;
}

function date_Mask(e){
    let v = e.target.value;

    v=v.replace(/\D/g,"");
    v=v.replace(/(\d{2})(\d)/,"$1/$2");
    v=v.replace(/(\d{2})(\d)/,"$1/$2");

    e.target.maxLength = 10;

    e.target.value = v;
}

function ddd_Mask(e){
    let v = e.target.value;

    v=v.replace(/\D/g,"");
    v=v.replace(/(\d{1,2})/,"($1)");

    e.target.maxLength = 4;

    e.target.value = v;
}

function cel_Mask(e){
    let v = e.target.value;

    v=v.replace(/\D/g,"");
    v=v.replace(/(\d)(\d{4})$/,"$1-$2");
    v=v.replace(/(\d)(\d{4})/,"$1 $2");

    e.target.maxLength = 11;

    e.target.value = v;
}
