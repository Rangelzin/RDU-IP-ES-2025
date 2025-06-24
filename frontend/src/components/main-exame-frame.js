class ExamLayout extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    fillUbsInfo(shadow)

    // Define o conteúdo HTML do shadow DOM
    shadow.innerHTML = `
        <link rel="stylesheet" href="/assets/css/main-exame-frame.css">
        
        <div class="body">
            <div class="body-left">
                <div class="profile">
                    <img class="profile-img" src="/assets/img/defaulPerfil_IMG/perfil_02.svg" alt="desenho de uma mulher">
                    <h2 class="profile-name" id="profile-name"></h2>
                </div>
                <div class="ubs-info">
                    <h2 class="ubs-name"></h2>
                    <h3 class="ubs-addres"></h3>
                </div>
            </div>

            <div class="body-mid">
                <slot name="content"></slot>
            </div>

            <div class="body-right">
                <h2 class="n-protocolo" id="text-n-protocolo">00000000000000</h2>
                <div class="btn-download">
                    <img src="/assets/img/download-icon.svg" alt="ícone de download">
                </div>
                <div class="btn-next" id="btn-next">
                    <img src="/assets/img/next-icon.svg" alt="ícone de próximo">
                </div>
            </div>
        </div>
    `;

    // Adiciona o script externo ao shadow DOM
    const script = document.createElement('script');
    script.src = '/assets/js/main-exame-script.js';
    script.defer = true;
    shadow.appendChild(script);

    async function fillUbsInfo(shadowRoot) {
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

        const config = await loadUbsConfig();
        if (config) {
            const ubsNameEl = shadowRoot.querySelector('.ubs-name');
            const ubsAddressEl = shadowRoot.querySelector('.ubs-addres');
 
            if (ubsNameEl) ubsNameEl.textContent = config.ubs_name || '';
            if (ubsAddressEl) ubsAddressEl.textContent = config.ubs_address || '';
        }
    }

    // Cria o evento personalizado
    const getFormData = new CustomEvent("getFormData", {
      detail: {},
      bubbles: true,
      composed: true
    });

    // Adiciona o listener no botão
    const btnNext = shadow.querySelector('#btn-next');
    if (btnNext) {
        btnNext.addEventListener('click', () => {
            document.dispatchEvent(getFormData);
        });
    }
  }
}

if (!customElements.get('exam-layout')) {
  customElements.define('exam-layout', ExamLayout);
}
