package models

import "time"

type Etepa1Anamnese struct {
	Id                    int    `json:"id"`
	Exame_id              int    `json:"exame_id"`
	Responsavel_id        int    `json:"responsavel_id"`
	Motivo_exame          string `json:"motivo_exame"`
	Fez_preventivo        int    `json:"fez_preventivo"`
	Ano_ultimo_exame      string `json:"ano_ultimo_exame"`
	Usa_diu               int    `json:"usa_diu"`
	Gravida               int    `json:"gravida"`
	Usa_pilula            int    `json:"usa_pilula"`
	Usa_hormonio          int    `json:"usa_hormonio"`
	Radioterapia          int    `json:"radioterapia"`
	Ultima_menstruacao    time.Time `json:"ultima_menstruacao"`
	Sangramento_relação   int    `json:"sangramento_relacao"`
	Sangramento_menopausa int    `json:"sangramento_menopausa"`
	Created_at            time.Time `json:"created_at"`
}
