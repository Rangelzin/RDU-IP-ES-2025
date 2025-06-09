package models

import (
	"time"
)

type Etapa04Resultado struct {
	Id                                           int       `json:"id"`
	Exame_id                                     int       `json:"exame_id"`
	Responsavel_id                               int       `json:"responsavel_id"`
	Amostra_rejeitada                            string    `json:"amostra_rejeitada"`
	Epitelios_representados                      string    `json:"epitelios_representados"`
	Adequabilidade_material                      bool      `json:"adequabilidade_material"`
	Insatisfatoria_por                           string    `json:"insatisfatoria_por"`
	Dentro_limites_normalidade                   bool      `json:"dentro_limites_normalidade"`
	Alteracao_celulas_benignas                   string    `json:"alteracao_celulas_benignas"`
	Microbiologia                                string    `json:"microbiologia"`
	Celulas_atipicas_significado_indeterminado   string    `json:"celulas_atipicas_significado_indeterminado"`
	Atipias_celulas_escamosas                    string    `json:"atipias_celulas_escamosas"`
	Atipias_celulas_glandulares                  string    `json:"atipias_celulas_glandulares"`
	Outras_neoplasias_malignas                   string    `json:"outras_neoplasias_malignas"`
	Celulas_endometriais_pos_menopausa_ou_mais40 bool      `json:"celulas_endometriais_pos_menopausa_ou_mais40"`
	Observacoes_gerais                           string    `json:"observacoes_gerais"`
	Screening_citotecnico                        string    `json:"screening_citotecnico"`
	Responsavel                                  string    `json:"responsavel"`
	Data_resultado                               time.Time `json:"data_resultado"`
	Created_at                                   time.Time `json:"created_at"`
}
