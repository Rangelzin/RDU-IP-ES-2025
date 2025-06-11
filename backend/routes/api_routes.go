package routes

import (
	"github.com/gin-gonic/gin"
	"backend/handlers"
)

func RegisterAPIRoutes (rg *gin.RouterGroup, pacienteHandler *handlers.PacienteHandler) {
	rg.GET("/patients", pacienteHandler.GetPatientsHandler)
}