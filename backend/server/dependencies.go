package server

import (
	"backend/database"
	"backend/handlers"
	"backend/repositories"
	"backend/services"
	"database/sql"
)

type Dependencies struct {
	PacienteHandler *handlers.PacienteHandler
	UserHandler     *handlers.UserHandler
	ExamHandler     *handlers.ExamHandler       
	 
}

func BuildDependencies(db *sql.DB) *Dependencies {
	dbCliente := &database.DatabaseCliente{DB: db}

	pacienteRepo := repositories.NewPacienteRepository(dbCliente)
	pacienteService := services.NewPacienteService(pacienteRepo)
	pacienteHandler := handlers.NewPacienteHandler(pacienteService)

	userRepo := repositories.NewUserRepository(dbCliente)
	userService := services.NewUserService(userRepo)
	userHandler := handlers.NewUserHandler(userService)

	
	examRepo := repositories.NewExamRepository(dbCliente)
	examService := services.NewExamService(examRepo)
	examHandler := handlers.NewExamHandler(examService)


	return &Dependencies{
		PacienteHandler: pacienteHandler,
		UserHandler:     userHandler,
		ExamHandler:     examHandler,
	}
}
