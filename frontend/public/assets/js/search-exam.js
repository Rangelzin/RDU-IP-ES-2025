document.addEventListener('DOMContentLoaded', () => {

    const cardsContainer = document.getElementById('cardsContainer');
    
    
    let allExams = [];
    

   const mockData = [
        { 
            exam_id: 1, 
            nome_paciente : 'Maria Das Graças Ferreira Silva', 
            numero_protocolo : '45247834666',
            etapa_exame : 'Anamnese',
            status_exame : 'Finalizado',
        },
        { 
            exam_id: 2, 
            nome_paciente : 'Josefina de Jesus Pereira', 
            numero_protocolo : '543323429999',
            etapa_exame : 'Finalizado',
            status_exame : 'Comprometido',
        },
    ];

    allExams = mockData;

   
        async function fetchAndRenderExams(){
            try {
                renderCards(allExams);
            } catch (error) {
                console.error('Erro ao buscar exame: ', error)
                cardsContainer.innerHTML = '<p class="col-span-full text-center text-red-500">Não foi possível carregar os exames.</p>';
            }
        }
        
        function renderCards(exames){
            cardsContainer.innerHTML= '';
            if (exames.length === 0) {
                cardsContainer.innerHTML = '<p class="m-10 col-span-full text-3xl text-center text-gray-500">Nenhum exame cadastrado</p>'
                return;
            } 
            exames.forEach(exame => {
                const card = createExamCard(exame);
                cardsContainer.appendChild(card);
            });

            function createExamCard(exame) {
                const card = document.createElement('div');

                let textColorClass = 'text-black';
                let examColorClass = '';

                if (exame.status_exame === 'Comprometido')  { 
                    examColorClass = 'bg-[#F04A6B]';
                    textColorClass = 'text-white';
                } else {
                    examColorClass = 'bg-[#C9C4CE]';
                }

                 card.className = `p-1 rounded-lg shadow-md flex flex-col  cursor-pointer w-full h-10 ${examColorClass}`;

                card.innerHTML = `
                <p class="text-xl ${textColorClass} font-bold">Exame Número: ${exame.numero_protocolo}</p>
                `;
                return card;
            }

        }

        fetchAndRenderExams()
});