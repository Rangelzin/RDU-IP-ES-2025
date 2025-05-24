package server

import (
	"backend/config"
	"backend/db"
	"database/sql"
	_ "github.com/lib/pq"
	"log"
	"os"
)

func Init() (*sql.DB, error) {
	// Inicia as variáveis de ambiente
	if err := config.InitEnv(); err != nil {
		log.Fatal("❌ Erro ao carregar as variáveis de ambiente:", err)
		return nil, err
	}

	// Executa as migrations
	// os.Args é uma array dos argumentos passado quando chamou o script
	// quando se executa go run main.go migrates
	// o os.args = {"main.go", "migrate"}
	if len(os.Args) > 1 && os.Args[1] == "migrate" {
		if err := db.RunMigrations(); err != nil {
			return nil, err
		}
		log.Println("✅ Migration Executada com Sucesso.")
		os.Exit(0)
	}

	// Conecta ao banco de dados
	db, err := db.ConnectDB()
	if err != nil {
		log.Fatal("❌ Erro ao carregar as variáveis de ambiente:", err)
		return nil, err
	}
	
	return db, nil


}