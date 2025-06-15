package services

import (
	"backend/models"
	"backend/repositories"
	
)

type FindExamService struct { 
	findExamRepo *repositories.FindExamRepository 
}

func NewFindExamService(repo *repositories.FindExamRepository) *FindExamService { 
	return &FindExamService{findExamRepo: repo}
}

func (s *FindExamService) GetExamByID(id int) (*models.FindExames, error) { 
	exam, err := s.findExamRepo.FindExamByID(id) 
	if err != nil {
		return nil, err
	}
	return exam, nil
}