package models

type FichaCompleta struct {
	Paciente    *Paciente         `json:"paciente"`
	Exame       *Exames           `json:"exame"`
	Anamnese    *Etapa01Anamnese  `json:"anamnese,omitempty"`
	Clinico     *Etapa02Clinico   `json:"clinico,omitempty"`
	Laboratorio *Etapa03Lab       `json:"laboratorio,omitempty"`
	Resultado   *Etapa04Resultado `json:"resultado,omitempty"`
}