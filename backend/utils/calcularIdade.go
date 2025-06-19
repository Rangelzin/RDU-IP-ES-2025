package utils

import(
	"time"
)

func CalcularIdade(dataNascimento time.Time) int {
	hoje := time.Now()
	idade := hoje.Year() - dataNascimento.Year()

	// Caso não tenha feito aniverssario esse ano
	if hoje.Month() < dataNascimento.Month() || (hoje.Month() == dataNascimento.Month() && hoje.Day() < dataNascimento.Day()) {
		idade--
	}

	return idade
}
