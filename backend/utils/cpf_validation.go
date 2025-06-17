package utils

import (
	"regexp"
	"strconv"
)

func IsValidCPF(cpfStr string) bool { 
	re := regexp.MustCompile(`[^\d]`)
	cpfStr = re.ReplaceAllString(cpfStr, "")

	if len(cpfStr) != 11 {
		
		return false
	}
	if cpfStr == "00000000000" || cpfStr == "11111111111" ||
		cpfStr == "22222222222" || cpfStr == "33333333333" ||
		cpfStr == "44444444444" || cpfStr == "55555555555" ||
		cpfStr == "66666666666" || cpfStr == "77777777777" ||
		cpfStr == "88888888888" || cpfStr == "99999999999" {
		return false
	}

	calculateVerifier := func(cpfPart string, factor int) int {
		sum := 0
		for _, char := range cpfPart {
			digit, _ := strconv.Atoi(string(char))
			sum += digit * factor
			factor--
		}
		remainder := sum % 11
		if remainder < 2 {
			return 0
		}
		return 11 - remainder
	}

	firstVerifier := calculateVerifier(cpfStr[0:9], 10)
	providedFirstDigit, _ := strconv.Atoi(string(cpfStr[9]))
	if providedFirstDigit != firstVerifier {
	
		return false
	}

	secondVerifier := calculateVerifier(cpfStr[0:10], 11)
	providedSecondDigit, _ := strconv.Atoi(string(cpfStr[10]))
	if providedSecondDigit != secondVerifier {
		return false
	}

	return true
}