package config

import(
	"github.com/joho/godotenv"
)

// Inicia as variáveis de ambiente
func InitEnv() error {
    err := godotenv.Load("config/.env")
    if err != nil {
		return err
	}
	return nil
}