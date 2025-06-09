package models

import (
	"time"
)

type Etapa03Lab struct {
	Id               int       `json:"id"`
	Exame_id         int       `json:"exame_id"`
	Responsavel_id   int       `json:"responsavel_id"`
	Laboratorio_nome string    `json:"laboratorio_nome"`
	Laboratorio_cnes string    `json:"laboratorio_cnes"`
	Numero_exame     string    `json:"numero_exame"`
	Recebido_em      time.Time `json:"recebido_em"`
	Created_at       time.Time `json:"created_at"`
}
