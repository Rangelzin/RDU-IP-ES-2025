func() FUNCIONAMENTO DAS PERMISSÕES {

1 - Gerenciar_pacientes: Autoriza o cadastro, a edição e a visualização de informações de todos os pacientes.

2 - Realizar_anamnese: Libera o início de uma nova ficha de exame e o preenchimento da etapa de Anamnese (coleta de dados iniciais).

3 - Realizar_analise_clinica: Concede acesso para preencher as etapas técnicas do exame (Exame Clínico e Laboratório).

4 - Laudar_resultados: Permissão crítica que autoriza o preenchimento do resultado final (laudo) do exame e a visualização da ficha completa para diagnóstico.

5 - Consultar_exames: Permite apenas a busca e a visualização do status e da lista de exames, sem poder alterar informações.

}




func() UTILIDADE DO UBS_CONFIG.JSON {

O arquivo ubs_config.json serve como um repositório central de informações sobre a Unidade Básica de Saúde (UBS) à qual a aplicação está vinculada.

Sua utilidade é garantir que dados essenciais da UBS, como nome, endereço e CNES (Cadastro Nacional de Estabelecimentos de Saúde), sejam consistentes e facilmente acessíveis em todo o sistema. Em vez de ter essas informações repetidas em vários locais do código, o que poderia causar erros, este arquivo centraliza tudo em um único ponto. Isso simplifica a manutenção: se a UBS mudar de endereço ou outra informação precisar ser atualizada, basta modificar este arquivo para que a mudança se reflita em toda a aplicação.

}
