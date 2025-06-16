package services

import (
	"backend/models"
	"backend/repositories"
)

type ExamService struct {
	examRepo *repositories.ExamRepository
}

func NewExamService(repo *repositories.ExamRepository) *ExamService {
	return &ExamService{examRepo: repo}
}

func (s *ExamService) GetExamService() (*[]models.Exames, error) {
	return s.examRepo.GetAllExams()
}

func (s *ExamService) GetExamByPROTOCOLO(protocolo string) (*models.Exames, error) {
	return s.examRepo.FindExamByPROTOCOLO(protocolo)
}