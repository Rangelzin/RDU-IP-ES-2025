class Siderbar extends HTMLElement {
    connectedCallback() {
        // Passo 1: Definir o HTML do componente, adicionando IDs para os elementos interativos
        this.innerHTML = `
            <div id="menu" class="flex flex-col justify-between bg-[var(--color-primary)] w-20 h-screen ">   
                <div id="icons1" class="flex flex-col items-center justify-center">
                    <div class="js-menu-div flex flex-row hover:bg-(--color-secondary) hover:rounded-4xl cursor-pointer items-center justify-center">
                    <img src="../assets/img/next-icon.svg" alt="Voltar" class="rotate-180 w-10 h-10 m-2 ">
                    <p class="text-white text-2xl p-2 js-menu-label hidden">Voltar Página</p>
                    </div>
                    <div class="js-menu-div flex flex-row hover:bg-(--color-secondary) hover:rounded-4xl cursor-pointer items-center justify-center">
                    <img src="../assets/img/dashbord.svg" alt="Dashboard" class="w-10 h-10 m-2 ">
                    <p class="text-white text-2xl p-2 js-menu-label hidden">Dashboard</p>
                    </div>
                    <div class="js-menu-div flex flex-row hover:bg-(--color-secondary) hover:rounded-4xl cursor-pointer items-center justify-center">
                    <img src="../assets/img/Group 8.svg" class="w-10 h-10 m-2 ">
                    <p class="text-white text-2xl p-2 js-menu-label hidden">Nova Ficha</p>
                    </div>
                    <div class="js-menu-div flex flex-row hover:bg-(--color-secondary) hover:rounded-4xl cursor-pointer items-center justify-center">
                    <img src="../assets/img/search2.svg" alt="Buscar" class="fill-white w-10 h-10 m-2 ">
                    <p class="text-white text-2xl p-2 js-menu-label hidden">Buscar</p>
                    </div>
                </div>  
                    <div id="btn-abrir" class="flex flex-col items-end">
                        <img src="../assets/img/chevron_right.svg" class="fill-white w-10 h-10 m-2 ">
                    </div>
                <div id="icons2" class="flex flex-col items-center justify-center">
                    <div class="js-menu-div flex flex-row hover:bg-(--color-secondary) hover:rounded-4xl cursor-pointer items-center justify-center">
                    <img src="../assets/img/defaulPerfil_IMG/perfil_02.svg" class="w-10 h-10 m-2 ">
                    <p class="text-white text-2xl p-2 js-menu-label hidden">Perfil</p>
                    </div>
                    <div class="js-menu-div flex flex-row hover:bg-(--color-secondary) hover:rounded-4xl cursor-pointer items-center justify-center">
                    <img src="../assets/img/gear-fill.svg" alt="Configurações" class="w-10 h-10 m-2 ">
                    <p class="text-white text-2xl p-2 js-menu-label hidden">Configurações</p>
                    </div>
                    <div class="js-menu-div flex flex-row hover:bg-(--color-secondary) hover:rounded-4xl cursor-pointer items-center justify-center">
                    <img src="../assets/img/Group 3.svg" class="w-10 h-10 m-2 ">
                    <p class="text-white text-2xl p-2 js-menu-label hidden">FeedBack</p>
                    </div>
                </div>
            </div>    
        `;
        
        // Passo 2: Adicionar os eventos de clique aos botões
        const btnAbrir = document.querySelector('#btn-abrir');
        
        btnAbrir.addEventListener('click', () => {
            const menu = document.querySelector('#menu');
            const icons1 = document.querySelector('#icons1');
            const icons2 = document.querySelector('#icons2');
            const labels = document.querySelectorAll('.js-menu-label');
            const menuDivs = document.querySelectorAll('.js-menu-div');
            

            menuDivs.forEach(div => {
                div.classList.toggle('justify-start');
                div.classList.toggle('justify-center');
                div.classList.toggle('w-full');
                div.classList.toggle('hover:px-5');
            });

            labels.forEach(label => {
                label.classList.toggle('hidden');
                label.classList.toggle('block');
                label.classList.toggle('px-2');
            });
            
            icons1.classList.toggle('items-start'); 
            icons2.classList.toggle('items-start');
            icons1.classList.add('px-3');
            icons2.classList.add('px-3');
            menu.classList.toggle('w-80');
        });
    }
}

customElements.define('sidebar-left', Siderbar);
