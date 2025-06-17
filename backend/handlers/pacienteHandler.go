package handlers

import (
	"backend/models"
	"backend/services"
	
	"fmt"
	"log"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	// "github.com/lib/pq" // Descomente se for usar o tratamento de erro de FOREIGN KEY para foreign_key_violation (código "23503")
)

type PacienteHandler struct {
	pacienteService *services.PacienteService
}

func NewPacienteHandler(pacienteService *services.PacienteService) *PacienteHandler {
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
	paciente, err := h.pacienteService.GetPatienteByCPF(c)
	if err != nil {
		log.Printf("Erro ao buscar paciente por CPF: %v", err)
		// Você pode adicionar um tratamento de erro mais específico aqui,
		// como Http.StatusNotFound se o paciente não for encontrado
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

		// Tratamento de erros específicos
		if strings.Contains(err.Error(), "CPF é obrigatório") || strings.Contains(err.Error(), "CPF inválido") {
			c.JSON(http.StatusBadRequest, gin.H{
				"error":   "Erro de validação de dados",
				"details": err.Error(),
			})
			return
		}
		// Exemplo de tratamento para erros de banco de dados (duplicidade, foreign key)
		// if pqErr, ok := err.(*pq.Error); ok {
		// 	switch pqErr.Code.String() {
		// 	case "23505": // unique_violation (ex: CPF duplicado)
		// 		c.JSON(http.StatusConflict, gin.H{
		// 			"error":   "Conflito de dados",
		// 			"details": "Já existe um paciente cadastrado com este CPF.",
		// 		})
		// 		return
		// 	case "23503": // foreign_key_violation (ex: ubs_id não existe)
		// 		c.JSON(http.StatusBadRequest, gin.H{
		// 			"error":   "Erro de referência de dados",
		// 			"details": "A UBS (Unidade Básica de Saúde) informada não existe.",
		// 		})
		// 		return
		// 	}
		// }

		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao criar paciente", "details": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Paciente criado com sucesso"})
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
		// if pqErr, ok := err.(*pq.Error); ok {
		// 	if pqErr.Code.String() == "23503" { // foreign_key_violation
		// 		c.JSON(http.StatusConflict, gin.H{
		// 			"error":   "Não foi possível deletar paciente",
		// 			"details": "Existem dados relacionados a este paciente (ex: exames). Exclua-os primeiro.",
		// 		})
		// 		return
		// 	}
		// }
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao deletar paciente", "details": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": fmt.Sprintf("Paciente com ID %d deletado com sucesso", id)})
}