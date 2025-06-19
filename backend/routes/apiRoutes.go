package routes

import (
	"backend/handlers"
	"github.com/gin-gonic/gin"
)

func RegisterAPIPacienteRoutes(rg *gin.RouterGroup, pacienteHandler *handlers.PacienteHandler) {
	rg.GET("/patients", pacienteHandler.GetPatientsHandler)
	rg.GET("/patients/:cpf", pacienteHandler.GetPatientsByCPFHandler)
	rg.POST("/patients", pacienteHandler.CreatePaciente)
	rg.DELETE("/patients/:id", pacienteHandler.DeletePatientHandler)
	rg.PUT("/patients/:id", pacienteHandler.UpdatePatientHandler)
}

func RegisterAPIUserRoutes(rg *gin.RouterGroup, userHandler *handlers.UserHandler) {
	rg.GET("/users", userHandler.GetUsersHandler)
	rg.DELETE("/users/:id", userHandler.DeleteUserHandler)
	rg.POST("/users", userHandler.CreateUserHandler)
	rg.GET("/users/:cpf", userHandler.GetUserbyCPFHandler)
	rg.PUT("/users/:cpf", userHandler.UpdateUserHandler)
}

func RegisterAPIExamRoutes(rg *gin.RouterGroup, examHandler *handlers.ExamHandler) {
	rg.GET("/exams", examHandler.GetExamsHandler) 
	rg.GET("/exams/:Protocolo", examHandler.GetExamByPROTOCOLOHandler) 
	rg.POST("/exams/:cpf", examHandler.CreateExamHandler)
}

func RegisterAPIAnamneseRoutes(rg *gin.RouterGroup, anamneseHandler *handlers.AnamneseHandler) {
	rg.POST("/citology_forms/:id/anamnese", anamneseHandler.CreateAnamneseHandler)
}
