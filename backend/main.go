package main

import (
	"backend/server"
	"log"
	"os"
)

func main() {

	// Inicializa as dependências do servidor
	db, err := server.Init()
	if err != nil {
		log.Fatal("❌ Falha na inicialização! ", err)
	}
	defer db.Close()

	r := server.SetupRouter()

	// Roda o servidor
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	r.Run(":" + port)
}
