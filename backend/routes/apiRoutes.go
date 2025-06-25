package routes

import (
	"backend/handlers"
	"github.com/gin-gonic/gin"
)

func RegisterAPIPacienteRoutes(rg *gin.RouterGroup, pacienteHandler *handlers.PacienteHandler) {
	rg.GET("/patients", pacienteHandler.GetPatientsHandler)
	rg.GET("/patients/:cpf", pacienteHandler.GetPatientsByCPFHandler)
	rg.POST("/patients", pacienteHandler.CreatePaciente)
	rg.PUT("/patients/:id", pacienteHandler.UpdatePatientHandler)
	rg.DELETE("/patients/:id", pacienteHandler.DeletePatientHandler)
}

func RegisterAPIUserRoutes(rg *gin.RouterGroup, userHandler *handlers.UserHandler) {
	rg.GET("/users", userHandler.GetUsersHandler)
	rg.GET("/users/:cpf", userHandler.GetUserbyCPFHandler)
	rg.POST("/users", userHandler.CreateUserHandler)
	rg.PUT("/users/:cpf", userHandler.UpdateUserHandler)
	rg.DELETE("/users/:id", userHandler.DeleteUserHandler)
}

func RegisterAPIExamRoutes(rg *gin.RouterGroup, examHandler *handlers.ExamHandler) {
	rg.GET("/exams", examHandler.GetExamsHandler)
	rg.GET("/exams/:Protocolo", examHandler.GetExamByPROTOCOLOHandler)
	rg.GET("/exams/ficha/:protocolo", examHandler.GetFichaCompletaHandler)
	rg.POST("/exams/:cpf", examHandler.CreateExamHandler)
	rg.POST("/citology_forms/:id/anamnese", examHandler.CreateAnamneseHandler)
	rg.POST("/citology_forms/:id/clinico/", examHandler.CreateClinicoHandler)
	rg.POST("/citology_forms/:id/lab", examHandler.CreateLaboratorioHandler)
	rg.POST("/citology_forms/:id/result", examHandler.CreateResultadoHandler)
}
