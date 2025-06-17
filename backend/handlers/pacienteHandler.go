package handlers

import (
	"backend/services"
	"log"
	"net/http"
	"strconv"
	"strings"
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

func (h *PacienteHandler) GetPatientsByCPFHandler(c *gin.Context) {
	cpf := c.Param("cpf")
	paciente, err := h.pacienteService.GetPatienteByCPF(c, &cpf)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao buscar pacientes"})
		log.Println("Erro ao buscar pacientes: ", err)
		return
	}
	c.JSON(http.StatusOK, paciente)
}

func (h *PacienteHandler) DeletePatientHandler(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"erro": "ID inválido, deve ser um número inteiro"})
		return
	}
	err = h.pacienteService.DeletePatient(id)
	if err != nil {
		
		if strings.Contains(err.Error(), "não encontrado") {
			c.JSON(http.StatusNotFound, gin.H{"erro": err.Error()})
		} else {
			log.Println("Erro ao deletar paciente: ", err)
			c.JSON(http.StatusInternalServerError, gin.H{"erro": "Erro interno ao deletar paciente"})
		}
		return
	}

	c.JSON(http.StatusOK, gin.H{"mensagem": "Paciente deletado com sucesso"})
}