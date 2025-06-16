package handlers

import (
    "backend/services"
    "net/http"
	"database/sql"
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
func (h *ExamHandler) GetExamByPROTOCOLOHandler(c *gin.Context) {
	protocolo := c.Param("protocolo")

	if protocolo == "" {

		c.JSON(http.StatusBadRequest, gin.H{"error": "Número de protocolo não fornecido na URL."})
		return
	}

	exam, err := h.examServ.GetExamByPROTOCOLO(protocolo)
	if err != nil {
		if err == sql.ErrNoRows {
			c.JSON(http.StatusNotFound, gin.H{"error": "Exame não encontrado."})
		} else {
			
			log.Printf("Erro ao buscar exame por protocolo '%s': %v", protocolo, err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao buscar exame", "details": err.Error()})
		}
		return
	}

	c.JSON(http.StatusOK, exam)
}