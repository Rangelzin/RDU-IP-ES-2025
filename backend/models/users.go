package models

import (
	"time"
)

type Users struct {
	Id         int       `json:"id"`
	Nome       string    `json:"nome"`
	CPF        string    `json:"cpf"`
	Crm        string    `json:"crm"`
	Email      string    `json:"email"`
	Senha      string    `json:"senha"`
	Role	   string    `json:"role"` 
	Ubs_id     int       `json:"ubs_id"`
	Created_at time.Time `json:"created_at"`
}
