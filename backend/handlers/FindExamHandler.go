package handlers

import (
	"backend/services"
	"database/sql" 
	"log"
	"net/http"
	"strconv"
	"github.com/gin-gonic/gin"
)

type FindExamHandler struct {
	FindExamService *services.FindExamService 
}

func NewFindExamHandler(examService *services.FindExamService) *FindExamHandler { 
	return &FindExamHandler{FindExamService: examService}
}

func (h *FindExamHandler) GetExamByIDHandler(c *gin.Context) {
	idStr := c.Param("id")

	id, err := strconv.Atoi(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID inválido"})
		return
	}

	exam, err := h.FindExamService.GetExamByID(id) 
	if err != nil {
		if err == sql.ErrNoRows {
			c.JSON(http.StatusNotFound, gin.H{"error": "Exame não encontrado"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao buscar exame", "details": err.Error()})
		}
		log.Println("Erro ao buscar exame: ", err)
		return
	}

	c.JSON(http.StatusOK, exam) 
}