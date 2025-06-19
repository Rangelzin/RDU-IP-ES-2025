package server

import (
	"backend/auth"
	"backend/database"
	"backend/handlers"
	"backend/middleware"
	"backend/repositories"
	"backend/services"
	"database/sql"
	"log"
	"os"
)

type Dependencies struct {
	Middleware		*middleware.AuthMiddleware

	PacienteHandler *handlers.PacienteHandler
	UserHandler     *handlers.UserHandler
	ExamHandler     *handlers.ExamHandler    
	
	AuthHandler		*auth.AuthHandler
	 
}

func BuildDependencies(db *sql.DB) *Dependencies {
	chaveJwt := os.Getenv("JWT_KEY_INDESCOBRIVEL_INDECIFRAVEL_INDESCOBERTA")
	if chaveJwt == "" {
		chaveJwt = "JWT_KEY_INDESCOBRIVEL_INDECIFRAVEL_INDESCOBERTA_2"
		log.Println("Chave JWT não encontrada, usando chave padrão")
	}

	dbCliente := &database.DatabaseCliente{DB: db}

	pacienteRepo := repositories.NewPacienteRepository(dbCliente)
	pacienteService := services.NewPacienteService(pacienteRepo)
	pacienteHandler := handlers.NewPacienteHandler(pacienteService)

	userRepo := repositories.NewUserRepository(dbCliente)
	userService := services.NewUserService(userRepo)
	userHandler := handlers.NewUserHandler(userService)
	
	examRepo := repositories.NewExamRepository(dbCliente)
	examService := services.NewExamService(examRepo, pacienteRepo)
	examHandler := handlers.NewExamHandler(examService)


	authService := auth.NewAutenticacaoService(userRepo, pacienteRepo, []byte(chaveJwt))
	authHandler := auth.NewAuthHandler(authService)

	middleware := middleware.NewMiddlewareAuth(authService)

	return &Dependencies{
		Middleware: 		middleware,

		PacienteHandler:	pacienteHandler,
		UserHandler:		userHandler,
		ExamHandler:		examHandler,

		AuthHandler: 		authHandler,
	}
}
