package models

import "time"

type Etapa02Clinico struct {
	Id             int    `json:"id"`
	Exame_id       int    `json:"exame_id"`
	Responsavel_id int    `json:"responsavel_id"`
	Inspecao_colo  string `json:"inspecao_colo"`
	Sinais_dst     bool   `json:"sinais_dst"`
	Data_coleta    time.Time `json:"data_coleta"`
	Created_at     time.Time `json:"created_at"`
}
