document.addEventListener('DOMContentLoaded', () => {

    const cardsContainer = document.getElementById('cardsContainer');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const paginationControls = document.getElementById('paginationControls'); 
    
    let allPatients = [];
    let statusPatients = [];

    let currentPage = 1;
    const itemsPerPage = 6;

    const mockData = [
        {   paciente_id: 1, 
            nome_completo : 'Maria Das Graças Ferreira Silva', 
            cpf: '555.666.777-36',
            logradouro: 'Rua dos Bobos',
            numero: '0',
            complemento: 'QD 98 LT 98',
            bairro: 'Setor Marista',
            municipio: 'Goiânia',
            uf: 'GO',
            cep: '74150-000',
            telefone: '(62) 91234-5678', 
            Cartao_sus: '898 0000 1111 2222',
            data_resultado: '2023-10-01',
        },
        {   paciente_id: 2, 
            nome_completo : 'Josefina de Jesus Pereira', 
            cpf: '123.123.123-66',
            logradouro: 'Rua dos Bobos',
            numero: '0',
            complemento: 'QD 99 LT 99',
            bairro: 'Setor Marista',
            municipio: 'Goiânia',
            uf: 'GO',
            cep: '74150-000',
            telefone: '(62) 91234-5678', 
            Cartao_sus: '123 1234 2222 2444',
            data_resultado: '2021-10-01',
        },
        {   paciente_id: 3, 
            nome_completo : 'Anastácia Silva Mendes', 
            cpf: '321.321.321-99',
            logradouro: 'Rua das Flores',
            numero: '567',
            complemento: 'Casa',
            bairro: 'Jardim Primavera',
            municipio: 'Goiânia',
            uf: 'GO',
            cep: '74210-123',
            telefone: '(62) 99999-8888', 
            Cartao_sus: '987 6543 2109 8765',
            data_resultado: '2022-05-15',
        },
    ];
    
    const date = new Date();
    const year = 365
    const formattedDate = date.toISOString().slice(0, 10);

    function renderDate(dateResut, dateCurrent) {
        const data1 = new Date(dateCurrent);
        const data2 = new Date(dateResut);
        const diferenca = data1.getTime() - data2.getTime(); 
        return dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));;
    }

    for (let i = 0; i < mockData.length; i += 1) {
        const diasAtraso = renderDate(mockData[i].data_resultado, formattedDate);
        statusPatients.push({
            id: mockData[i].paciente_id,
            nome: mockData[i].nome_completo,
            endereco: `${mockData[i].logradouro}, ${mockData[i].numero} ${mockData[i].complemento}, ${mockData[i].bairro}, ${mockData[i].municipio} - ${mockData[i].uf}, CEP: ${mockData[i].cep}`,
            cpf: mockData[i].cpf,
            cartao_sus: mockData[i].Cartao_sus,
            status: diasAtraso > year ? 'Atrasada' : 'Em dia',
            dias_de_atraso: diasAtraso,
        });
    }

    async function fetchAndRenderPatients() {
        try {
            const patients = statusPatients.filter(p => p.status === 'Atrasada');
            allPatients = patients;
            renderCards(allPatients);
        } catch (error) {
            console.error('Erro ao buscar pacientes:', error);
            cardsContainer.innerHTML = '<p class="col-span-full text-center text-red-500">Não foi possível carregar os pacientes.</p>';
        }
    }

    function renderCards(patients) {
        cardsContainer.innerHTML = '';
        currentPage = 1
        if (patients.length === 0) {
            cardsContainer.innerHTML = '<p class="m-10 col-span-full text-3xl text-center text-gray-500">Nenhum paciente com visita pendente encontrado.</p>';
            renderPaginationControls(0, patients);
            return;
        }
        displayPage(patients);
        
    }

    function displayPage(patients) {
        cardsContainer.innerHTML = ''; 
        
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedPatients = patients.slice(startIndex, endIndex);

        paginatedPatients.forEach(patient => {
            const card = createPatientCard(patient);
            cardsContainer.appendChild(card);
        });

        const totalPages = Math.ceil(patients.length / itemsPerPage);
        renderPaginationControls(totalPages, patients);
    }
    
    function renderPaginationControls(totalPages, patients) {
    paginationControls.innerHTML = ''; // Limpa botões antigos

    if (totalPages <= 1) return; // Não mostra controles se houver apenas uma página

    // --- LÓGICA DO BOTÃO "ANTERIOR" (igual a antes) ---
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

    // --- LÓGICA AVANÇADA PARA OS BOTÕES DE PÁGINA ---
    const window = 1; // Quantos vizinhos mostrar ao redor da página atual (1 para cada lado)
    let lastPageShown = 0; // Ajuda a saber quando inserir as reticências

    for (let i = 1; i <= totalPages; i++) {
        // Condições para mostrar um botão de número de página:
        const isFirstPage = i === 1;
        const isLastPage = i === totalPages;
        const isInWindow = i >= currentPage - window && i <= currentPage + window;

        const shouldShowButton = isFirstPage || isLastPage || isInWindow;

        if (shouldShowButton) {
            // Se houver um salto entre o último número mostrado e o atual, insere "..."
            if (i > lastPageShown + 1) {
                const ellipsis = document.createElement('span');
                ellipsis.innerText = '...';
                ellipsis.className = 'px-4 py-2 text-gray-500';
                paginationControls.appendChild(ellipsis);
            }
            
            // Cria o botão da página
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

            lastPageShown = i; // Atualiza o último número que foi mostrado
        }
    }

    // --- LÓGICA DO BOTÃO "PRÓXIMO" (igual a antes) ---
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
        card.className = 'bg-[#D3C8E2] border-2 border-[#C9C4CE] p-4 rounded-lg shadow-md flex flex-col items-center cursor-pointer w-75 h-75 2xl:w-90 2xl:h-90';
        
        let statusColorClass = '';
        if (patient.dias_de_atraso > year * 3 ) {
            statusColorClass = 'bg-red-500';
        } else if (patient.dias_de_atraso > year) {
            statusColorClass = 'bg-yellow-500';
        }

        card.innerHTML = `
            <img src="../assets/img/defaulPerfil_IMG/perfil_02.svg" alt="Foto do Paciente" class="w-30 h-30 rounded-full mb-2 border-2 border-(--color-primary) shadow-xl"> 
            <h3 class="2xl:p-2 font-bold text-center text-2xl xl:text-3xl text-[var(--color-primary)]">${patient.nome}</h3>
            <p class="2xl:p-2 text-xl xl:text-2xl text-gray-600">${patient.cpf}</p>
            <span class="mt-2 text-xl xl:text-2xl text-white font-bold py-1 px-4 rounded-full ${statusColorClass}">${patient.status}</span>
        `;
        
        card.addEventListener('click', () => {
            console.log(`Card clicado! Abrindo overlay para o paciente: ${patient.nome}`);
            openOverlay(patient);
        });
        
        return card;
    }

    // --- LÓGICA DO OVERLAY ---

    function openOverlay(patient) {
        const overlay = document.createElement('div');
        overlay.className = 'fixed inset-0 bg-black/60 flex items-center justify-center font-sans opacity-0 transition-opacity duration-300';
        overlay.id = 'dynamic-overlay';

        // Fecha overlay ao clicar fora da div principal
        overlay.addEventListener('mousedown', (event) => {
            // Se o clique for diretamente no overlay (e não em um filho)
            if (event.target === overlay) {
                closeOverlay();
            }
        });

        document.body.appendChild(overlay);
        showPatientInfoState(overlay, patient); // Passamos o overlay para a função de estado
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
            <div class="flex-col rounded-2xl border-4 border-white xl:w-[500px] w-[350px] bg-[#D3C8E2] flex items-center p-4">
                <div class="rounded-full mt-2 xl:h-[150px] h-[120px] xl:w-[150px] w-[120px] bg-white flex-shrink-0">
                    <img class="h-full w-full object-cover" src="../assets/img/defaulPerfil_IMG/perfil_02.svg" alt="Foto">
                </div>
                <div class="rounded-2xl flex flex-col bg-white h-auto w-full p-4 mt-4 text-sm xl:text-base">
                    <p class="font-bold">Nome: <span class="font-normal">${patient.nome}</span></p>
                    <p class="font-bold">Endereço: <span class="font-normal">${patient.endereco}</span></p>
                    <p class="font-bold">CPF: <span class="font-normal">${patient.cpf}</span></p>
                    <p class="font-bold">Cartão SUS: <span class="font-normal">${patient.cartao_sus}</span></p>
                </div>
                <div class="flex flex-col xl:flex-row mt-4 text-xl font-bold items-center gap-4">
                    <p class="text-[var(--color-primary)]">SITUAÇÃO DE VISITA:</p>
                    <button id="continueBtn" class="bg-[var(--color-primary)] text-white px-6 py-2 rounded-xl text-lg hover:bg-[var(--color-secondary)] transition-colors">Continuar</button>
                </div>
            </div>
        `;
        // CORREÇÃO: Procuramos o botão dentro do 'overlay', e não no 'document' todo.
        overlay.querySelector('#continueBtn').onclick = () => showVisitQuestionState(overlay, patient);
    }
    function showVisitQuestionState(overlay, patient) {
        overlay.innerHTML = `
            <div class="flex-col rounded-2xl border-4 border-white xl:w-[500px] w-[350px] bg-[#D3C8E2] flex items-center p-8 text-center">
                 <h2 class="text-2xl font-bold text-[var(--color-primary)] mb-6">Foi possível realizar a visita ao paciente?</h2>
                 <div class="w-full flex flex-col gap-4">
                     <button id="visitSuccessBtn" class="bg-white text-green-600 border-2 border-green-600 rounded-lg p-3 font-semibold hover:bg-green-50 transition-colors">Sim, foi possível realizar com sucesso</button>
                     <button id="visitFailBtn" class="bg-white text-red-600 border-2 border-red-600 rounded-lg p-3 font-semibold hover:bg-red-50 transition-colors">Não teve como realizar a visita</button>
                 </div>
            </div>
        `;
        // CORREÇÃO: Aplicada aqui também.
        overlay.querySelector('#visitSuccessBtn').onclick = () => showObservationState(overlay, patient, true);
        overlay.querySelector('#visitFailBtn').onclick = () => showObservationState(overlay, patient, false);
    }
    function showObservationState(overlay, patient, wasSuccessful) {
        overlay.innerHTML = `
           <div class="flex-col rounded-2xl border-4 border-white xl:w-[500px] w-[350px] bg-[#D3C8E2] flex items-center p-4">
                <div class="rounded-full mt-2 xl:h-[100px] h-[80px] xl:w-[100px] w-[80px] bg-white flex-shrink-0">
                    <img class="h-full w-full object-cover" src="../assets/img/defaulPerfil_IMG/perfil_02.svg" alt="Foto">
                </div>
                <p class="font-bold text-[var(--color-primary)] mt-2">${patient.nome}</p>
                <div class="w-full p-4 mt-2">
                    <label for="observation" class="text-left block mb-2 font-bold text-[var(--color-primary)]">Adicione alguma observação abaixo:</label>
                    <textarea id="observation" class="outline-none focus:ring-0 bg-white w-full h-32 p-2 rounded-lg" placeholder="Paciente orientado(a)..."></textarea>
                </div>
                <button id="submitObservationBtn" class="bg-[var(--color-primary)] text-white px-6 py-2 rounded-xl text-lg hover:bg-[var(--color-secondary)] transition-colors">Continuar</button>
            </div>
        `;
        // CORREÇÃO: E aqui também.
        overlay.querySelector('#submitObservationBtn').onclick = () => {
            const observation = overlay.querySelector('#observation').value;
            console.log("Enviando para o backend:", { patientId: patient.id, visitSuccessful: wasSuccessful, observation });
            showSuccessState(overlay);
        };
    }
    function showSuccessState(overlay) {
        overlay.innerHTML = `
            <div class="flex-col rounded-2xl border-4 border-green-500 w-auto bg-[#F0EBF6] flex items-center p-8 text-center">
                <div class="h-16 w-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
                    <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h2 class="text-xl font-bold text-gray-800">Observação enviada com sucesso!</h2>
                <button id="finishBtn" class="mt-4 bg-[var(--color-primary)] text-white px-8 py-2 rounded-lg hover:bg-[var(--color-secondary)] transition-colors">Finalizar</button>
            </div>
        `;
        // CORREÇÃO: E finalmente aqui.
        overlay.querySelector('#finishBtn').onclick = () => {
            closeOverlay();
            fetchAndRenderPatients();
        };
    }

    function filterPatients() {
        const query = searchInput.value.toLowerCase().trim();
        console.log(`Filtrando pacientes com a consulta: "${query}"`);

        // Filtra a partir da lista mestre 'allPatients'
        const filtered = allPatients.filter(patient => 
            patient.nome.toLowerCase().includes(query) ||
            patient.cpf.includes(query)
        );

        // Apenas renderiza o resultado filtrado, sem alterar a lista mestre
        renderCards(filtered);
    }
    
    // --- EVENT LISTENERS (Código Corrigido) ---
    searchButton.addEventListener('click', filterPatients);
    searchInput.addEventListener('keyup', (event) => {
    // AJUDA: A função de evento agora recebe o parâmetro 'event',
    // que contém informações sobre a tecla que foi pressionada.
    // Verifica se a tecla pressionada foi a 'Enter'
    if (event.key === 'Enter') {
        console.log("Tecla Enter pressionada, filtrando...");
        filterPatients();
    }
});

    // --- CARGA INICIAL ---
    fetchAndRenderPatients();
});