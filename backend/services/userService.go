package services

import (
	"backend/models"
	"backend/repositories"
	"golang.org/x/crypto/bcrypt"
	"errors"
    "backend/utils"
	"github.com/gin-gonic/gin"

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

func (s *UserService) CadastraUsuario(c *gin.Context, user *models.Users) error {

    if user.CPF == "" { 
		return errors.New("CPF é obrigatório")
	}
	if !utils.IsValidCPF(user.CPF) {
		return errors.New("CPF inválido")
	}

	senha, err := bcrypt.GenerateFromPassword([]byte(user.Senha), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	user.Senha = string(senha)

	err = s.userRepository.InsertUser(c, user)
	if err != nil {
		return err
	}

	return nil
}
