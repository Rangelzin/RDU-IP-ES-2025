package models

import (
	"time"
)

type Ubs struct {
	Id         int       `json:"id"`
	Nome       string    `json:"nome"`
	Cnes       string    `json:"cnes"`
	Municipio  string    `json:"municipio"`
	Uf         string    `json:"uf"`
	CreatedAt  time.Time `json:"created_at"`
}
