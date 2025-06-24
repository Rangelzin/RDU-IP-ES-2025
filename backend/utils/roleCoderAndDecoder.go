package utils

import (
	"encoding/json"
	"fmt"
	"os"
	"strconv"

)

type Dados struct {
	Profissoes map[string]int    `json:"profissoes"`
	Permissoes map[string]string `json:"permissoes"`
}
 

func getJson() (map[string]int ,map[int]string ,error ) {
	// Abre o arquivo
	file, err := os.Open("../../config/roleConfig.json")
	if err != nil {
		return nil, nil, err
	}
	defer file.Close()

	// Decodifica o JSON
	var dados Dados
	err = json.NewDecoder(file).Decode(&dados)
	if err != nil {
		return nil, nil, err
	}

	// Converte permissoes para map[int]string
	permissoesConvertidas := make(map[int]string)
	for k, v := range dados.Permissoes {
		var chaveInt int
		fmt.Sscanf(k, "%d", &chaveInt)
		permissoesConvertidas[chaveInt] = v
	}

	return dados.Profissoes, permissoesConvertidas, nil
}


func CodificarPermissoesVetToStr(role []string) (string, error) {
	profissoes, permissoes, err := getJson()
	if err != nil {
		return "", fmt.Errorf("erro: erro ao importar JSON | %w", err)
	}
	str := ""

	// Codifica a profição e após isso ha remove do slice
	for rolek, roleV := range role {
		for profK, profV := range profissoes {
			if roleV == profK {
				role = append(role[:rolek], role[rolek+1:]...)
				str = fmt.Sprintf("%d", profV)
			}
		}
		if str == ""{
			return "", fmt.Errorf("erro: Profissão não encontrada")
		}
	}

	// Codifica a permições e após isso ha remove do slice
	for _, permV := range permissoes {
		achei := false

		for roleK, roleV := range role {
			if permV == roleV {
				role = append(role[:roleK], role[roleK+1:]...)
				str = str + "1"
				achei = true
			} 
		}
		if !achei {
			str = str + "0"
		}
	}

	if len(role) != 0{
		return "", fmt.Errorf("valores no vetor não foram encontradr na lista de permições: %v", role)
	}
		
	return str, nil
}

func DecodificarPermissoesStrToVet(role string) ( []string, error) {
	profissoes, permissoes, err := getJson()
	if err != nil {
		return nil, fmt.Errorf("erro: erro ao importar JSON | %w", err)
	}

	var maxSize = len(permissoes) + 1
	var roleVet = []string{}

	if len(role) != maxSize {
		return nil, fmt.Errorf("erro: O tamanho da string role (%d) é inválido", len(role))
	}

	for k, c := range role {
		strC := string(c)

		// Decodifica Profição
		if k == 0 {
			achei := false
			for profK, profV := range profissoes {
				n, err := strconv.Atoi(strC)
				if err != nil {
					return nil, fmt.Errorf("erro: str => int | %w", err)
				}
				if n == profV {
					roleVet = append(roleVet, profK)
					achei = true
				}
			}
			if !achei {
				return nil, fmt.Errorf("error: Profissão não encontrada")
			} else {
				continue
			}
		}
		
		// Decodifica Permições
		if strC == "1" {
			roleVet = append(roleVet, permissoes[k])
		}else if strC != "0" {
			return nil, fmt.Errorf("error: O formato da string é inválido")
		}
	}

	return roleVet, nil
}

