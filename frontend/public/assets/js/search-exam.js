
import { buscarExames } from "../../../app/getExam.js"; 

document.addEventListener('DOMContentLoaded', () => {

    const cardsContainer = document.getElementById('lista-exames'); 
    const searchInput = document.getElementById('searchInput');     
    const searchButton = document.getElementById('searchButton');   

    // NOVO: Elementos dos controles de paginação
    const prevPageBtn = document.getElementById('prevPageBtn');
    const nextPageBtn = document.getElementById('nextPageBtn');
    const pageInfo = document.getElementById('pageInfo');
    
    let allExams = []; // Irá armazenar todos os exames obtidos da API
    let currentFilteredExams = []; // Irá armazenar os exames atualmente filtrados (ou todos, se não houver filtro)
    
    // NOVO: Variáveis de estado da paginação
    let currentPage = 1;
    const itemsPerPage = 3; // Mostrar 2 exames por página, conforme solicitado

    // A função renderCards é responsável por limpar o container e exibir os cards
    // AGORA: Ela recebe a lista COMPLETA de exames a serem paginados
    function renderCards(examesToPaginate) {
        currentFilteredExams = examesToPaginate; // Atualiza a lista de exames que estão sendo paginados
        const totalPages = Math.ceil(currentFilteredExams.length / itemsPerPage);

        // Garante que a página atual não exceda o número total de páginas (se a lista de exames diminuir por filtro)
        if (currentPage > totalPages && totalPages > 0) {
            currentPage = totalPages;
        } else if (totalPages === 0) {
            currentPage = 0; // Se não houver exames, não há página 1
        } else if (currentPage === 0 && totalPages > 0) {
            currentPage = 1; // Garante que a página comece em 1 se houver exames
        }

        cardsContainer.innerHTML = ''; // Limpa o contêiner

        // Se não houver exames, exibe a mensagem e desabilita a paginação
        if (!currentFilteredExams || currentFilteredExams.length === 0) {
            cardsContainer.innerHTML = '<p class="m-10 col-span-full text-3xl text-center text-gray-500">Nenhum exame encontrado.</p>';
            pageInfo.textContent = 'Página 0 de 0';
            prevPageBtn.disabled = true;
            nextPageBtn.disabled = true;
            return; 
        } 
        
        // Calcula o índice inicial e final dos exames para a página atual
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const examsForCurrentPage = currentFilteredExams.slice(startIndex, endIndex);

        // Atualiza a informação da página
        pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;
        
        // Habilita/desabilita os botões de paginação
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages;

        // Para cada exame na página atual, cria um card e o adiciona ao container
        examsForCurrentPage.forEach(exame => {
            const card = createExamCard(exame);
            cardsContainer.appendChild(card);
        });
    }

    // A função createExamCard é responsável por criar o elemento HTML para um único card de exame
    function createExamCard(exame) {
        const card = document.createElement('div');

        let statusClassBg = '';   
        let statusClassText = ''; 
        let statusDisplay = '';   

        if (exame.data_resultado) { 
            statusClassBg = 'bg-status-available-bg'; 
            statusClassText = 'text-status-available-text';
            statusDisplay = 'Finalizado';
        } else {
            statusClassBg = 'bg-status-in-progress-bg'; 
            statusClassText = 'text-status-in-progress-text';
            statusDisplay = 'Em andamento';
        }

        // As classes de cor de fundo e texto voltam a usar as variáveis do seu tema
        let integrityBgColorClass = 'bg-[var(--color-quaternary)]'; 
        let integrityTextColorClass = 'text-[var(--color-secondary)]'; 

        // O 'if' para integridade_exame ainda existe, mas não altera as cores principais do card,
        // apenas a lógica interna se necessário para outros elementos.
        // Se desejar que a cor do card MUDE novamente com base na integridade, avise.
        const integrityStatus = exame.integridade_exame ? exame.integridade_exame.toLowerCase() : '';

        // Definindo a classe do card principal
        card.className = `relative ${integrityBgColorClass} rounded-lg border border-[var(--color-secondary)] shadow-sm ${integrityTextColorClass} overflow-hidden`;

        // Formata 'created_at' para exibir como "DD/MM/YYYY"
        let dataEntradaFormatada = '';
        if (exame.created_at) {
            try {
                const data = new Date(exame.created_at);
                dataEntradaFormatada = data.toLocaleDateString('pt-BR');
            } catch (e) {
                console.warn('Erro ao formatar data_entrada:', e);
                dataEntradaFormatada = 'Data inválida';
            }
        } else {
            dataEntradaFormatada = 'N/A'; 
        }

        card.innerHTML = `
            <div class="flex items-center space-x-2 p-2 px-4 border-b border-[--color-secondary]/40">
                <i class="fas fa-file-alt text-[var(--color-secondary)] text-sm"></i>
                <h2 class="font-semibold text-sm ${integrityTextColorClass}">Resultado do exame</h2>
                <span class="absolute top-2 right-4 px-2 py-0.5 text-xs font-bold rounded-full border uppercase
                            ${statusClassBg} ${statusClassText} border-${statusClassText.replace('text-', '')}">
                    ${statusDisplay}
                </span>
            </div>
            <div class="p-3 px-4">
                <div class="grid grid-cols-1 gap-3 mb-3 md:grid-cols-3">
                    <div class="item-info">
                        <p class="text-xs ${integrityTextColorClass} font-medium opacity-90 uppercase">Nº de Protocolo</p>
                        <p class="font-semibold text-sm ${integrityTextColorClass}">${exame.protocolo}</p> 
                    </div>
                    <div class="item-info">
                        <p class="text-xs ${integrityTextColorClass} font-medium opacity-90 uppercase">Data de Entrada</p>
                        <p class="font-semibold text-sm ${integrityTextColorClass}">${dataEntradaFormatada}</p>
                    </div>
                    <div class="item-info">
                        <p class="text-xs ${integrityTextColorClass} font-medium opacity-90 uppercase">Nome da Paciente</p>
                        <p class="font-semibold text-sm ${integrityTextColorClass}">${exame.paciente_name}</p> 
                    </div>
                </div>
                <div class="flex justify-end items-center space-x-4 pt-2 border-t border-dashed border-[--color-secondary]/40">
                    <a href="#" class="text-sm font-semibold text-[var(--color-secondary)] no-underline transition-opacity duration-200 flex items-center space-x-1 hover:opacity-70 hover:underline">
                        <i class="fas fa-eye"></i> Ir para a ficha
                    </a>
                </div>
            </div>
        `;
        return card;
    }

    // Função para filtrar os exames com base no texto de busca
    function filterExams() {
        const query = searchInput.value.toLowerCase().trim(); 

        const filteredExams = allExams.filter(exame => {
            const pacienteName = exame.paciente_name ? exame.paciente_name.toLowerCase() : '';
            const protocolo = exame.protocolo ? exame.protocolo.toLowerCase() : ''; 

            return pacienteName.includes(query) || protocolo.includes(query);
        });

        currentPage = 1; // NOVO: Ao filtrar, sempre volta para a primeira página
        renderCards(filteredExams); // Renderiza os cards com a lista filtrada
    }

    // NOVO: Função para mudar a página
    function changePage(direction) {
        const totalPages = Math.ceil(currentFilteredExams.length / itemsPerPage);
        
        // Calcula a nova página
        const newPage = currentPage + direction;

        // Verifica se a nova página está dentro dos limites válidos
        if (newPage >= 1 && newPage <= totalPages) {
            currentPage = newPage;
            renderCards(currentFilteredExams); // Renderiza a nova página com os exames já filtrados
        }
    }

    // A função fetchAndRenderExams agora busca os dados e os armazena em allExams
    async function fetchAndRenderExams(){
        try {
            const dadosReais = await buscarExames(); 
            allExams = dadosReais; // Armazena os dados buscados na variável allExams
            currentPage = 1; // NOVO: Redefine a página para 1 ao carregar novos dados
            renderCards(allExams); // Renderiza todos os exames inicialmente (primeira página)
        } catch (error) {
            console.error('Erro ao buscar e renderizar exames: ', error);
            cardsContainer.innerHTML = '<p class="col-span-full text-center text-red-500">Não foi possível carregar os exames. Tente novamente mais tarde.</p>';
        }
    }
    
    // --- ADICIONA OS LISTENERS PARA A BARRA DE PESQUISA E PAGINAÇÃO ---
    searchButton.addEventListener('click', filterExams); 

    searchInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            console.log("Tecla Enter pressionada, filtrando...");
            filterExams();
        } else {
            // Filtra em tempo real ao digitar (melhora a experiência do usuário)
            filterExams(); 
        }
    });

    // NOVO: Event listeners para os botões de paginação
    prevPageBtn.addEventListener('click', () => changePage(-1)); // Voltar uma página
    nextPageBtn.addEventListener('click', () => changePage(1));  // Avançar uma página

    // --- CARGA INICIAL AO CARREGAR A PÁGINA ---
    fetchAndRenderExams();
});