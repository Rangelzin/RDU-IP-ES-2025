package services

import (
	"backend/models"
	"backend/repositories"
	 "backend/utils"
	 "log"
	 "github.com/gin-gonic/gin"
	 "errors"
	 "strings"
	 "time"
)

type ExamService struct {
	examRepo *repositories.ExamRepository
	PacienteRepo *repositories.PacienteRepository
}

func NewExamService(examRepo *repositories.ExamRepository, pacienteRepo *repositories.PacienteRepository) *ExamService {
	return &ExamService{
		examRepo: examRepo,
		PacienteRepo: pacienteRepo,
	}
}

func (s *ExamService) GetExamService() (*[]models.Exames, error) {
	return s.examRepo.GetAllExams()
}

func (s *ExamService) GetExamByPROTOCOLO(protocolo string) (*models.Exames, error) {
	return s.examRepo.FindExamByPROTOCOLO(protocolo)
}

func (s *ExamService) CreateExam(c *gin.Context, exam *models.Exames) error {
	  NCredencial := strings.ReplaceAll(exam.Cpf, ".", "")
	  NCredencial = strings.ReplaceAll(NCredencial, "-", "")
	  NCredencial = strings.ReplaceAll(NCredencial, " ", "")

	if NCredencial == "" { 
		return errors.New("CPF é obrigatório")
	}
	if !utils.IsValidCPF(NCredencial) {
		return errors.New("CPF inválido")
	}
	
	FCpf := &NCredencial
	paciente, err := s.PacienteRepo.FindPatientByCPF(c, FCpf)
	if err != nil {
		log.Println("erro: paciente não encontrado: ", err)
		return err
	}

	exam.Paciente_id = paciente.Id
	exam.Data_resultado = time.Time{}

	err = s.examRepo.InsertExam(c, exam)
	if err != nil {
		return err
	}

	return nil
}