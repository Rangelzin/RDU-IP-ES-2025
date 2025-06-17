package routes

import (
	"backend/handlers"
	"github.com/gin-gonic/gin"
)

func RegisterAPIPacienteRoutes(rg *gin.RouterGroup, pacienteHandler *handlers.PacienteHandler) {
	rg.GET("/patients", pacienteHandler.GetPatientsHandler)
	rg.GET("/patients/:cpf", pacienteHandler.GetPatientsByCPFHandler)
	rg.POST("/patients", pacienteHandler.CreatePaciente)
}

func RegisterAPIUserRoutes(rg *gin.RouterGroup, userHandler *handlers.UserHandler) {
	rg.GET("/users", userHandler.GetUsersHandler)

	rg.POST("/users", userHandler.CreateUserHandler)
}

func RegisterAPIExamRoutes(rg *gin.RouterGroup, examHandler *handlers.ExamHandler) {
	rg.GET("/exams", examHandler.GetExamsHandler) 
	rg.GET("/exams/:Protocolo", examHandler.GetExamByPROTOCOLOHandler) 
}
