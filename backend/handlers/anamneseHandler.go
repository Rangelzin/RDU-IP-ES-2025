package handlers

import (
	"backend/models"
	"backend/services"
	"log"
	"net/http"
	"github.com/gin-gonic/gin"
	"fmt"
)

 type AnamneseHandler struct {
	anamneseService *services.AnamneseService
}

func NewAnamneseHandler(anamneseService *services.AnamneseService) *AnamneseHandler {
	return &AnamneseHandler{anamneseService: anamneseService}
}

func (h *AnamneseHandler) CreateAnamneseHandler(c *gin.Context) {
	var anamnese models.Etapa01Anamnese

	if err := c.ShouldBindJSON(&anamnese); err != nil {
		log.Println("Erro ao fazer bind do JSON:", err)
		c.JSON(http.StatusBadRequest, gin.H{"erro": "JSON inválido"})
		return
	}

	if err := h.anamneseService.CadastraAnamnese(c, &anamnese); err != nil {
		err = fmt.Errorf("erro ao cadastrar anamnese: %w", err)
		log.Println(err)
		c.JSON(http.StatusInternalServerError, gin.H{"erro": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"mensagem": "Anamnese criada com sucesso",
	})
}



