package handlers

import (
	"backend/models"
	"backend/services"

	"fmt"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"strconv"
	"strings"
	"time"
)

type PacienteHandler struct {
	pacienteService *services.PacienteService
}

func NewPacienteHandler(pacienteService *services.PacienteService) *PacienteHandler {
	return &PacienteHandler{pacienteService: pacienteService}
}

// GET
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
	paciente, err := h.pacienteService.GetPatienteByCPF(c)
	if err != nil {
		log.Printf("Erro ao buscar paciente por CPF: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao buscar paciente por CPF", "details": err.Error()})
		return
	}
	c.JSON(http.StatusOK, paciente)
}

func (h *PacienteHandler) CreatePaciente(c *gin.Context) {
	var paciente models.Paciente
	if err := c.ShouldBindJSON(&paciente); err != nil {
		log.Printf("Erro no binding do JSON para paciente: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Dados inválidos", "details": err.Error()})
		return
	}

	paciente.Created_at = time.Now()

	ctx := c.Request.Context()
	if err := h.pacienteService.CreatePaciente(ctx, paciente); err != nil {
		log.Printf("Erro ao criar paciente no serviço/repositório: %v", err)

		if strings.Contains(err.Error(), "CPF é obrigatório") || strings.Contains(err.Error(), "CPF inválido") {
			c.JSON(http.StatusBadRequest, gin.H{
				"error":   "Erro de validação de dados",
				"details": err.Error(),
			})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao criar paciente", "details": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Paciente criado com sucesso"})
}

func (h *PacienteHandler) UpdatePatientHandler(c *gin.Context) {
	var paciente models.Paciente
	idStr := c.Param("id")
	ctx := c.Request.Context()

	id, err := strconv.Atoi(idStr)
	if err != nil {
		log.Printf("Erro: ID do paciente inválido '%s': %v", idStr, err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID do paciente inválido", "details": "O ID deve ser um número inteiro."})
		return
	}

	if err = c.ShouldBindJSON(&paciente); err != nil {
		log.Printf("Erro no binding do JSON para paciente: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Dados inválidos", "details": err.Error()})
		return
	}

	if err = h.pacienteService.UptadePatientService(id, paciente, ctx); err != nil {
		log.Printf("Erro ao atualizar paciente no serviço/repositório: %v", err)

		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao atualizar paciente", "details": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Paciente atualizado com sucesso"})
}

func (h *PacienteHandler) DeletePatientHandler(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		log.Printf("Erro: ID do paciente inválido '%s': %v", idStr, err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID do paciente inválido", "details": "O ID deve ser um número inteiro."})
		return
	}

	err = h.pacienteService.DeletePatient(id)
	if err != nil {
		log.Printf("Erro ao deletar paciente com ID %d: %v", id, err)

		if strings.Contains(err.Error(), "não encontrado") {
			c.JSON(http.StatusNotFound, gin.H{"error": "Paciente não encontrado", "details": err.Error()})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao deletar paciente", "details": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": fmt.Sprintf("Paciente com ID %d deletado com sucesso", id)})
}

func (h *PacienteHandler) UpdatePatientStatusHandler(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID inválido"})
		return
	}

	var payload struct {
		Status bool `json:"status"`
	}

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Payload inválido, 'status' (boolean) é necessário"})
		return
	}

    ctx := c.Request.Context()
	
	err = h.pacienteService.UpdatePatientStatus(ctx, id, payload.Status)
	if err != nil {
		if strings.Contains(err.Error(), "não encontrado") {
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		} else {
			log.Printf("Erro ao atualizar status do paciente: %v", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao atualizar status do paciente"})
		}
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": fmt.Sprintf("Status do paciente com ID %d atualizado com sucesso", id)})
}