class Siderbar extends HTMLElement {
    connectedCallback() {
        // Passo 1: Definir o HTML do componente, adicionando IDs para os elementos interativos
        this.innerHTML = `
            <div class="flex flex-1 flex-col justify-between bg-[var(--color-primary)] w-20 h-screen fixed">   
                <div class="flex flex-col items-center">
                    <img id="btn-voltar" src="../assets/img/next-icon.svg" alt="Voltar" class="rotate-180 w-10 h-10 m-2 cursor-pointer">
                    
                    <img id="btn-dashboard" src="../assets/img/dashbord.svg" alt="Dashboard" class="w-10 h-10 m-2 cursor-pointer">
                    
                    <img src="../assets/img/Group 8.svg" class="w-10 h-10 m-2">
                    <img src="../assets/img/search2.svg" alt="Buscar" class="fill-white w-10 h-10 m-2">
                </div>  
                <div class="flex flex-col items-end">
                    <img src="../assets/img/chevron_right.svg" class="fill-white w-10 h-10 m-2">
                </div>
                <div class="flex flex-col items-center ">
                    <img src="../assets/img/defaulPerfil_IMG/perfil_02.svg" class="w-10 h-10 m-2">
                    <img src="../assets/img/gear-fill.svg" alt="Configurações" class="w-10 h-10 m-2">
                    <img src="../assets/img/Group 3.svg" class="w-10 h-10 m-2">
                </div>
            </div> 
        `;
        
        // Passo 2: Adicionar os eventos de clique aos botões
         const btnAbrir = document.querySelector('#btn-abrir');
     
        btnAbrir.addEventListener('click', () => {
            const menu = document.querySelector('#menu');
            const icons1 = document.querySelector('#icons1');
            const icons2 = document.querySelector('#icons2');
        
            icons1.classList.toggle('items-start'); icons2.classList.toggle('items-start');
            icons1.classList.add('px-3'); icons2.classList.add('px-3');
            menu.classList.toggle('w-80');
        });

    }
}

customElements.define('sidebar-left', Siderbar);

