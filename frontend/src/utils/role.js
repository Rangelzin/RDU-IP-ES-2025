const TOTAL_DE_PERMISSOES = 5;

const nomeDaPermissaoParaPosicao = {
  'gerar_relatorios': 0,
  'gerenciar_pacientes': 1,
  'gerenciar_agendamentos': 2,
  'acessar_prontuarios': 3,
  'configuracoes_sistema': 4,
};

const posicaoParaNomeDaPermissao = {
  0: 'gerar_relatorios',
  1: 'gerenciar_pacientes',
  2: 'gerenciar_agendamentos',
  3: 'acessar_prontuarios',
  4: 'configuracoes_sistema',
};

export function codificarPermissoes(idDaRole, permissoes = []) {
  const idDaRoleNumerico = parseInt(idDaRole, 10);

  if (idDaRoleNumerico === 0) {
    return `${idDaRoleNumerico}${'0'.repeat(TOTAL_DE_PERMISSOES)}`;
  }
  if (idDaRoleNumerico === 1) {
    return `${idDaRoleNumerico}${'1'.repeat(TOTAL_DE_PERMISSOES)}`;
  }

  const mascaraDePermissao = Array(TOTAL_DE_PERMISSOES).fill('0');

  for (const nomePermissao of permissoes) {
    if (nomeDaPermissaoParaPosicao.hasOwnProperty(nomePermissao)) {
      const posicao = nomeDaPermissaoParaPosicao[nomePermissao];
      mascaraDePermissao[posicao] = '1';
    }
  }

  return `${idDaRole}${mascaraDePermissao.join('')}`;
}

export function decodificarPermissoes(stringCodificada) {
  if (!stringCodificada || stringCodificada.length !== TOTAL_DE_PERMISSOES + 1) {
    return { idDaRole: null, permissoes: [] };
  }

  const idDaRole = stringCodificada[0];
  const mascaraDePermissao = stringCodificada.substring(1);

  const permissoesDecodificadas = [];
  for (let i = 0; i < mascaraDePermissao.length; i++) {
    if (mascaraDePermissao[i] === '1') {
      if (posicaoParaNomeDaPermissao.hasOwnProperty(i)) {
        permissoesDecodificadas.push(posicaoParaNomeDaPermissao[i]);
      }
    }
  }

  return { idDaRole, permissoes: permissoesDecodificadas };
}