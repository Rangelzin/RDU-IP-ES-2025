import { jwtDecode } from '/src/utils/jwtDecode.js';
import { decodificarPermissoesStrToVet } from '/src/utils/roleCoderAndDecoder.js';

class Siderbar extends HTMLElement {
    async connectedCallback() {
        // PASSO 1: Definir os links (href) corretos para cada item e para cada role.
        const searchMenuItems = [
            { id: "search-exame-result", text: "Buscar Resultados", icon: "/assets/img/search2.svg", href: "/main/usuario/exam_status", requiredRole: ["paciente"], group: 1 },
            { id: "search-admin-patient", text: "Buscar Paciente", icon: "/assets/img/pacient.svg", href: "/admin/paciente", requiredRole: ["admin"], group: 1 },
            { id: "search-admin-user", text: "Buscar Usuário", icon: "/assets/img/user.svg", href: "/admin/usuario", requiredRole: ["admin"], group: 1 },
            { id: "search-patient", text: "Buscar Paciente", icon: "/assets/img/pacient.svg", href: "/main/ACS", requiredRole: ["medico", "enfermeiro", "outros"], group: 1 },
            { id: "search-exame", text: "Buscar Exame", icon: "/assets/img/exam-seach.svg", href: "/main/usuario/search_exam", requiredRole: ["medico", "enfermeiro"], group: 1 }
        ];

        const allMenuItems = [
            { id: "main-page-admin", text: "Página Principal", icon: "/assets/img/dashbord.svg", href: "/admin", requiredRole: ["admin"], group: 1 },
            { id: "main-page-users", text: "Página Principal", icon: "/assets/img/dashbord.svg", href: "/main", requiredRole: ["medico", "enfermeiro", "outros"], group: 1 },
            { id: "main-page-patient", text: "Página Principal", icon: "/assets/img/dashbord.svg", href: "/paciente", requiredRole: ["paciente"], group: 1 },
            { id: "new-record", text: "Nova Ficha", icon: "/assets/img/Group 8.svg", href: "/main/usuario/exame", requiredRole: ["medico", "enfermeiro", "outros"], group: 1 },
            ...searchMenuItems,
            { id: "profile", text: "Perfil", icon: "/assets/img/defaulPerfil_IMG/perfil_02.svg", href: "", requiredRole: ["admin", "medico", "enfermeiro", "paciente", "outros"], group: 2 },
            { id: "settings", text: "Configurações", icon: "/assets/img/gear-fill.svg", href: "", requiredRole: "configuracoes_sistema", group: 2 }
        ];

        // Decodificação de roles e filtro dos itens autorizados (seu código aqui está perfeito)
        let userRolesArray = [];
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            if (decodedToken && decodedToken.payload) {
                const roleString = decodedToken.payload.role;
                userRolesArray = await decodificarPermissoesStrToVet(roleString);
            }
        }
        
        const authorizedMenuItems = allMenuItems.filter(item => {
            if (Array.isArray(item.requiredRole)) {
                return item.requiredRole.some(required => userRolesArray.includes(required));
            }
            return userRolesArray.includes(item.requiredRole);
        });

        // PASSO 2: Gerar os itens como tags <a>, que são links funcionais por natureza.
        const generateHtml = (items) => {
            return items.map(item => `
                <a href="${item.href}" id="${item.id}" class="js-menu-div flex flex-row hover:bg-[var(--color-secondary)] hover:rounded-4xl cursor-pointer items-center justify-center no-underline">
                    <img src="${item.icon}" alt="${item.text}" class="w-10 h-10 m-2">
                    <p class="text-white text-2xl p-2 js-menu-label hidden">${item.text}</p>
                </a>
            `).join('');
        };

        const menuItemsHtmlGroup1 = generateHtml(authorizedMenuItems.filter(item => item.group === 1));
        const menuItemsHtmlGroup2 = generateHtml(authorizedMenuItems.filter(item => item.group === 2));

        // Renderização do HTML
        this.innerHTML = `
            <div id="menu" class="flex flex-col justify-between bg-[var(--color-primary)] w-20 h-screen">   
                <div id="icons1" class="flex flex-col items-center justify-center">
                    <div id="btn-abrir" class="js-menu-div flex flex-row hover:bg-[var(--color-secondary)] hover:rounded-4xl cursor-pointer items-center justify-center no-underline">
                        <img src="/assets/img/menu.svg" alt="Menu" class="rotate-180 w-12 h-12 m-2">
                        <p class="text-white text-2xl p-2 js-menu-label hidden">Menu</p>
                    </div>
                    ${menuItemsHtmlGroup1}
                </div>  
                <div id="icons2" class="flex flex-col items-center justify-center">
                    ${menuItemsHtmlGroup2}
                    <div id="logout" class="js-menu-div flex flex-row hover:bg-[var(--color-secondary)] hover:rounded-4xl cursor-pointer items-center justify-center no-underline">
                        <img src="/assets/img/logout.svg" alt="Sair" class="w-12 h-12 m-2">
                        <p class="text-white text-2xl p-2 js-menu-label hidden">Sair</p>
                    </div>
                </div>
            </div>   
        `;
        
        const btnAbrir = this.querySelector('#btn-abrir');
        if (btnAbrir) {
            btnAbrir.addEventListener('click', () => {
                const menu = this.querySelector('#menu');
                const labels = this.querySelectorAll('.js-menu-label');
                const menuDivs = this.querySelectorAll('.js-menu-div');
                
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
                menu.classList.toggle('w-80');
            });
        }

        const btnLogout = this.querySelector('#logout');
        if (btnLogout) {
            btnLogout.addEventListener('click', () => {
                const modalHTML = `
                    <div id="logout-confirm-modal" class="fixed inset-0 bg-black/60 flex items-center justify-center" style="z-index: 50;">
                        <div class="bg-white p-7 rounded-2xl shadow-xl text-center w-80 max-w-sm mx-4 border-2 border-[var(--color-primary)]">
                            <h2 class="text-2xl font-bold text-[var(--color-primary)] mb-4">Confirmar Saída</h2>
                            <p class="text-gray-600 mb-8">Você tem certeza que deseja encerrar a sessão?</p>
                            <div class="flex justify-center gap-4">
                                <button id="cancel-logout-btn" class="px-6 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition-colors">Cancelar</button>
                                <button id="confirm-logout-btn" class="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors">Sair</button>
                            </div>
                        </div>
                    </div>
                `;
                
                document.body.insertAdjacentHTML('beforeend', modalHTML);

                const confirmBtn = document.getElementById('confirm-logout-btn');
                const cancelBtn = document.getElementById('cancel-logout-btn');
                const modal = document.getElementById('logout-confirm-modal');

                const closeModal = () => { if (modal) modal.remove(); };

                confirmBtn.addEventListener('click', () => {
                    localStorage.removeItem('token');
                    window.location.replace('/login');
                });

                cancelBtn.addEventListener('click', closeModal);

                modal.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });
            });
        }
    }
}

customElements.define('sidebar-left', Siderbar);