package auth

import (
	"github.com/golang-jwt/jwt/v4"
)


type Claim struct {
	ID		int		`json:"id"`
	Nome	string	`json:"nome"`
	CPF		string	`json:"cpf"`
	Role	string	`json:"role"`
	Ubs_id	string	`json:"ubs_id"`
	jwt.RegisteredClaims
}