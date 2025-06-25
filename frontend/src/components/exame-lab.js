import { jwtDecode } from '/src/utils/jwtDecode.js';
import { registrarEtapaResult } from '/app/postResult.js';
import { registrarEtapaLab } from '/app/postLab.js';


class labLayout extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    
    shadow.innerHTML = `
        <link rel="stylesheet" href="/assets/css/resultado.css">

        <div class="exm-page">
            <div class="exm-page2">
                    <form action="" method="post">
                        <div class="box-div">
                            <h2 class="box-div-title">IDENTIFICAÇÃO DO LABORATÓRIO</h2>
                        </div>
                        
                        <fieldset class="fieldset-identificacao-lab">
                            <div class="two-column-layout-lab"> 
                                <div class="column-left-lab">
                                    <div class="ln">
                                        <div class="input-laboratorio-cnes">
                                            <label for="laboratorio-cnes">CNES do Laboratório<span class="required-asterisk">*</span></label>
                                            <input required autocomplete="off" name="laboratorio_cnes" id="laboratorio-cnes" type="text" maxlength="14">
                                        </div>
                                    </div>
                                    <div class="ln">
                                        <div class="input-laboratorio-nome">
                                            <label for="laboratorio-nome">Nome do Laboratório<span class="required-asterisk">*</span></label>
                                            <input required autocomplete="off" name="laboratorio_nome" id="laboratorio-nome" type="text" maxlength="21">
                                        </div>
                                    </div>
                                </div><div class="column-right-lab">
                                    <div class="ln">
                                        <div class="input-numero-exame">
                                            <label for="numero-exame">Número do Exame<span class="required-asterisk">*</span></label>
                                            <input required autocomplete="off" name="numero_exame" id="numero-exame" type="text" maxlength="16">
                                        </div>
                                    </div>
                                    <div class="ln">
                                        <div class="input-recebido-em">
                                            <label for="recebido-em-dia">Recebido em:<span class="required-asterisk">*</span></label>
                                            <div class="date-inputs">
                                                <input required autocomplete="off" name="recebido_em_dia" id="recebido-em-dia" type="text" maxlength="2" placeholder="DD">
                                                <span class="date-separator">/</span>
                                                <input required autocomplete="off" name="recebido_em_mes" id="recebido-em-mes" type="text" maxlength="2" placeholder="MM">
                                                <span class="date-separator">/</span>
                                                <input required autocomplete="off" name="recebido_em_ano" id="recebido-em-ano" type="text" maxlength="4" placeholder="AAAA">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </form>
            </div>
            <form action="" method="post">
                <div class="box-div">
                    <h2 class="box-div-title">RESULTADO DO EXAME CITOPATOLÓGICO-COLO DO UTERO</h2>
                </div>

                <div class="fieldset-resultado-exame">
                    <div class="main-two-column-layout">
                        <div class="main-column-left">
                            <fieldset class="fieldset-group-section">
                                <legend>AVALIAÇÃO PRÉ-ANALÍTICA</legend>
                                <div class="group-content-vertical">
                                    <div class="ln">
                                        <div class="fieldset-subgroup">
                                            <legend>AMOSTRA REJEITADA POR:</legend>
                                            <div class="input-amostra-rejeitada input-option-group">
                                                <div class="option-row">
                                                    <input autocomplete="off" id="amostra-rejeitada-ausencia-erro" name="amostra_rejeitada" type="radio" value="ausencia_erro">
                                                    <label for="amostra-rejeitada-ausencia-erro">Ausência ou erro na identificação da lâmina, frasco ou formulário</label>
                                                </div>
                                                <div class="option-row">
                                                    <input autocomplete="off" id="amostra-rejeitada-lamina-danificada" name="amostra_rejeitada" type="radio" value="lamina_danificada">
                                                    <label for="amostra-rejeitada-lamina-danificada">Lâmina danificada ou ausente</label>
                                                </div>
                                                <div class="option-row-with-input">
                                                    <div class="option-label-wrapper">
                                                        <input autocomplete="off" id="amostra-rejeitada-causas-alheias" name="amostra_rejeitada" type="radio" value="causas_alheias">
                                                        <label for="amostra-rejeitada-causas-alheias">Causas alheias ao laboratório; especificar:</label>
                                                    </div>
                                                    <input autocomplete="off" name="amostra_rejeitada_especificar_alheias" type="text" class="input-especificar">
                                                </div>
                                                <div class="option-row-with-input">
                                                    <div class="option-label-wrapper">
                                                        <input autocomplete="off" id="amostra-rejeitada-outras-causas" name="amostra_rejeitada" type="radio" value="outras_causas">
                                                        <label for="amostra-rejeitada-outras-causas">Outras causas, especificar:</label>
                                                    </div>
                                                    <input autocomplete="off" name="amostra_rejeitada_especificar_outras" type="text" class="input-especificar">
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="ln">
                                        <div class="fieldset-subgroup">
                                            <legend>EPITÉLIOS REPRESENTADOS NA AMOSTRA:<span class="required-asterisk">*</span></legend>
                                            <div class="input-epitelios-representados input-option-group">
                                                <div class="option-row">
                                                    <input required autocomplete="off" id="epitelios-escamoso" name="epitelios_representados" type="checkbox" value="escamoso">
                                                    <label for="epitelios-escamoso">Escamoso</label>
                                                </div>
                                                <div class="option-row">
                                                    <input autocomplete="off" id="epitelios-glandular" name="epitelios_representados" type="checkbox" value="glandular">
                                                    <label for="epitelios-glandular">Glandular</label>
                                                </div>
                                                <div class="option-row">
                                                    <input autocomplete="off" id="epitelios-metaplasico" name="epitelios_representados" type="checkbox" value="metaplasico">
                                                    <label for="epitelios-metaplasico">Metaplásico</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                        </div>

                        <div class="main-column-right">
                            <fieldset required class="fieldset-group-section">
                                <legend>ADEQUABILIDADE DO MATERIAL<span class="required-asterisk">*</span></legend>
                                <div class="group-content-vertical">
                                    <div class="ln">
                                        <div class="input-adequabilidade-material input-option-group">
                                            <div class="option-row">
                                                <input autocomplete="off" id="adequabilidade-satisfatoria" name="adequabilidade_material" type="radio" value="true">
                                                <label for="adequabilidade-satisfatoria">Satisfatória</label>
                                            </div>

                                            <div class="fieldset-subgroup">
                                                <legend>Insatisfatória para avaliação oncótica devido a:</legend>
                                                <div class="input-insatisfatoria-por input-option-group">
                                                    <div class="option-row">
                                                        <input required autocomplete="off" id="insatisfatoria-acelular" name="insatisfatoria_por" type="checkbox" value="acelular">
                                                        <label for="insatisfatoria-acelular">Material acelular ou hipocelular em menos de 10% do esfregaço</label>
                                                    </div>
                                                    <div class="option-row">
                                                        <input autocomplete="off" id="insatisfatoria-sangue" name="insatisfatoria_por" type="checkbox" value="sangue">
                                                        <label for="insatisfatoria-sangue">Sangue em mais de 75% do esfregaço</label>
                                                    </div>
                                                    <div class="option-row">
                                                        <input autocomplete="off" id="insatisfatoria-piocitos" name="insatisfatoria_por" type="checkbox" value="piocitos">
                                                        <label for="insatisfatoria-piocitos">Piócitos em mais de 75% do esfregaço</label>
                                                    </div>
                                                    <div class="option-row">
                                                        <input autocomplete="off" id="insatisfatoria-dessecamento" name="insatisfatoria_por" type="checkbox" value="dessecamento">
                                                        <label for="insatisfatoria-dessecamento">Artefatos de dessecamento em mais de 75% do esfregaço</label>
                                                    </div>
                                                    <div class="option-row">
                                                        <input autocomplete="off" id="insatisfatoria-contaminantes" name="insatisfatoria_por" type="checkbox" value="contaminantes">
                                                        <label for="insatisfatoria-contaminantes">Contaminantes externos em mais de 75% do esfregaço</label>
                                                    </div>
                                                    <div class="option-row">
                                                        <input autocomplete="off" id="insatisfatoria-superposicao" name="insatisfatoria_por" type="checkbox" value="superposicao">
                                                        <label for="insatisfatoria-superposicao">Intensa superposição celular em mais de 75% do esfregaço</label>
                                                    </div>
                                                    <div class="option-row-with-input">
                                                        <div class="option-label-wrapper">
                                                            <input autocomplete="off" id="insatisfatoria-outros" name="insatisfatoria_por" type="checkbox" value="outros">
                                                            <label for="insatisfatoria-outros">Outros, especificar</label>
                                                        </div>
                                                        <input autocomplete="off" name="insatisfatoria_por_especificar_outros" type="text" class="input-especificar">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>

                    <div class="major-horizontal-separator"></div>


                    <div class="main-two-column-layout">
                        <div class="main-column-left">
                            <fieldset class="fieldset-group-section">
                                <legend>DIAGNÓSTICO DESCRITIVO</legend>
                                <div class="group-content-vertical">
                                    <div class="ln">
                                        <div class="fieldset-subgroup">
                                            <legend>DENTRO DOS LIMITES DA NORMALIDADE NO MATERIAL EXAMINADO?</legend>
                                            <div class="input-dentro-limites-normalidade input-option-group horizontal-radio-group">
                                                <div class="option-row">
                                                    <input autocomplete="off" id="normalidade-sim" name="dentro_limites_normalidade" type="radio" value="true">
                                                    <label for="normalidade-sim">Sim</label>
                                                </div>
                                                <div class="option-row">
                                                    <input autocomplete="off" id="normalidade-nao" name="dentro_limites_normalidade" type="radio" value="false">
                                                    <label for="normalidade-nao">Não</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="ln">
                                        <div class="fieldset-subgroup">
                                            <legend>ALTERAÇÕES CELULARES BENIGNAS REATIVAS OU REPARATIVAS</legend>
                                            <div class="input-alteracoes-celulares-benignas input-option-group">
                                                <div class="option-row">
                                                    <input autocomplete="off" id="benignas-inflamacao" name="alteracao_celulas_benignas" type="checkbox" value="inflamacao">
                                                    <label for="benignas-inflamacao">Inflamação</label>
                                                </div>
                                                <div class="option-row">
                                                    <input autocomplete="off" id="benignas-metaplasia" name="alteracao_celulas_benignas" type="checkbox" value="metaplasia">
                                                    <label for="benignas-metaplasia">Metaplasia escamosa imatura</label>
                                                </div>
                                                <div class="option-row">
                                                    <input autocomplete="off" id="benignas-reparacao" name="alteracao_celulas_benignas" type="checkbox" value="reparacao">
                                                    <label for="benignas-reparacao">Reparação</label>
                                                </div>
                                                <div class="option-row">
                                                    <input autocomplete="off" id="benignas-atrofia" name="alteracao_celulas_benignas" type="checkbox" value="atrofia">
                                                    <label for="benignas-atrofia">Atrofia com inflamação</label>
                                                </div>
                                                <div class="option-row">
                                                    <input autocomplete="off" id="benignas-radiacao" name="alteracao_celulas_benignas" type="checkbox" value="radiacao">
                                                    <label for="benignas-radiacao">Radiação</label>
                                                </div>
                                                <div class="option-row-with-input">
                                                    <div class="option-label-wrapper">
                                                        <input autocomplete="off" id="benignas-outros" name="alteracao_celulas_benignas" type="checkbox" value="outros">
                                                        <label for="benignas-outros">Outros; especificar:</label>
                                                    </div>
                                                    <input autocomplete="off" name="alteracao_celulas_benignas_especificar_outros" type="text" class="input-especificar">
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="ln">
                                        <div class="fieldset-subgroup">
                                            <legend>MICROBIOLOGIA</legend>
                                            <div class="input-microbiologia input-option-group">
                                                <div class="option-row">
                                                    <input autocomplete="off" id="micro-lactobacillus" name="microbiologia" type="checkbox" value="lactobacillus">
                                                    <label for="micro-lactobacillus">Lactobacillus sp</label>
                                                </div>
                                                <div class="option-row">
                                                    <input autocomplete="off" id="micro-cocos" name="microbiologia" type="checkbox" value="cocos">
                                                    <label for="micro-cocos">Cocos</label>
                                                </div>
                                                <div class="option-row">
                                                    <input autocomplete="off" id="micro-chlamydia" name="microbiologia" type="checkbox" value="chlamydia">
                                                    <label for="micro-chlamydia">Sugestivo de Chlamydia sp</label>
                                                </div>
                                                <div class="option-row">
                                                    <input autocomplete="off" id="micro-actinomyces" name="microbiologia" type="checkbox" value="actinomyces">
                                                    <label for="micro-actinomyces">Actinomyces sp</label>
                                                </div>
                                                <div class="option-row">
                                                    <input autocomplete="off" id="micro-candida" name="microbiologia" type="checkbox" value="candida">
                                                    <label for="micro-candida">Candida sp</label>
                                                </div>
                                                <div class="option-row">
                                                    <input autocomplete="off" id="micro-trichomonas" name="microbiologia" type="checkbox" value="trichomonas">
                                                    <label for="micro-trichomonas">Trichomonas vaginalis</label>
                                                </div>
                                                <div class="option-row">
                                                    <input autocomplete="off" id="micro-herpes" name="microbiologia" type="checkbox" value="herpes">
                                                    <label for="micro-herpes">Efeito citopático compatível com vírus do grupo Herpes</label>
                                                </div>
                                                <div class="option-row">
                                                    <input autocomplete="off" id="micro-bacilos-supracitoplasmaticos" name="microbiologia" type="checkbox" value="bacilos_supracitoplasmaticos">
                                                    <label for="micro-bacilos-supracitoplasmaticos">Bacilos supracitoplasmáticos (sugestivos de Gardnerella/Mobiluncus)</label>
                                                </div>
                                                <div class="option-row">
                                                    <input autocomplete="off" id="micro-outros-bacilos" name="microbiologia" type="checkbox" value="outros_bacilos">
                                                    <label for="micro-outros-bacilos">Outros bacilos</label>
                                                </div>
                                                <div class="option-row-with-input">
                                                    <div class="option-label-wrapper">
                                                        <input autocomplete="off" id="micro-outros" name="microbiologia" type="checkbox" value="outros">
                                                        <label for="micro-outros">Outros; especificar:</label>
                                                    </div>
                                                    <input autocomplete="off" name="microbiologia_especificar_outros" type="text" class="input-especificar">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                        </div>

                        <div class="main-column-right">
                            <fieldset class="fieldset-group-section">
                                <div class="group-content-vertical">
                                    <div class="ln">
                                        <div class="fieldset-subgroup">
                                            <legend>CÉLULAS ATÍPICAS DE SIGNIFICADO INDETERMINADO</legend>
                                            <div class="sub-group-field">
                                                <h4>Escamosas:</h4>
                                                <div class="input-celulas-atipicas-escamosas input-option-group">
                                                    <div class="option-row">
                                                        <input autocomplete="off" id="celulas-atipicas-escamosas-nao-neoplasicas" name="celulas_atipicas_significado_indeterminado_escamosas" type="radio" value="escamosas_nao_neoplasicas">
                                                        <label for="celulas-atipicas-escamosas-nao-neoplasicas">Possivelmente não neoplásicas (ASC-US)</label>
                                                    </div>
                                                    <div class="option-row">
                                                        <input autocomplete="off" id="celulas-atipicas-escamosas-nao-afastar-alto-grau" name="celulas_atipicas_significado_indeterminado_escamosas" type="radio" value="escamosas_nao_afastar_alto_grau">
                                                        <label for="celulas-atipicas-escamosas-nao-afastar-alto-grau">Não se pode afastar lesão de alto grau (ASC-H)</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="sub-group-field">
                                                <h4>Glandulares:</h4>
                                                <div class="input-celulas-atipicas-glandulares input-option-group">
                                                    <div class="option-row">
                                                        <input autocomplete="off" id="celulas-atipicas-glandulares-nao-neoplasicas" name="celulas_atipicas_significado_indeterminado_glandulares" type="radio" value="glandulares_nao_neoplasicas">
                                                        <label for="celulas-atipicas-glandulares-nao-neoplasicas">Possivelmente não neoplásicas</label>
                                                    </div>
                                                    <div class="option-row">
                                                        <input autocomplete="off" id="celulas-atipicas-glandulares-nao-afastar-alto-grau" name="celulas_atipicas_significado_indeterminado_glandulares" type="radio" value="glandulares_nao_afastar_alto_grau">
                                                        <label for="celulas-atipicas-glandulares-nao-afastar-alto-grau">Não se pode afastar lesão de alto grau</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="sub-group-field">
                                                <h4>De origem indefinida:</h4>
                                                <div class="input-celulas-atipicas-origem-indefinida input-option-group">
                                                    <div class="option-row">
                                                        <input autocomplete="off" id="celulas-atipicas-indefinida-nao-neoplasicas" name="celulas_atipicas_significado_indeterminado_origem" type="radio" value="origem_indefinida_nao_neoplasicas">
                                                        <label for="celulas-atipicas-indefinida-nao-neoplasicas">Possivelmente não neoplásicas</label>
                                                    </div>
                                                    <div class="option-row">
                                                        <input autocomplete="off" id="celulas-atipicas-indefinida-nao-afastar-alto-grau" name="celulas_atipicas_significado_indeterminado_origem" type="radio" value="origem_indefinida_nao_afastar_alto_grau">
                                                        <label for="celulas-atipicas-indefinida-nao-afastar-alto-grau">Não se pode afastar lesão de alto grau</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <br>
                                            <div class="fieldset-subgroup">
                                                <legend>ATIPIAS EM CELULAS ESCAMOSAS</legend>
                                                <div class="input-atipias-celulas-escamosas input-option-group">
                                                    <div class="option-row">
                                                        <input autocomplete="off" id="escamosas-baixo-grau" name="atipias_celulas_escamosas" type="checkbox" value="baixo_grau">
                                                        <label for="escamosas-baixo-grau">Lesão intra-epitelial de baixo grau (compreendendo efeito citopático pelo HPV e neoplasia intra-epitelial cervical grau I)</label>
                                                    </div>
                                                    <div class="option-row">
                                                        <input autocomplete="off" id="escamosas-alto-grau" name="atipias_celulas_escamosas" type="checkbox" value="alto_grau">
                                                        <label for="escamosas-alto-grau">Lesão intra-epitelial de alto grau (compreendendo neoplasias intra-epiteliais cervicais graus II e III)</label>
                                                    </div>
                                                    <div class="option-row">
                                                        <input autocomplete="off" id="escamosas-alto-grau-micro-invasao" name="atipias_celulas_escamosas" type="checkbox" value="alto_grau_micro_invasao">
                                                        <label for="escamosas-alto-grau-micro-invasao">Lesão intra-epitelial de alto grau, não podendo excluir micro-invasão</label>
                                                    </div>
                                                    <div class="option-row">
                                                        <input autocomplete="off" id="escamosas-carcinoma-epidermoide" name="atipias_celulas_escamosas" type="checkbox" value="carcinoma_epidermoide_invasor">
                                                        <label for="escamosas-carcinoma-epidermoide">Carcinoma epidermóide invasor</label>
                                                    </div>
                                                </div>  
                                            </div>
                                            <br>
                                            <div class="fieldset-subgroup">
                                                <legend>ATIPIAS EM CÉLULAS GLANDULARES</legend>
                                                <div class="input-atipias-celulas-glandulares input-option-group">
                                                    <div class="option-row">
                                                        <input autocomplete="off" id="glandulares-adenocarcinoma-situ" name="atipias_celulas_glandulares_insitu" type="checkbox" value="adenocarcinoma_in_situ">
                                                        <label for="glandulares-adenocarcinoma-situ">Adenocarcinoma "in situ"</label>
                                                    </div>

                                                    <h4>Adenocarcinoma invasor:</h4>
                                                    <div class="sub-sub-group-field input-option-group">
                                                        <div class="option-row">
                                                            <input autocomplete="off" id="glandulares-invasor-cervical" name="atipias_celulas_glandulares_invasor" type="radio" value="adenocarcinoma_invasor_cervical">
                                                            <label for="glandulares-invasor-cervical">Cervical</label>
                                                        </div>
                                                        <div class="option-row">
                                                            <input autocomplete="off" id="glandulares-invasor-endometrial" name="atipias_celulas_glandulares_invasor" type="radio" value="adenocarcinoma_invasor_endometrial">
                                                            <label for="glandulares-invasor-endometrial">Endometrial</label>
                                                        </div>
                                                        <div class="option-row">
                                                            <input autocomplete="off" id="glandulares-invasor-sem-especificacao" name="atipias_celulas_glandulares_invasor" type="radio" value="adenocarcinoma_invasor_sem_especificacao">
                                                            <label for="glandulares-invasor-sem-especificacao">Sem outras especificações</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="ln">
                                            <div class="input-outras-neoplasias-malignas">
                                                    <label for="outras-neoplasias-malignas">OUTRAS NEOPLASIAS MALIGNAS:</label>
                                                    <input autocomplete="off" name="outras_neoplasias_malignas" id="outras-neoplasias-malignas" type="text" class="input-especificar">
                                                </div>
                                            </div>

                                            <div class="ln">
                                                <div class="input-celulas-endometriais input-option-group">
                                                    <div class="option-row">
                                                        <input autocomplete="off" id="celulas-endometriais-sim" name="celulas_endometriais_pos_menopausa_ou_mais40" type="checkbox" value="true">
                                                        <label for="celulas-endometriais-sim">PRESENÇA DE CÉLULAS ENDOMETRIAIS (NA PÓS-MENOPAUSA OU ACIMA DE 40 ANOS, FORA DO PERÍODO MENSTRUAL)</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>

                    <div class="major-horizontal-separator"></div>

                    <fieldset class="fieldset-group-section fieldset-final-section">
                        <legend>OUTRAS INFORMAÇÕES</legend>
                        <div class="group-content-two-columns">
                            <div class="group-column-left">
                                <div class="ln">
                                    <div class="input-observacoes-gerais">
                                        <label for="observacoes-gerais">Observações Gerais:</label>
                                        <input autocomplete="off" name="observacoes_gerais" id="observacoes-gerais" type="text">
                                    </div>
                                </div>
                                <div class="ln">
                                    <div class="input-data-resultado">
                                        <label for="data-resultado-dia">Data do Resultado<span class="required-asterisk">*</span></label>
                                        <div class="date-inputs">
                                            <input required autocomplete="off" name="data_resultado_dia" id="data-resultado-dia" type="text" maxlength="2" placeholder="DD">
                                            <span class="date-separator">/</span>
                                            <input required autocomplete="off" name="data_resultado_mes" id="data-resultado-mes" type="text" maxlength="2" placeholder="MM">
                                            <span class="date-separator">/</span>
                                            <input  autocomplete="off" name="data_resultado_ano" id="data-resultado-ano" type="text" maxlength="4" placeholder="AAAA">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="group-column-right">
                                <div class="ln">
                                    <div class="input-screening-citotecnico">
                                        <label for="screening-citotecnico">Screening pelo citotécnico:</label>
                                        <input autocomplete="off" name="screening_citotecnico" id="screening-citotecnico" type="text">
                                    </div>
                                </div>

                                <div class="ln">
                                    <div class="input-responsavel-resultado">
                                        <label for="responsavel-resultado">Responsável<span class="required-asterisk">*</span></label>
                                        <input required autocomplete="off" name="responsavel" id="responsavel-resultado" type="text">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </fieldset>
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
        // Identificação do Laboratório
        laboratorio_cnes: shadow.getElementById('laboratorio-cnes'),
        laboratorio_nome: shadow.getElementById('laboratorio-nome'),
        numero_exame: shadow.getElementById('numero-exame'),
        recebido_em_dia: shadow.getElementById('recebido-em-dia'),
        recebido_em_mes: shadow.getElementById('recebido-em-mes'),
        recebido_em_ano: shadow.getElementById('recebido-em-ano'),

        // Avaliação Pré-Analítica
        amostra_rejeitada_ausencia_erro: shadow.getElementById('amostra-rejeitada-ausencia-erro'),
        amostra_rejeitada_lamina_danificada: shadow.getElementById('amostra-rejeitada-lamina-danificada'),
        amostra_rejeitada_causas_alheias: shadow.getElementById('amostra-rejeitada-causas-alheias'),
        amostra_rejeitada_especificar_alheias: shadow.querySelector('input[name="amostra_rejeitada_especificar_alheias"]'),
        amostra_rejeitada_outras_causas: shadow.getElementById('amostra-rejeitada-outras-causas'),
        amostra_rejeitada_especificar_outras: shadow.querySelector('input[name="amostra_rejeitada_especificar_outras"]'),
        
        epitelios_escamoso: shadow.getElementById('epitelios-escamoso'),
        epitelios_glandular: shadow.getElementById('epitelios-glandular'),
        epitelios_metaplasico: shadow.getElementById('epitelios-metaplasico'),

        // Adequabilidade do Material
        adequabilidade_satisfatoria: shadow.getElementById('adequabilidade-satisfatoria'),
        insatisfatoria_acelular: shadow.getElementById('insatisfatoria-acelular'),
        insatisfatoria_sangue: shadow.getElementById('insatisfatoria-sangue'),
        insatisfatoria_piocitos: shadow.getElementById('insatisfatoria-piocitos'),
        insatisfatoria_dessecamento: shadow.getElementById('insatisfatoria-dessecamento'),
        insatisfatoria_contaminantes: shadow.getElementById('insatisfatoria-contaminantes'),
        insatisfatoria_superposicao: shadow.getElementById('insatisfatoria-superposicao'),
        insatisfatoria_outros: shadow.getElementById('insatisfatoria-outros'),
        insatisfatoria_por_especificar_outros: shadow.querySelector('input[name="insatisfatoria_por_especificar_outros"]'),

        // Diagnóstico Descritivo
        normalidade_sim: shadow.getElementById('normalidade-sim'),
        normalidade_nao: shadow.getElementById('normalidade-nao'),

        benignas_inflamacao: shadow.getElementById('benignas-inflamacao'),
        benignas_metaplasia: shadow.getElementById('benignas-metaplasia'),
        benignas_reparacao: shadow.getElementById('benignas-reparacao'),
        benignas_atrofia: shadow.getElementById('benignas-atrofia'),
        benignas_radiacao: shadow.getElementById('benignas-radiacao'),
        benignas_outros: shadow.getElementById('benignas-outros'),
        alteracao_celulas_benignas_especificar_outros: shadow.querySelector('input[name="alteracao_celulas_benignas_especificar_outros"]'),

        micro_lactobacillus: shadow.getElementById('micro-lactobacillus'),
        micro_cocos: shadow.getElementById('micro-cocos'),
        micro_chlamydia: shadow.getElementById('micro-chlamydia'),
        micro_actinomyces: shadow.getElementById('micro-actinomyces'),
        micro_candida: shadow.getElementById('micro-candida'),
        micro_trichomonas: shadow.getElementById('micro-trichomonas'),
        micro_herpes: shadow.getElementById('micro-herpes'),
        micro_bacilos_supracitoplasmaticos: shadow.getElementById('micro-bacilos-supracitoplasmaticos'),
        micro_outros_bacilos: shadow.getElementById('micro-outros-bacilos'),
        micro_outros: shadow.getElementById('micro-outros'),
        microbiologia_especificar_outros: shadow.querySelector('input[name="microbiologia_especificar_outros"]'),

        celulas_atipicas_escamosas_nao_neoplasicas: shadow.getElementById('celulas-atipicas-escamosas-nao-neoplasicas'),
        celulas_atipicas_escamosas_nao_afastar_alto_grau: shadow.getElementById('celulas-atipicas-escamosas-nao-afastar-alto-grau'),
        celulas_atipicas_glandulares_nao_neoplasicas: shadow.getElementById('celulas-atipicas-glandulares-nao-neoplasicas'),
        celulas_atipicas_glandulares_nao_afastar_alto_grau: shadow.getElementById('celulas-atipicas-glandulares-nao-afastar-alto-grau'),
        celulas_atipicas_indefinida_nao_neoplasicas: shadow.getElementById('celulas-atipicas-indefinida-nao-neoplasicas'),
        celulas_atipicas_indefinida_nao_afastar_alto_grau: shadow.getElementById('celulas-atipicas-indefinida-nao-afastar-alto-grau'),

        // Atipias em Células Escamosas
        escamosas_baixo_grau: shadow.getElementById('escamosas-baixo-grau'),
        escamosas_alto_grau: shadow.getElementById('escamosas-alto-grau'),
        escamosas_alto_grau_micro_invasao: shadow.getElementById('escamosas-alto-grau-micro-invasao'),
        escamosas_carcinoma_epidermoide: shadow.getElementById('escamosas-carcinoma-epidermoide'),

        // Atipias em Células Glandulares
        glandulares_adenocarcinoma_situ: shadow.getElementById('glandulares-adenocarcinoma-situ'),
        glandulares_invasor_cervical: shadow.getElementById('glandulares-invasor-cervical'),
        glandulares_invasor_endometrial: shadow.getElementById('glandulares-invasor-endometrial'),
        glandulares_invasor_sem_especificacao: shadow.getElementById('glandulares-invasor-sem-especificacao'),

        // Outras Informações
        outras_neoplasias_malignas: shadow.getElementById('outras-neoplasias-malignas'),
        celulas_endometriais_sim: shadow.getElementById('celulas-endometriais-sim'),
        observacoes_gerais: shadow.getElementById('observacoes-gerais'),
        screening_citotecnico: shadow.getElementById('screening-citotecnico'),
        responsavel_resultado: shadow.getElementById('responsavel-resultado'),
        data_resultado_dia: shadow.getElementById('data-resultado-dia'),
        data_resultado_mes: shadow.getElementById('data-resultado-mes'),
        data_resultado_ano: shadow.getElementById('data-resultado-ano'),
    };

    // Mask
     function applyDateMask(dayInput, monthInput, yearInput) {
        if (!dayInput || !monthInput || !yearInput) {
            console.error("Um ou mais inputs de data são nulos ou indefinidos.");
            return;
        }

        const formatDigit = (input, maxLength) => {
            input.addEventListener('input', (event) => {
                let value = event.target.value.replace(/\D/g, ''); // Remove não dígitos
                if (value.length > maxLength) {
                    value = value.slice(0, maxLength);
                }
                event.target.value = value;
            });
        };

        formatDigit(dayInput, 2);
        formatDigit(monthInput, 2);
        formatDigit(yearInput, 4);

        // Adiciona lógica para pular campos automaticamente
        dayInput.addEventListener('input', () => {
            if (dayInput.value.length === 2) {
                monthInput.focus();
            }
        });
        monthInput.addEventListener('input', () => {
            if (monthInput.value.length === 2) {
                yearInput.focus();
            }
        });
    }

    function applyCnesMask(input) {
        if (!input) return;
        input.addEventListener('input', (event) => {
            let value = event.target.value.replace(/\D/g, ''); // Remove não dígitos
            // Adicione a lógica de formatação específica para CNES se houver
            event.target.value = value;
        });
    }

    // Função para aplicar todas as máscaras
    function applyInputMasks(inputs) {
        applyCnesMask(inputs.laboratorio_cnes);
        applyDateMask(inputs.recebido_em_dia, inputs.recebido_em_mes, inputs.recebido_em_ano);
        applyDateMask(inputs.data_resultado_dia, inputs.data_resultado_mes, inputs.data_resultado_ano);
    }


    function markInvalid(inputElement, message = '') {
        if (inputElement) {
            inputElement.classList.add('input-error');
            // Você pode adicionar um elemento para exibir a mensagem de erro
            // let errorMessage = inputElement.nextElementSibling;
            // if (errorMessage && errorMessage.classList.contains('error-message')) {
            //     errorMessage.textContent = message;
            // } else {
            //     errorMessage = document.createElement('span');
            //     errorMessage.classList.add('error-message');
            //     errorMessage.textContent = message;
            //     inputElement.parentNode.insertBefore(errorMessage, inputElement.nextSibling);
            // }
        }
    }

    function markValid(inputElement) {
        if (inputElement) {
            inputElement.classList.remove('input-error');
            // Remove a mensagem de erro se existir
            // const errorMessage = inputElement.nextElementSibling;
            // if (errorMessage && errorMessage.classList.contains('error-message')) {
            //     errorMessage.remove();
            // }
        }
    }

    function validateRequired(inputElement) {
        if (!inputElement || inputElement.value.trim() === '') {
            markInvalid(inputElement, 'Campo obrigatório.');
            return false;
        }
        markValid(inputElement);
        return true;
    }

    function validateLength(inputElement, min, max) {
        if (!inputElement || inputElement.value.length < min || inputElement.value.length > max) {
            markInvalid(inputElement, `Deve ter entre ${min} e ${max} caracteres.`);
            return false;
        }
        markValid(inputElement);
        return true;
    }

    function validateDate(dayInput, monthInput, yearInput) {
        const day = parseInt(dayInput.value, 10);
        const month = parseInt(monthInput.value, 10);
        const year = parseInt(yearInput.value, 10);

        if (isNaN(day) || isNaN(month) || isNaN(year) || 
            dayInput.value.length !== 2 || monthInput.value.length !== 2 || yearInput.value.length !== 4) {
            markInvalid(dayInput);
            markInvalid(monthInput);
            markInvalid(yearInput, 'Data inválida.');
            return false;
        }

        const date = new Date(year, month - 1, day);
        const isValid = date.getFullYear() === year && date.getMonth() + 1 === month && date.getDate() === day;

        if (!isValid) {
            markInvalid(dayInput);
            markInvalid(monthInput);
            markInvalid(yearInput, 'Data inválida.');
        } else {
            markValid(dayInput);
            markValid(monthInput);
            markValid(yearInput);
        }
        return isValid;
    }

    function validateRadioGroup(radioInputs, groupName) {
        let isChecked = false;
        for (const radio of radioInputs) {
            if (radio.checked) {
                isChecked = true;
                break;
            }
        }
        if (!isChecked) {
            radioInputs.forEach(radio => markInvalid(radio));
            // O ideal seria marcar o fieldset pai ou um elemento visual que englobe o grupo de rádio
            return false;
        }
        radioInputs.forEach(radio => markValid(radio));
        return true;
    }

    function validateCheckboxGroup(checkboxInputs, groupName, minChecked = 0) {
        let checkedCount = 0;
        for (const checkbox of checkboxInputs) {
            if (checkbox.checked) {
                checkedCount++;
            }
        }
        if (checkedCount < minChecked) {
            checkboxInputs.forEach(checkbox => markInvalid(checkbox));
            // O ideal seria marcar o fieldset pai ou um elemento visual que englobe o grupo de checkbox
            return false;
        }
        checkboxInputs.forEach(checkbox => markValid(checkbox));
        return true;
    }

    // Aplica as máscaras nos campos de data (agora chamada após a definição das funções)
    applyInputMasks(inputs);

    function formatarDataParaISO(dia, mes, ano) {
        if (!dia || !mes || !ano) return ""; // Retorna string vazia se a data não estiver completa
        
        // Converte os valores para números inteiros
        const d = parseInt(dia, 10);
        const m = parseInt(mes, 10);
        const a = parseInt(ano, 10);

        // Cria um objeto Date. Usamos 00:00:00 como hora padrão.
        const data = new Date(a, m - 1, d, 0, 0, 0); // O mês é 0-indexado no JavaScript (jan=0, dez=11)

        // Verifica se a data é válida. Se o Date object for inválido (e.g., 30 de fevereiro),
        // getTime() retornará NaN.
        if (isNaN(data.getTime())) {
            return ""; 
        }

        // Retorna a data no formato ISO 8601 completo (incluindo Z para UTC se não houver offset, ou com offset)
        // Ex: "2025-06-25T00:00:00.000Z" ou "2025-06-25T00:00:00-03:00"
        return data.toISOString(); 
    }

    function getExamLabData(inputs) {
        const etapa03Lab = {};
        const etapa04Resultado = {};

        // --- Etapa03Lab ---
        etapa03Lab.laboratorio_nome = inputs.laboratorio_nome.value;
        etapa03Lab.laboratorio_cnes = inputs.laboratorio_cnes.value;
        etapa03Lab.numero_exame = inputs.numero_exame.value;
        etapa03Lab.recebido_em = formatarDataParaISO(inputs.recebido_em_dia.value, inputs.recebido_em_mes.value, inputs.recebido_em_ano.value);

        // --- Etapa04Resultado ---

        // Amostra_rejeitada (radio)
        const amostraRejeitadaRadios = shadow.querySelectorAll('input[name="amostra_rejeitada"]');
        for (const radio of amostraRejeitadaRadios) {
            if (radio.checked) {
                etapa04Resultado.amostra_rejeitada = radio.value;
                // Se as opções "causas_alheias" ou "outras_causas" estiverem marcadas,
                // adiciona o valor do campo de especificação.
                if (radio.value === "causas_alheias" && inputs.amostra_rejeitada_especificar_alheias.value) {
                    etapa04Resultado.amostra_rejeitada += `: ${inputs.amostra_rejeitada_especificar_alheias.value}`;
                } else if (radio.value === "outras_causas" && inputs.amostra_rejeitada_especificar_outras.value) {
                    etapa04Resultado.amostra_rejeitada += `: ${inputs.amostra_rejeitada_especificar_outras.value}`;
                }
                break;
            }
        }

        // Epitelios_representados (checkboxes, concatenados)
        const epiteliosRepresentadosArray = [];
        if (inputs.epitelios_escamoso.checked) epiteliosRepresentadosArray.push(inputs.epitelios_escamoso.value);
        if (inputs.epitelios_glandular.checked) epiteliosRepresentadosArray.push(inputs.epitelios_glandular.value);
        if (inputs.epitelios_metaplasico.checked) epiteliosRepresentadosArray.push(inputs.epitelios_metaplasico.value);
        etapa04Resultado.epitelios_representados = epiteliosRepresentadosArray.join(', ');

        // Adequabilidade_material (radio, boolean)
        etapa04Resultado.adequabilidade_material = inputs.adequabilidade_satisfatoria.checked;

        // Insatisfatoria_por (checkboxes, concatenados)
        const insatisfatoriaPorArray = [];
        if (inputs.insatisfatoria_acelular.checked) insatisfatoriaPorArray.push(inputs.insatisfatoria_acelular.value);
        if (inputs.insatisfatoria_sangue.checked) insatisfatoriaPorArray.push(inputs.insatisfatoria_sangue.value);
        if (inputs.insatisfatoria_piocitos.checked) insatisfatoriaPorArray.push(inputs.insatisfatoria_piocitos.value);
        if (inputs.insatisfatoria_dessecamento.checked) insatisfatoriaPorArray.push(inputs.insatisfatoria_dessecamento.value);
        if (inputs.insatisfatoria_contaminantes.checked) insatisfatoriaPorArray.push(inputs.insatisfatoria_contaminantes.value);
        if (inputs.insatisfatoria_superposicao.checked) insatisfatoriaPorArray.push(inputs.insatisfatoria_superposicao.value);
        if (inputs.insatisfatoria_outros.checked && inputs.insatisfatoria_por_especificar_outros.value) {
            insatisfatoriaPorArray.push(`${inputs.insatisfatoria_outros.value}: ${inputs.insatisfatoria_por_especificar_outros.value}`);
        } else if (inputs.insatisfatoria_outros.checked) {
            insatisfatoriaPorArray.push(inputs.insatisfatoria_outros.value);
        }
        etapa04Resultado.insatisfatoria_por = insatisfatoriaPorArray.join(', ');

        // Dentro_limites_normalidade (radio, boolean)
        etapa04Resultado.dentro_limites_normalidade = inputs.normalidade_sim.checked;

        // Alteracao_celulas_benignas (checkboxes, concatenados)
        const alteracaoCelulasBenignasArray = [];
        if (inputs.benignas_inflamacao.checked) alteracaoCelulasBenignasArray.push(inputs.benignas_inflamacao.value);
        if (inputs.benignas_metaplasia.checked) alteracaoCelulasBenignasArray.push(inputs.benignas_metaplasia.value);
        if (inputs.benignas_reparacao.checked) alteracaoCelulasBenignasArray.push(inputs.benignas_reparacao.value);
        if (inputs.benignas_atrofia.checked) alteracaoCelulasBenignasArray.push(inputs.benignas_atrofia.value);
        if (inputs.benignas_radiacao.checked) alteracaoCelulasBenignasArray.push(inputs.benignas_radiacao.value);
        if (inputs.benignas_outros.checked && inputs.alteracao_celulas_benignas_especificar_outros.value) {
            alteracaoCelulasBenignasArray.push(`${inputs.benignas_outros.value}: ${inputs.alteracao_celulas_benignas_especificar_outros.value}`);
        } else if (inputs.benignas_outros.checked) {
            alteracaoCelulasBenignasArray.push(inputs.benignas_outros.value);
        }
        etapa04Resultado.alteracao_celulas_benignas = alteracaoCelulasBenignasArray.join(', ');

        // Microbiologia (checkboxes, concatenados)
        const microbiologiaArray = [];
        if (inputs.micro_lactobacillus.checked) microbiologiaArray.push(inputs.micro_lactobacillus.value);
        if (inputs.micro_cocos.checked) microbiologiaArray.push(inputs.micro_cocos.value);
        if (inputs.micro_chlamydia.checked) microbiologiaArray.push(inputs.micro_chlamydia.value);
        if (inputs.micro_actinomyces.checked) microbiologiaArray.push(inputs.micro_actinomyces.value);
        if (inputs.micro_candida.checked) microbiologiaArray.push(inputs.micro_candida.value);
        if (inputs.micro_trichomonas.checked) microbiologiaArray.push(inputs.micro_trichomonas.value);
        if (inputs.micro_herpes.checked) microbiologiaArray.push(inputs.micro_herpes.value);
        if (inputs.micro_bacilos_supracitoplasmaticos.checked) microbiologiaArray.push(inputs.micro_bacilos_supracitoplasmaticos.value);
        if (inputs.micro_outros_bacilos.checked) microbiologiaArray.push(inputs.micro_outros_bacilos.value);
        if (inputs.micro_outros.checked && inputs.microbiologia_especificar_outros.value) {
            microbiologiaArray.push(`${inputs.micro_outros.value}: ${inputs.microbiologia_especificar_outros.value}`);
        } else if (inputs.micro_outros.checked) {
            microbiologiaArray.push(inputs.micro_outros.value);
        }
        etapa04Resultado.microbiologia = microbiologiaArray.join(', ');

        // Celulas_atipicas_significado_indeterminado (radio groups, concatenados)
        let celulasAtipicasIndeterminadas = [];
        const atipicasEscamosasRadios = shadow.querySelectorAll('input[name="celulas_atipicas_significado_indeterminado_escamosas"]');
        for (const radio of atipicasEscamosasRadios) {
            if (radio.checked) {
                celulasAtipicasIndeterminadas.push(`Escamosas: ${radio.nextElementSibling.textContent.trim()}`);
                break;
            }
        }
        const atipicasGlandularesRadios = shadow.querySelectorAll('input[name="celulas_atipicas_significado_indeterminado_glandulares"]');
        for (const radio of atipicasGlandularesRadios) {
            if (radio.checked) {
                celulasAtipicasIndeterminadas.push(`Glandulares: ${radio.nextElementSibling.textContent.trim()}`);
                break;
            }
        }
        const atipicasOrigemRadios = shadow.querySelectorAll('input[name="celulas_atipicas_significado_indeterminado_origem"]');
        for (const radio of atipicasOrigemRadios) {
            if (radio.checked) {
                celulasAtipicasIndeterminadas.push(`Origem Indefinida: ${radio.nextElementSibling.textContent.trim()}`);
                break;
            }
        }
        etapa04Resultado.celulas_atipicas_significado_indeterminado = celulasAtipicasIndeterminadas.join('; ');


        // Atipias_celulas_escamosas (checkboxes, concatenados)
        const atipiasEscamosasArray = [];
        if (inputs.escamosas_baixo_grau.checked) atipiasEscamosasArray.push(inputs.escamosas_baixo_grau.nextElementSibling.textContent.trim());
        if (inputs.escamosas_alto_grau.checked) atipiasEscamosasArray.push(inputs.escamosas_alto_grau.nextElementSibling.textContent.trim());
        if (inputs.escamosas_alto_grau_micro_invasao.checked) atipiasEscamosasArray.push(inputs.escamosas_alto_grau_micro_invasao.nextElementSibling.textContent.trim());
        if (inputs.escamosas_carcinoma_epidermoide.checked) atipiasEscamosasArray.push(inputs.escamosas_carcinoma_epidermoide.nextElementSibling.textContent.trim());
        etapa04Resultado.atipias_celulas_escamosas = atipiasEscamosasArray.join('; ');

        // Atipias_celulas_glandulares (checkbox + radio, concatenados)
        const atipiasGlandularesArray = [];
        if (inputs.glandulares_adenocarcinoma_situ.checked) {
            atipiasGlandularesArray.push(inputs.glandulares_adenocarcinoma_situ.nextElementSibling.textContent.trim());
        }
        const atipiasGlandularesInvasorRadios = shadow.querySelectorAll('input[name="atipias_celulas_glandulares_invasor"]');
        for (const radio of atipiasGlandularesInvasorRadios) {
            if (radio.checked) {
                atipiasGlandularesArray.push(`Adenocarcinoma invasor: ${radio.nextElementSibling.textContent.trim()}`);
                break;
            }
        }
        etapa04Resultado.atipias_celulas_glandulares = atipiasGlandularesArray.join('; ');

        // Outras_neoplasias_malignas
        etapa04Resultado.outras_neoplasias_malignas = inputs.outras_neoplasias_malignas.value;

        // Celulas_endometriais_pos_menopausa_ou_mais40 (checkbox, boolean)
        etapa04Resultado.celulas_endometriais_pos_menopausa_ou_mais40 = inputs.celulas_endometriais_sim.checked;

        // Observacoes_gerais
        etapa04Resultado.observacoes_gerais = inputs.observacoes_gerais.value;

        // Screening_citotecnico
        etapa04Resultado.screening_citotecnico = inputs.screening_citotecnico.value;

        // Responsavel
        etapa04Resultado.responsavel = inputs.responsavel_resultado.value;

        // Data_resultado (formatada para ISO 8601)
        etapa04Resultado.data_resultado = formatarDataParaISO(inputs.data_resultado_dia.value, inputs.data_resultado_mes.value, inputs.data_resultado_ano.value);

        etapa04Resultado.responsavel_id = userId

        etapa03Lab.responsavel_id = userId

        return {
            etapa03Lab,
            etapa04Resultado
        };
    }

    // Valida o formulário
    function validateExamLabSection(inputs) {
        let isValid = true;
        
        // Limpa validações anteriores
        for (const key in inputs) {
            if (inputs[key] instanceof Element) { // Garante que é um elemento DOM
                inputs[key].classList.remove('input-error');
            }
        }

        // Validação da seção "Identificação do Laboratório"
        if (!validateRequired(inputs.laboratorio_cnes)) isValid = false;
        if (!validateLength(inputs.laboratorio_cnes, 1, 14)) isValid = false;
        if (!validateRequired(inputs.laboratorio_nome)) isValid = false;
        if (!validateLength(inputs.laboratorio_nome, 1, 21)) isValid = false;
        if (!validateRequired(inputs.numero_exame)) isValid = false;
        if (!validateLength(inputs.numero_exame, 1, 16)) isValid = false;
        
        if (!validateDate(inputs.recebido_em_dia, inputs.recebido_em_mes, inputs.recebido_em_ano)) isValid = false;

        // Validação da seção "Avaliação Pré-Analítica"
        const amostraRejeitadaRadios = shadow.querySelectorAll('input[name="amostra_rejeitada"]');
        if (!validateRadioGroup(amostraRejeitadaRadios, 'amostra_rejeitada')) isValid = false;
        
        // Se a opção "Causas alheias" ou "Outras causas" estiver marcada, o campo de especificação é obrigatório
        if (inputs.amostra_rejeitada_causas_alheias.checked && !validateRequired(inputs.amostra_rejeitada_especificar_alheias)) isValid = false;
        if (inputs.amostra_rejeitada_outras_causas.checked && !validateRequired(inputs.amostra_rejeitada_especificar_outras)) isValid = false;

        const epiteliosCheckboxes = [inputs.epitelios_escamoso, inputs.epitelios_glandular, inputs.epitelios_metaplasico];
        if (!validateCheckboxGroup(epiteliosCheckboxes, 'epitelios_representados', 1)) isValid = false; // Pelo menos 1 deve ser selecionado

        // Validação da seção "Adequabilidade do Material"
        const adequabilidadeMaterialRadios = shadow.querySelectorAll('input[name="adequabilidade_material"]');
        if (!validateRadioGroup(adequabilidadeMaterialRadios, 'adequabilidade_material')) isValid = false;

        // Se a adequabilidade for "Insatisfatória", pelo menos uma opção de "insatisfatoria_por" deve ser selecionada
        if (inputs.adequabilidade_satisfatoria.checked === false) { 
            const insatisfatoriaCheckboxes = [
                inputs.insatisfatoria_acelular, inputs.insatisfatoria_sangue, inputs.insatisfatoria_piocitos,
                inputs.insatisfatoria_dessecamento, inputs.insatisfatoria_contaminantes, inputs.insatisfatoria_superposicao,
                inputs.insatisfatoria_outros
            ];
            if (!validateCheckboxGroup(insatisfatoriaCheckboxes, 'insatisfatoria_por', 1)) isValid = false; 
            if (inputs.insatisfatoria_outros.checked && !validateRequired(inputs.insatisfatoria_por_especificar_outros)) isValid = false;
        }

        // Validação da seção "Diagnóstico Descritivo"
        const normalidadeRadios = shadow.querySelectorAll('input[name="dentro_limites_normalidade"]');
        if (!validateRadioGroup(normalidadeRadios, 'dentro_limites_normalidade')) isValid = false;

        // Se "Outros" em Alterações Celulares Benignas for marcado, o campo de especificação é obrigatório
        if (inputs.benignas_outros.checked && !validateRequired(inputs.alteracao_celulas_benignas_especificar_outros)) isValid = false;

        // Se "Outros" em Microbiologia for marcado, o campo de especificação é obrigatório
        if (inputs.micro_outros.checked && !validateRequired(inputs.microbiologia_especificar_outros)) isValid = false;

        const atipicasEscamosasRadios = shadow.querySelectorAll('input[name="celulas_atipicas_significado_indeterminado_escamosas"]');
        if (!validateRadioGroup(atipicasEscamosasRadios, 'celulas_atipicas_significado_indeterminado_escamosas')) isValid = false;
        
        const atipicasGlandularesRadios = shadow.querySelectorAll('input[name="celulas_atipicas_significado_indeterminado_glandulares"]');
        if (!validateRadioGroup(atipicasGlandularesRadios, 'celulas_atipicas_significado_indeterminado_glandulares')) isValid = false;

        const atipicasOrigemRadios = shadow.querySelectorAll('input[name="celulas_atipicas_significado_indeterminado_origem"]');
        if (!validateRadioGroup(atipicasOrigemRadios, 'celulas_atipicas_significado_indeterminado_origem')) isValid = false;

        // Para Atipias em Células Glandulares, se "Adenocarcinoma 'in situ'" estiver marcado, o grupo de rádio de invasor não é necessariamente obrigatório.
        // Se houver uma regra que exige a seleção de um invasor se o in situ estiver marcado, adicione a validação aqui.

        // Validação da seção "Outras Informações"
        if (!validateRequired(inputs.responsavel_resultado)) isValid = false;
        if (!validateDate(inputs.data_resultado_dia, inputs.data_resultado_mes, inputs.data_resultado_ano)) isValid = false;

        if (!isValid) {
            alert("Por favor, preencha todos os campos obrigatórios corretamente.");
        }
        return isValid;
    }


    // Ao clicar no botão (evento 'getFormData' que viria de um componente pai ou de um botão submit)
    document.addEventListener("getFormData", async () => {
        // Assume que este evento é disparado quando o formulário precisa ser enviado
        if (!validateExamLabSection(inputs)) {
            console.warn("Validação do formulário falhou. Verifique os campos.");
            return;
        }

        const dataLab = getExamLabData(inputs);
        console.log("Dados do formulário do laboratório:", dataLab.etapa03Lab, dataLab.etapa04Resultado);

        try {
            await registrarEtapaLab(nProtocol, dataLab.etapa03Lab); // Passa nProtocol, data e userId
        } catch (error) {
            console.error("Erro ao registrar etapa do exame laboratorial:", error);
            alert("Erro ao registrar etapa do exame laboratorial. Por favor, tente novamente.");
            return
        }

        try {
            await registrarEtapaResult(nProtocol, dataLab.etapa04Resultado);
        } catch (error) {
            console.error("erro ao registrar etapa do exame laboratorial: ", error)
            alert("Erro ao registrar etapa do exame resultado. Por favor, tente novamente.");
            return
        }

        alert("Exame Registrado com Sucesso!")
        window.location.replace("/main/usuario/exame/full"); // Redireciona para a próxima etapa
    });
  }
}

if (!customElements.get('exam-lab')) {
  customElements.define('exam-lab', labLayout);
}
