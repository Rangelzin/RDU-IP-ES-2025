package database

import(
	"fmt"
	"os"
	"database/sql"
	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	_ "github.com/lib/pq"
)

// Função que roda tadas as migrações na pasta migrations
func RunMigrations() error {
	dbURL := os.Getenv("DB_URL")
	db, err := sql.Open("postgres", dbURL)
	if err != nil {
		return err
	}
	defer db.Close()

	driver, err := postgres.WithInstance(db, &postgres.Config{})
	if err != nil {
		return err
	}

	// encontra o caminho para as migrations
	m, err := migrate.NewWithDatabaseInstance("file://database/migrations", "postgres", driver)
	if err != nil {
		return err
	}

	// roda os arquivos up
	err = m.Up()
	if err != nil && err != migrate.ErrNoChange {
		return err
	}

	fmt.Println("✅ Migrations aplicadas com sucesso!")
	return nil
}