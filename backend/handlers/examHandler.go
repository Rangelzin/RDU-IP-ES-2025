package handlers

import (
    "backend/services"
    "net/http"
    "log"
	"github.com/gin-gonic/gin"
)

type ExamHandler struct {
	examServ *services.ExamService
}

func NewExamHandler (svc *services.ExamService) *ExamHandler {
	return &ExamHandler{examServ: svc}
}

func (h *ExamHandler) GetExamsHandler(c *gin.Context) {
	exames, err := h.examServ.GetExamService()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error" : "Erro ao buscar exame"})
		log.Println("Erro ao buscar exame: ", err)
		return
	}
	c.JSON(http.StatusOK, exames)
}