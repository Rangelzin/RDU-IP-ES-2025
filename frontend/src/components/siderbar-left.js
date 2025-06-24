import { jwtDecode } from '/src/utils/jwtDecode.js';
import { decodificarPermissoesStrToVet } from '/src/utils/roleCoderAndDecoder.js';

class Siderbar extends HTMLElement {
    async connectedCallback() {
        // Grupo de itens de busca (search)
        const searchMenuItems = [
            {
                id: "search-exame-result",
                text: "Buscar Resultados",
                icon: "/assets/img/search2.svg",
                requiredRole: ["paciente"],
                group: 1
            },
            {
                id: "search-admin-patient",
                text: "Buscar Paciente",
                icon: "/assets/img/pacient.svg",
                requiredRole: ["admin"],
                group: 1
            },
            {
                id: "search-admin-user",
                text: "Buscar Usuário",
                icon: "/assets/img/user.svg",
                requiredRole: ["admin"],
                group: 1
            },
            {
                id: "search-patient",
                text: "Buscar Paciente",
                icon: "/assets/img/pacient.svg",
                requiredRole: ["medico", "enfermeiro"],
                group: 1
            },
            {
                id: "search-exame",
                text: "Buscar Exame",
                icon: "/assets/img/exam-seach.svg",
                requiredRole: ["medico", "enfermeiro"],
                group: 1
            }
        ];

        // Todos os itens do menu
        const allMenuItems = [
            {
                id: "main-page",
                text: "Página Principal",
                icon: "/assets/img/dashbord.svg",
                requiredRole: ["admin", "medico", "enfermeiro", "paciente", "outros"],
                group: 1
            },
            {
                id: "new-record",
                text: "Nova Ficha",
                icon: "/assets/img/Group 8.svg",
                requiredRole: ["medico", "enfermeiro", "outros"],
                group: 1
            },
            ...searchMenuItems,
            {
                id: "profile",
                text: "Perfil",
                icon: "/assets/img/defaulPerfil_IMG/perfil_02.svg",
                requiredRole: ["admin", "medico", "enfermeiro", "paciente", "outros"],
                group: 2
            },
            {
                id: "settings",
                text: "Configurações",
                icon: "/assets/img/gear-fill.svg",
                requiredRole: "configuracoes_sistema",
                group: 2
            }
        ];


        
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

        const generateHtml = (items) => {
            return items.map(item => `
                <div id="${item.id}" class="js-menu-div flex flex-row hover:bg-[var(--color-secondary)] hover:rounded-4xl cursor-pointer items-center justify-center">
                    <img src="${item.icon}" alt="${item.text}" class="w-10 h-10 m-2">
                    <p class="text-white text-2xl p-2 js-menu-label hidden">${item.text}</p>
                </div>
            `).join('');
        };

        const menuItemsHtmlGroup1 = generateHtml(authorizedMenuItems.filter(item => item.group === 1));
        const menuItemsHtmlGroup2 = generateHtml(authorizedMenuItems.filter(item => item.group === 2));

        this.innerHTML = `
            <div id="menu" class="hidden lg:flex flex-col justify-between bg-[var(--color-primary)] w-20 h-screen">   
                <div id="icons1" class="flex flex-col items-center justify-center">
                    <div id="btn-abrir" class="js-menu-div flex flex-row hover:bg-[var(--color-secondary)] hover:rounded-4xl cursor-pointer items-center justify-center">
                        <img src="/assets/img/menu.svg" alt="Menu" class="rotate-180 w-12 h-12 m-2">
                        <p class="text-white text-2xl p-2 js-menu-label hidden">Menu</p>
                    </div>
                    ${menuItemsHtmlGroup1}
                </div>  
                
                <div id="icons2" class="flex flex-col items-center justify-center">
                    ${menuItemsHtmlGroup2}
                    <div id="logout" class="js-menu-div flex flex-row hover:bg-[var(--color-secondary)] hover:rounded-4xl cursor-pointer items-center justify-center">
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


        const mainPage = this.querySelector('#main-page-admin, #main-page-users');
        const newRecord = this.querySelector('#new-record');
        const searchExameResult = this.querySelector('#search-exame-result');
        const searchAdminPatient = this.querySelector('#search-admin-patient');
        const searchAdminUser = this.querySelector('#search-admin-user'); // Este ID não existe na sua lista de itens
        const searchPatient = this.querySelector('#search-patient');
        const searchExame = this.querySelector('#search-exame');
        const settings = this.querySelector('#settings');

        switch (userRolesArray[0]) {
            case 'paciente':
                if (mainPage) {
                    mainPage.addEventListener('click', () => {
                        window.location.href = '/paciente';
                    });
                }
                if (searchExameResult) {
                    searchExameResult.addEventListener('click', () => {
                        window.location.href = '/main/usuario/exam_status';
                    });
                }
                break;
            
            case 'admin':
                if (mainPage) {
                    mainPage.addEventListener('click', () => {
                        window.location.href = '/admin';
                    });
                }
                if (searchAdminPatient) {
                    searchAdminPatient.addEventListener('click', () => {
                        window.location.href = '/admin/paciente';
                    });
                }
                if (searchAdminUser) {

                    searchAdminUser.addEventListener('click', () => {
                        window.location.href = '/admin/usuario';
                    });
                }
                if (settings) {
                    settings.addEventListener('click', () => {
                        // Rota para configurações ainda não existe.
                        // window.location.href = '/admin/configuracoes';
                        console.log('Navegação para Configurações (rota não implementada)');
                    });
                }
                break;
            
            case 'medico':
            case 'enfermeiro':
                if (mainPage) {
                    mainPage.addEventListener('click', () => {
                        window.location.href = `/main`;
                    });
                }
                if (newRecord) {
                    newRecord.addEventListener('click', () => {
                        window.location.href = `/main/usuario/exame`;
                    });
                }
                if (searchPatient) {
                    // Rota para '/main/pacientes' ainda não existe.
                    searchPatient.addEventListener('click', () => {
                        // window.location.href = `/main/pacientes`;
                        console.log('Navegação para Buscar Pacientes (rota não implementada)');
                    });
                }
                if (searchExame) {
                    searchExame.addEventListener('click', () => {
                        window.location.href = `/main/usuario/search_exam`;
                    });
                }
                break;

            case 'outros':
                if (mainPage) {
                    mainPage.addEventListener('click', () => {
                        window.location.href = '/main/ACS';
                    });
                }
                if (newRecord) {
                    newRecord.addEventListener('click', () => {
                         window.location.href = `/main/usuario/exame`;
                    });
                }
                break;

            default:
                // Nenhuma ação para perfis não mapeados
                break;
        }
    }
}
customElements.define('sidebar-left', Siderbar);
