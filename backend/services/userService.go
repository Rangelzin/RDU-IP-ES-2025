package services

import (
	"backend/models"
	"backend/repositories"

)

type UserService struct {
	userRepository *repositories.UserRepository
}

func NewUserService(userRepository *repositories.UserRepository) *UserService{
	return &UserService{userRepository: userRepository}
}

func (s *UserService) GetAllUsers() (*[]models.Users, error) {
	return s.userRepository.FindAllUsers()
}
