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
	UserHandler *handlers.UserHandler
	// Outros handlers no futuro
}

func BuildDependencies(db *sql.DB) *Dependencies {
	dbCliente := &database.DatabaseCliente{DB: db}

	pacienteRepo := repositories.NewPacienteRepository(dbCliente)
	pacienteService := services.NewPacienteService(pacienteRepo)
	pacienteHandler := handlers.NewPacienteHandler(pacienteService)

	userRepo := repositories.NewUserRepository(dbCliente)
	userService := services.NewUserService(userRepo)
	userHandler := handlers.NewUserHandler(userService)

	return &Dependencies{
		PacienteHandler: pacienteHandler,
		UserHandler: userHandler,
	}
}
