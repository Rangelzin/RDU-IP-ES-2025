package database

import(
	"fmt"
	"os"
	"database/sql"
	_ "github.com/lib/pq"
)

type DatabaseCliente struct {
	DB *sql.DB
}

// Função que conecta ao banco de dados
func ConnectDB() (*sql.DB, error) {
	dbURL := os.Getenv("DB_URL")
	DB, err := sql.Open("postgres", dbURL)
	if err != nil {
		return nil, err
	}

	// Testa a conexão
	if err = DB.Ping(); err != nil {
		return nil, err
	}

	fmt.Println("✅ Conectado ao banco de dados com sucesso!")
	return DB, nil
}