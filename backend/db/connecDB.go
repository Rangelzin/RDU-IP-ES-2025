package db

import(
	"fmt"
	"os"
	"database/sql"
	_ "github.com/lib/pq"
)

// Função que conecta ao banco de dados
func ConnectDB() (*sql.DB, error) {
	dbURL := os.Getenv("DB_URL")
	db, err := sql.Open("postgres", dbURL)
	if err != nil {
		return nil, err
	}

	// Testa a conexão
	if err = db.Ping(); err != nil {
		return nil, err
	}

	fmt.Println("✅ Conectado ao banco de dados com sucesso!")
	return db, nil
}