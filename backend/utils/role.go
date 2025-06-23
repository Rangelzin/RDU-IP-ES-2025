package utils

import (
	"fmt"
	"strings"
)

const (
	totalDePermissoes = 5
	permissoesZeradas = "00000"
)

var nomeDaRoleParaID = map[string]int{
	"paciente":   0,
	"admin":      1,
	"medico":     2,
	"enfermeiro": 3,
	"outros":     4,
}

var nomeDaPermissaoParaPosicao = map[string]int{
	"gerar_relatorios":       0,
	"gerenciar_pacientes":    1,
	"gerenciar_agendamentos": 2,
	"acessar_prontuarios":    3,
	"configuracoes_sistema":  4,
}

var posicaoParaNomeDaPermissao = map[int]string{
	0: "gerar_relatorios",
	1: "gerenciar_pacientes",
	2: "gerenciar_agendamentos",
	3: "acessar_prontuarios",
	4: "configuracoes_sistema",
}

func CodificarPermissoes(nomeDaRole string, permissoes []string) (string, error) {
	idDaRole, encontrado := nomeDaRoleParaID[strings.ToLower(nomeDaRole)]
	if !encontrado {
		return "", fmt.Errorf("role desconhecida: %s", nomeDaRole)
	}

	if idDaRole == 0 {
		return fmt.Sprintf("%d%s", idDaRole, permissoesZeradas), nil
	}

	if idDaRole == 1 {
		permissoesDeAdmin := strings.Repeat("1", totalDePermissoes)
		return fmt.Sprintf("%d%s", idDaRole, permissoesDeAdmin), nil
	}

	mascaraDePermissao := make([]rune, totalDePermissoes)
	for i := range mascaraDePermissao {
		mascaraDePermissao[i] = '0'
	}

	for _, nomePermissao := range permissoes {
		if posicao, encontrado := nomeDaPermissaoParaPosicao[nomePermissao]; encontrado {
			mascaraDePermissao[posicao] = '1'
		}
	}

	return fmt.Sprintf("%d%s", idDaRole, string(mascaraDePermissao)), nil
}

func DecodificarPermissoes(stringCodificada string) (idDaRole string, permissoes []string, err error) {
	if len(stringCodificada) != totalDePermissoes+1 {
		return "", nil, fmt.Errorf("string de permissão com tamanho inválido")
	}

	idDaRole = string(stringCodificada[0])
	mascaraDePermissao := stringCodificada[1:]

	var permissoesDecodificadas []string
	for i, char := range mascaraDePermissao {
		if char == '1' {
			if nomePermissao, encontrado := posicaoParaNomeDaPermissao[i]; encontrado {
				permissoesDecodificadas = append(permissoesDecodificadas, nomePermissao)
			}
		}
	}

	return idDaRole, permissoesDecodificadas, nil
}
