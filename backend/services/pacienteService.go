package services

import(
	"backend/models"
	"backend/repositories"
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