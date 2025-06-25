package models

import (
	"time"
)

type Paciente struct {
	Id               int       `json:"id"`
	Nome_completo    string    `json:"nome_completo"`
	Nome_mae         string    `json:"nome_mae"`
	Apelido          string    `json:"apelido"`
	Cpf              string    `json:"cpf"`
	Senha			 string    `json:"-"`
	Data_nascimento  time.Time `json:"data_nascimento"`
	Idade            int       `json:"idade"`
	Logradouro       string    `json:"logradouro"`
	Numero           string    `json:"numero"`
	Complemento      *string    `json:"complemento"`
	Bairro           string    `json:"bairro"`
	Municipio        string    `json:"municipio"`
	Uf               string    `json:"uf"`
	Cep              string    `json:"cep"`
	Telefone         string    `json:"telefone"`
	Ponto_referencia string    `json:"ponto_referencia"`
	Escolaridade     string    `json:"escolaridade"`
	Cartao_sus       string    `json:"cartao_sus"`
	Raca_cor         string    `json:"raca_cor"`
	Nacionalidade    string    `json:"nacionalidade"`
	Ubs_id           int       `json:"ubs_id"`
	Status			 bool      `json:"status"`
	Created_at       time.Time `json:"created_at"`
}
