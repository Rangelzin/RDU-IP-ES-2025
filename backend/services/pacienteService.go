package services

import (
	"backend/models"
	"backend/repositories"
	"backend/utils"
	"context"
	"errors"
	"fmt"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
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

	cpfParam := c.Param("cpf")
	if cpfParam == "" {
		return nil, errors.New("CPF não fornecido na requisição")
	}

	return s.pacienteRepository.FindPatientByCPF(c, &cpfParam)
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

func (s *PacienteService) DeletePatient(id int) error {
	rowsAffected, err := s.pacienteRepository.DeletePatientByID(id)
	if err != nil {
		return err
	}

	if rowsAffected == 0 {
		return fmt.Errorf("paciente com id %d não encontrado", id)
	}
	return nil
}

func (s *PacienteService) UptadePatientService(id int, paciente models.Paciente, ctx context.Context) error {

	isCPF := utils.IsValidCPF(paciente.Cpf)
	if !isCPF {
		return fmt.Errorf("CPF inválido: %s", paciente.Cpf)
	} else if paciente.Cpf == "" {
		return fmt.Errorf("CPF vazio: %s", paciente.Cpf)
	}

	err := s.pacienteRepository.UptadePatient(id, ctx, paciente)
	if err != nil {
		return fmt.Errorf("erro ao criar paciente no repositório: %w", err)
	}
	return nil
}
