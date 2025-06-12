package routes

import (
	"backend/handlers"

	"github.com/gin-gonic/gin"
)

func RegisterAPIPacienteRoutes (rg *gin.RouterGroup, pacienteHandler *handlers.PacienteHandler) {
	rg.GET("/patients", pacienteHandler.GetPatientsHandler)
	rg.GET("/patients/:cpf", pacienteHandler.GetPatientsByCPFHandler)
}

func RegisterAPIUserRoutes (rg *gin.RouterGroup, userHandler *handlers.UserHandler) {
	rg.GET("/users", userHandler.GetUsersHandler)
}