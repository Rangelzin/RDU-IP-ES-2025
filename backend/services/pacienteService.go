package services

import (
	"backend/models"
	"backend/repositories"
	"fmt"
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

func (s *PacienteService) DeletePatient(id int) error {

    rowsAffected, err := s.pacienteRepository.DeletePatientByID(id)
    if err != nil {
        return err
    }

    if rowsAffected == 0 {
        return fmt.Errorf("Paciente com id %d não encontrado", id)
    }
    return nil
}