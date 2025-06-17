package services

import (
	"backend/models"
	"backend/repositories"
	"backend/utils" 
	"context"
	"errors"
	"fmt"
	"golang.org/x/crypto/bcrypt"
	"github.com/gin-gonic/gin"

)

type PacienteService struct {
	pacienteRepository *repositories.PacienteRepository
}

func NewPacienteService(pacienteRepository *repositories.PacienteRepository) *PacienteService {
	return &PacienteService{pacienteRepository: pacienteRepository}
}

func (s *PacienteService) GetAllPatientes() (*[]models.Paciente, error) {
	return s.pacienteRepository.FindAllPatients()
}

func (s *PacienteService) GetPatienteByCPF(c *gin.Context) (*models.Paciente, error) {
	return s.pacienteRepository.FindPatientByCPF(c)
}

func (s *PacienteService) CreatePaciente(ctx context.Context, paciente models.Paciente) error {
	if paciente.Cpf == "" {
		return errors.New("CPF é obrigatório")
	}
	if !utils.IsValidCPF(paciente.Cpf) { 
		return errors.New("CPF inválido")
	}

	senhaHashed, err := bcrypt.GenerateFromPassword([]byte(paciente.Senha), bcrypt.DefaultCost)
	if err != nil {
		return fmt.Errorf("erro ao gerar hash da senha: %w", err)
	}
	paciente.Senha = string(senhaHashed)

	err = s.pacienteRepository.Create(ctx, paciente)
	if err != nil {
		return fmt.Errorf("erro ao criar paciente no repositório: %w", err)
	}

	return nil
}
