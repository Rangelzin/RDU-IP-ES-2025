package services

import (
	"backend/models"
	"backend/repositories"

	"github.com/gin-gonic/gin"
)

type PacienteService struct {
	pacienteRepository *repositories.PacienteRepository
}

func NewPacienteService(pacienteRepository *repositories.PacienteRepository) *PacienteService{
	return &PacienteService{pacienteRepository: pacienteRepository}
}

func (s *PacienteService) GetAllPatientes() (*[]models.Paciente, error) {
	return s.pacienteRepository.FindAllPatients()
}

func (s *PacienteService) GetPatienteByCPF(c *gin.Context, cpf *string) (*models.Paciente, error) {
	return s.pacienteRepository.FindPatientByCPF(c, cpf)
}