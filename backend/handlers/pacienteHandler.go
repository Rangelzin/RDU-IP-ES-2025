package handlers

import (
	"backend/services"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

type PacienteHandler struct {
	pacienteService *services.PacienteService
}

func NewPacienteHandler (pacienteService *services.PacienteService) *PacienteHandler {
	return &PacienteHandler{pacienteService: pacienteService}
}

func (h *PacienteHandler) GetPatientsHandler(c *gin.Context) {
	pacientes, err := h.pacienteService.GetAllPatientes()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao buscar pacientes"})
		log.Println("Erro ao buscar pacientes: ", err)
		return
	}
	c.JSON(http.StatusOK, pacientes)
}