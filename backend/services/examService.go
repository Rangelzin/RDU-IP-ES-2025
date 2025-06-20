package services

import (
	"backend/models"
	"backend/repositories"
	"backend/utils"
	"context"
	"database/sql"
	"errors"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"strings"
	"time"
	"fmt"
)

type ExamService struct {
	examRepo     *repositories.ExamRepository
	PacienteRepo *repositories.PacienteRepository
}

func NewExamService(examRepo *repositories.ExamRepository, pacienteRepo *repositories.PacienteRepository) *ExamService {
	return &ExamService{
		examRepo:     examRepo,
		PacienteRepo: pacienteRepo,
	}
}

func (s *ExamService) GetExamService() (*[]models.Exames, error) {
	return s.examRepo.GetAllExams()
}

func (s *ExamService) GetExamByPROTOCOLO(ctx context.Context, protocolo string) (*models.Exames, error) {
	return s.examRepo.FindExamByPROTOCOLO(ctx, protocolo)
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

func (s *ExamService) CadastraAnamnese(c *gin.Context, protocolo string, anamnese *models.Etapa01Anamnese) error {
	ctx := c.Request.Context()

	if protocolo == "" {
		return errors.New("protocolo do exame é obrigatório para o cadastro da anamnese")
	}

	
	exam, err := s.examRepo.FindExamByPROTOCOLO(ctx, protocolo)
	if err != nil {
		if err == sql.ErrNoRows {
			
			return errors.New("exame não encontrado para o protocolo fornecido. Não é possível cadastrar anamnese.")
		}
		
		log.Printf("Erro interno ao buscar exame por protocolo '%s': %v", protocolo, err)
		return fmt.Errorf("erro interno ao verificar exame: %w", err)
	}

	anamnese.Exame_id = exam.Id

	err = s.examRepo.InsertAnamnese(c, anamnese)
	if err != nil {
		log.Println("Erro ao inserir anamnese no banco de dados: ", err)

		if strings.Contains(err.Error(), "etapa01_anamnese_responsavel_id_fkey") {
			return errors.New("responsável não encontrado. Verifique o responsavel_id.")
		}
		return err
	}

	return nil
}
func (s *ExamService) CadastraClinicalStage(c *gin.Context, exam *models.Etapa02Clinico, protocolo string) error {

	examFound, err := s.GetExamByPROTOCOLO(c.Request.Context(), protocolo)
	if err != nil {
		if err == sql.ErrNoRows {
			c.JSON(http.StatusNotFound, gin.H{"error": "Exame não encontrado."})
			return err
		} else {
			log.Printf("Erro ao buscar exame por protocolo '%s': %v", protocolo, err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao buscar exame", "details": err.Error()})
			return err
		}
	}

	exam.Exame_id = examFound.Id
	exam.Created_at = time.Now()

	err = s.examRepo.InsertClinico(c, exam)
	if err != nil {
		return err
	}

	return nil
}

