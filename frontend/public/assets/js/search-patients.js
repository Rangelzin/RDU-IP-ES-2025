// /assets/js/search-patients-visits.js
import { updatePatientStatus } from "/app/putStatusPatient.js"; // Importa a função de atualização de status, com o caminho ajustado.

import { buscarPacientes } from "/app/getPatients.js";

document.addEventListener('DOMContentLoaded', async () => {
    const cardsContainer = document.getElementById('cardsContainer');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const paginationControls = document.getElementById('paginationControls');

    let allPatients = [];
    let currentPage = 1;
    const itemsPerPage = 6;

    function formatarCPF(cpf) {
        if (!cpf) return 'N/A';
        cpf = String(cpf).replace(/\D/g, ''); // Remove tudo que não é dígito
        if (cpf.length === 11) {
            return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        }
        return cpf;
    }

    function formatarCartaoSus(cartaoSus) {
        if (!cartaoSus) return 'N/A';
        cartaoSus = String(cartaoSus).replace(/\D/g, ''); // Remove tudo que não é dígito
        if (cartaoSus.length === 15) {
            return cartaoSus.replace(/(\d{3})(\d{4})(\d{4})(\d{4})/, '$1 $2 $3 $4');
        }
        return cartaoSus;
    }

    async function fetchAndRenderPatients() {
        try {
            const fetchedPatients = await buscarPacientes(); //

            allPatients = fetchedPatients.map(patient => {
                let displayStatus = patient.status ? 'Ativo' : 'Inativo'; //

                return {
                    id: patient.id, //
                    nome: patient.nome_completo, //
                    endereco: `${patient.logradouro}, ${patient.numero} ${patient.complemento || ''}, ${patient.bairro}, ${patient.municipio} - ${patient.uf}, CEP: ${patient.cep}`, //
                    cpf: patient.cpf, //
                    cartao_sus: patient.cartao_sus, //
                    status: displayStatus,
                    rawStatus: patient.status // Guarda o status booleano original para a lógica do botão
                };
            });

            renderCards(allPatients);

        } catch (error) {
            console.error('Erro ao buscar pacientes:', error);
            cardsContainer.innerHTML = '<p class="col-span-full text-center text-red-500">Não foi possível carregar os pacientes.</p>';
            paginationControls.innerHTML = '';
        }
    }

    function renderCards(patientsToRender) {
        cardsContainer.innerHTML = '';
        currentPage = 1;

        if (patientsToRender.length === 0) {
            cardsContainer.innerHTML = '<p class="m-10 col-span-full text-3xl text-center text-gray-500">Nenhum paciente encontrado.</p>';
            renderPaginationControls(0, patientsToRender);
            return;
        }
        displayPage(patientsToRender);
    }

    function displayPage(patientsToDisplay) {
        cardsContainer.innerHTML = '';

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedPatients = patientsToDisplay.slice(startIndex, endIndex);

        paginatedPatients.forEach(patient => {
            const card = createPatientCard(patient);
            cardsContainer.appendChild(card);
        });

        const totalPages = Math.ceil(patientsToDisplay.length / itemsPerPage);
        renderPaginationControls(totalPages, patientsToDisplay);
    }

    function renderPaginationControls(totalPages, patients) {
        paginationControls.innerHTML = '';

        if (totalPages <= 1) return;

        const prevButton = document.createElement('button');
        prevButton.innerText = 'Anterior';
        prevButton.className = 'px-4 py-2 rounded-md bg-white text-[var(--color-primary)] font-semibold hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed';
        prevButton.disabled = currentPage === 1;
        prevButton.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                displayPage(patients);
            }
        });
        paginationControls.appendChild(prevButton);

        const windowSize = 1;
        let lastPageShown = 0;

        for (let i = 1; i <= totalPages; i++) {
            const isFirstPage = i === 1;
            const isLastPage = i === totalPages;
            const isInWindow = i >= currentPage - windowSize && i <= currentPage + windowSize;

            const shouldShowButton = isFirstPage || isLastPage || isInWindow;

            if (shouldShowButton) {
                if (i > lastPageShown + 1) {
                    const ellipsis = document.createElement('span');
                    ellipsis.innerText = '...';
                    ellipsis.className = 'px-4 py-2 text-gray-500';
                    paginationControls.appendChild(ellipsis);
                }

                const pageButton = document.createElement('button');
                pageButton.innerText = i;
                pageButton.className = 'px-4 py-2 rounded-md font-semibold';
                if (i === currentPage) {
                    pageButton.classList.add('bg-[var(--color-primary)]', 'text-white');
                } else {
                    pageButton.classList.add('bg-white', 'text-gray-700', 'hover:bg-gray-200');
                }
                pageButton.addEventListener('click', () => {
                    currentPage = i;
                    displayPage(patients);
                });
                paginationControls.appendChild(pageButton);

                lastPageShown = i;
            }
        }

        const nextButton = document.createElement('button');
        nextButton.innerText = 'Próximo';
        nextButton.className = 'px-4 py-2 rounded-md bg-white text-[var(--color-primary)] font-semibold hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed';
        nextButton.disabled = currentPage === totalPages;
        nextButton.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                displayPage(patients);
            }
        });
        paginationControls.appendChild(nextButton);
    }

    function createPatientCard(patient) {
        const card = document.createElement('div');
        card.className = 'bg-[var(--color-quaternary)] p-4 rounded-lg shadow-md flex flex-col items-center cursor-pointer w-75 h-75 2xl:w-90 2xl:h-90';

        let statusColorClass = '';
        if (patient.status === 'Ativo') {
            statusColorClass = 'bg-green-500';
        } else if (patient.status === 'Inativo') {
            statusColorClass = 'bg-red-500';
        } else {
            statusColorClass = 'bg-gray-500';
        }

        card.innerHTML = `
            <img src="/assets/img/defaulPerfil_IMG/perfil_02.svg" alt="Foto do Paciente" class="w-30 h-30 rounded-full mb-2 border-2 border-[var(--color-primary)] shadow-xl">
            <h3 class="2xl:p-2 font-bold text-center text-xl xl:text-2xl text-[var(--color-primary)]">${patient.nome}</h3>
            <p class="2xl:p-2 text-xl xl:text-2xl text-gray-600">${formatarCPF(patient.cpf)}</p>
            <span class="mt-2 text-sm xl:text-base text-white font-bold py-0.5 px-2 rounded-full ${statusColorClass}">${patient.status}</span>
            <div class="flex mt-4 gap-2">
                <button class="view-patient-btn bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white font-bold py-2.5 px-5 rounded-md text-sm shadow-md transition-colors duration-200">
                    Visualizar
                </button>
                <button onclick="handleStatusChange(${patient.id}, ${patient.rawStatus})"
                        class="status-toggle-btn ${patient.rawStatus ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white font-bold py-2.5 px-5 rounded-md text-sm shadow-md transition-colors duration-200">
                    ${patient.rawStatus ? 'Inativar' : 'Ativar'}
                </button>
            </div>
        `;

        const viewButton = card.querySelector('.view-patient-btn');
        if (viewButton) {
            viewButton.addEventListener('click', () => {
                console.log(`Botão Visualizar clicado para o paciente: ${patient.nome}`);
                openOverlay(patient); // Passa o objeto paciente completo
            });
        }

        return card;
    }

    window.handleStatusChange = async (patientId, currentStatus) => {
        const newStatus = !currentStatus;
        const action = newStatus ? 'Ativar' : 'Inativar';
        const confirmMessage = `Tem certeza que deseja ${action} o paciente com ID ${patientId}?`;

        if (confirm(confirmMessage)) {
            try {
                await updatePatientStatus(patientId, newStatus);
                alert(`Paciente ${action.toLowerCase()}do com sucesso!`);
                await fetchAndRenderPatients();
            } catch (error) {
                console.error(`Erro ao ${action.toLowerCase()} o paciente:`, error);
                alert(`Erro ao ${action.toLowerCase()} o paciente: ${error.message}`);
            }
        }
    };

    function openOverlay(patient) {
        const overlay = document.createElement('div');
        overlay.className = 'fixed inset-0 bg-black/60 flex items-center justify-center font-sans opacity-0 transition-opacity duration-300';
        overlay.id = 'dynamic-overlay';

        overlay.addEventListener('mousedown', (event) => {
            if (event.target === overlay) {
                closeOverlay();
            }
        });

        document.body.appendChild(overlay);
        showPatientInfoState(overlay, patient);
        document.body.style.overflow = 'hidden';

        setTimeout(() => {
            overlay.classList.remove('opacity-0');
        }, 10);
    }

    function closeOverlay() {
        const overlay = document.getElementById('dynamic-overlay');
        if (overlay) {
            overlay.classList.add('opacity-0');
            setTimeout(() => {
                document.body.removeChild(overlay);
                document.body.style.overflow = 'auto';
            }, 300);
        }
    }

    function showPatientInfoState(overlay, patient) {
        overlay.innerHTML = `
            <div class="flex-col rounded-2xl xl:w-[500px] w-[350px] bg-[var(--color-quaternary)] flex items-center p-4 relative">
                <button id="closeOverlayBtn" class="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-3xl font-bold">
                    &times;
                </button>
                <div class="rounded-full mt-2 xl:h-[150px] h-[120px] xl:w-[150px] w-[120px] bg-white flex-shrink-0 border-2 border-[var(--color-primary)]">
                    <img class="h-full w-full object-cover" src="/assets/img/defaulPerfil_IMG/perfil_02.svg" alt="Foto">
                </div>
                <div class="rounded-2xl flex flex-col bg-white h-auto w-full p-4 mt-4 text-sm xl:text-base text-gray-800">
                    <p class="font-bold">Nome: <span class="font-normal">${patient.nome}</span></p>
                    <p class="font-bold">Endereço: <span class="font-normal">${patient.endereco}</span></p>
                    <p class="font-bold">CPF: <span class="font-normal">${formatarCPF(patient.cpf)}</span></p>
                    <p class="font-bold">Cartão SUS: <span class="font-normal">${formatarCartaoSus(patient.cartao_sus)}</span></p>
                    <p class="font-bold">Status: <span class="font-normal ${patient.status === 'Ativo' ? 'text-green-600' : 'text-red-600'}">${patient.status}</span></p>
                    <div class="flex mt-4 gap-2 w-full justify-center">
                        <button onclick="handleStatusChange(${patient.id}, ${patient.rawStatus})"
                                class="status-toggle-btn w-full ${patient.rawStatus ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white font-bold py-2.5 px-5 rounded-md text-sm shadow-md transition-colors duration-200">
                            ${patient.rawStatus ? 'Inativar Paciente' : 'Ativar Paciente'}
                        </button>
                    </div>
                </div>
            </div>
        `;
        overlay.querySelector('#closeOverlayBtn').onclick = closeOverlay;
    }

    function filterPatients() {
        const query = searchInput.value.toLowerCase().trim();
        console.log(`Filtrando pacientes com a consulta: "${query}"`);

        const filtered = allPatients.filter(patient =>
            patient.nome.toLowerCase().includes(query) ||
            patient.cpf.includes(query)
        );
        renderCards(filtered);
    }

    searchButton.addEventListener('click', filterPatients);
    searchInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            console.log("Tecla Enter pressionada, filtrando...");
            filterPatients();
        }
    });

    await fetchAndRenderPatients();
});