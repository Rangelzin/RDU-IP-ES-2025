async function getJson() {
 
  const response = await fetch('/configs/roleConfig.json');
  
  const dados = await response.json(); 

  const profissoes = dados.profissoes;
  const permissoes = {};
  for (const [k, v] of Object.entries(dados.permissoes)) {
    permissoes[Number(k)] = v;
  }
  return { profissoes, permissoes };
}

export async function codificarPermissoesVetToStr(role) {
  const { profissoes, permissoes } = await getJson();

  let str = '';

  // Codifica a profissão (primeiro elemento do vetor)
  let i = 0;
  while (i < role.length) {
    const roleV = role[i];
    if (profissoes.hasOwnProperty(roleV)) {
      str = String(profissoes[roleV]);
      role.splice(i, 1); // remove item
      break;
    } else {
      i++;
    }
  }
  if (str === '') {
    throw new Error('Profissão não encontrada');
  }

  // Codifica as permissões
  for (const permKey of Object.keys(permissoes).map(Number)) {
    let achei = false;
    for (let j = 0; j < role.length; j++) {
      if (permissoes[permKey] === role[j]) {
        role.splice(j, 1);
        str += '1';
        achei = true;
        break;
      }
    }
    if (!achei) {
      str += '0';
    }
  }

  if (role.length !== 0) {
    throw new Error(
      `valores no vetor não foram encontrados na lista de permissões: ${role}`
    );
  }

  return str;
}

export async function decodificarPermissoesStrToVet(roleStr) {
  const { profissoes, permissoes } = await getJson();

  const maxSize = Object.keys(permissoes).length + 1;
  if (roleStr.length !== maxSize) {
    throw new Error(
      `O tamanho da string role (${roleStr.length}) é inválido`
    );
  }

  const roleVet = [];

  for (let k = 0; k < roleStr.length; k++) {
    const c = roleStr[k];

    if (k === 0) {
      let achei = false;
      for (const [profK, profV] of Object.entries(profissoes)) {
        if (Number(c) === profV) {
          roleVet.push(profK);
          achei = true;
          break;
        }
      }
      if (!achei) {
        throw new Error('Profissão não encontrada');
      }
      continue;
    }

    // Permissões
    if (c === '1') {
      const perm = permissoes[k];
      roleVet.push(perm);
    } else if (c !== '0') {
      throw new Error('O formato da string é inválido');
    }
  }

  return roleVet;
}
