package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"
	"time"
	"github.com/gin-gonic/gin"
	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

func main() {
	// Executa as migrations
	// os.Args é uma array dos argumentos passado quando chamou o script
	// quando se executa go run main.go migrates
	// o os.args = {"main.go", "migrate"}
	if len(os.Args) > 1 && os.Args[1] == "migrate" {
		if err := runMigrations(); err != nil {
			log.Fatal(err)
		}
		return
	}

	// Inicia as variáveis de ambiente
	err := initEnv()
	if err != nil {
		log.Fatal("❌ Erro ao carregar as variáveis de ambiente:", err)
	}

	// Conecta ao banco de dados
	db, err := connectDB()
	if err != nil {
		log.Fatal("❌ Erro ao conectar ao banco:", err)
	}
	defer db.Close() // fecha o banco de dados quando sair da função

	// Inicia o servidor web
	r := gin.Default()

	// Aplica os middlewares
	r.Use(CORSMiddleware())
	r.Use(TimingMiddleware())
//	r.use(AuthMiddleware()) Desenvolver no futuro usar JWT ou outra forma de autenticar

	// Endpoint de teste que consulta o bacno de dados
	r.GET("/api/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{"message": "pong"})
	})

	// Roda o servidor
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	r.Run(":" + port)
}

// Função que roda tadas as migrações na pasta migrations
func runMigrations() error {
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
	m, err := migrate.NewWithDatabaseInstance("file://db/migrations", "postgres", driver)
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

// Função que conecta ao banco de dados
func connectDB() (*sql.DB, error) {
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

// Inicia as variáveis de ambiente
func initEnv() error {
    err := godotenv.Load("config/.env")
    if err != nil {
		return err
	}
	return nil
}

// MIDDLEWAREs
// configuração headers CORS // Permite que o frontend acesse a API
func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Permite o acesso de qualquer origem
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*") // alterar no futuro
		// Permite o uso dos métodos GET, POST, PUT, DELETE e OPTIONS
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		// Permite o envio de dados no corpo da requisição e o envio de token de autenticação
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-type, Authorization")
	
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
// middleware de tempo // Calcula o tempo que uma requisição leva para rodar
func TimingMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Marca o tempo inicial da requisição
		start := time.Now()

		c.Next()
		// Calcula quanto tempo levou após o c.Next()
		duration := time.Since(start)
		log.Printf("Request %s took %v", c.Request.URL.Path, duration) // Loga o tempo da requisição
	}
}