package server

import (
	"backend/config"
	"backend/database"
	"database/sql"
	"log"
	"os"

	_ "github.com/lib/pq"
)


func Init() (*sql.DB, *Dependencies, error) {
	// Inicia as variáveis de ambiente
	if err := config.InitEnv(); err != nil {
		log.Fatal("❌ Erro ao carregar as variáveis de ambiente:", err)
		return nil, nil, err
	}

	// Executa as migrations
	// os.Args é uma array dos argumentos passado quando chamou o script
	// quando se executa go run main.go migrates
	// o os.args = {"main.go", "migrate"}
	if len(os.Args) > 1 && os.Args[1] == "migrate" {
		if err := database.RunMigrations(); err != nil {
			return nil, nil, err
		}
		log.Println("✅ Migration Executada com Sucesso.")
		os.Exit(0)
	}

	// Conecta ao banco de dados
	db, err := database.ConnectDB()
	if err != nil {
		log.Fatal("❌ Erro ao conectar no banco de dados:", err)
		return nil, nil, err
	}

	// Carrega as depêndencias
	deps := BuildDependencies(db)

	return db, deps, nil

}
