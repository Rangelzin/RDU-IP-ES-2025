package handlers

import (
	"backend/services"
	"log"
	"net/http"
 "time"
 "backend/models"
	"github.com/gin-gonic/gin"
)

type PacienteHandler struct {
	pacienteService *services.PacienteService
}


func NewPacienteHandler (pacienteService *services.PacienteService) *PacienteHandler {
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
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao buscar pacientes"})
		log.Println("Erro ao buscar pacientes: ", err)
		return
	}
	c.JSON(http.StatusOK, paciente)
}

func (h *PacienteHandler) CreatePaciente(c *gin.Context) {
    var paciente models.Paciente
    if err := c.ShouldBindJSON(&paciente); err != nil {
       
        log.Printf("Erro no binding do JSON: %v", err) 
        c.JSON(http.StatusBadRequest, gin.H{"error": "Dados inválidos", "details": err.Error()}) 
        return
    }

    paciente.Created_at = time.Now() 
    if err := h.pacienteService.CreatePaciente(paciente); err != nil {
    
        log.Printf("Erro ao criar paciente no serviço/repositório: %v", err) 
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao criar paciente", "details": err.Error()}) 
        return
    }

    c.JSON(http.StatusCreated, gin.H{"message": "Paciente criado com sucesso"})
}