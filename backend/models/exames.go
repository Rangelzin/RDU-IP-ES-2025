package models

import (
	"time"
)

type Pacientes struct {
	Id             int       `json:"id"`
	Paciente_id    int       `json:"paciente_id"`
	Protocolo      string    `json:"protocolo"`
	Prontuario     string    `json:"prontuario"`
	Data_resultado time.Time `json:"data_resultado"`
	Created_at     time.Time `json:"created_at"`
}
