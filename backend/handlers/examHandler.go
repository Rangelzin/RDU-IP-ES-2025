package handlers

import (
    "backend/services"
    "net/http"
	"database/sql"
    "log"
	"github.com/gin-gonic/gin"
	"backend/models"
	"fmt"
)

type ExamHandler struct {
	examServ *services.ExamService
}

func NewExamHandler (svc *services.ExamService) *ExamHandler {
	return &ExamHandler{examServ: svc}
}

// GET
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

func (h *ExamHandler) CreateExamHandler(c *gin.Context) {
	var exam models.Exames

	if err := c.ShouldBindJSON(&exam); err != nil {
		log.Println("Erro ao fazer bind do JSON:", err)
		c.JSON(http.StatusBadRequest, gin.H{"erro": "JSON inválido"})
		return
		}

	if err := h.examServ.CreateExam(c, &exam); err != nil {
		err = fmt.Errorf("erro ao cadastrar usuário: ", err)
		log.Println(err)
		c.JSON(http.StatusInternalServerError, gin.H{"erro": err})
		return
	}
	c.JSON(http.StatusCreated, gin.H{
		"mensagem": "Exame criado com sucesso",
	})
}