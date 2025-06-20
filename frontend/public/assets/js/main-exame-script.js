const textNProtocol = document.querySelector('#text-n-protocolo');

// Esse script será carregado dentro do shadowRoot do exam-layout

document.addEventListener("sessionStorageUpdated", (event) => {
    const { key, value } = event.detail;

    const root = document.querySelector('exam-layout')?.shadowRoot;
    if (!root) return;

    if (key === "profile-name") {
        const nameEl = root.querySelector('#profile-name');
        if (nameEl) nameEl.textContent = value;
    }

    if (key === "numero-protocolo") {
        const protoEl = root.querySelector('#text-n-protocolo');
            let valuef = value.replace(/\D/g, '');
        if (protoEl) protoEl.textContent = valuef.padEnd(14, '0');
    }
});

// function imageFill(){
//     let img = document.querySelector('#profile-img')
//     img.src = "/assets/img/defaulPerfil_IMG/perfil_02.svg"
// }
