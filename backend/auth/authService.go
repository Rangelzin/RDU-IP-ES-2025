package auth

import (
	"backend/dto"
	"backend/models"
	"backend/repositories"
	"errors"
	"fmt"
	"log"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	"golang.org/x/crypto/bcrypt"
)

type AuthService struct {
	userRepository		*repositories.UserRepository
	pacienteRepository 	*repositories.PacienteRepository
	jwtkey				[]byte
}

func NewAutenticacaoService(userRepository *repositories.UserRepository, pacienteRepository *repositories.PacienteRepository , jwtKey []byte) *AuthService {
	return &AuthService{
		userRepository:		userRepository,
		pacienteRepository: pacienteRepository,
		jwtkey:				jwtKey,
	}
}

func (s *AuthService) GerarToken(user *models.Paciente) (string, error) {
	var	tokenAss 	string
	var	err			error
	expirationTime := time.Now().Add(999999 * time.Hour)

	claim := &Claim{
		Nome: user.Nome_completo,
		CPF: user.Cpf,
		Role: "10000",
		Ubs_id: "01",
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodES256, claim)

	if tokenAss, err = token.SignedString(s.jwtkey); err != nil {
		return "", err
	}

	return tokenAss, nil
}

func (s *AuthService) AuthToken(tokenStr string) (*Claim, error) {
	claim := &Claim{}

	token, err := jwt.ParseWithClaims(tokenStr, claim, func(t *jwt.Token) (interface{}, error) {
		return s.jwtkey, nil
	})

	if err != nil {
		return nil, err
	}

	if !token.Valid {
		return nil, fmt.Errorf("token inválido")
	}

	return claim, nil
}

func (s *AuthService) UserAuth(c *gin.Context, credentials dto.UserCredentials) (string, error) {
	var P_user	*models.Paciente
	var err		error
	var token	string

	FCredentials := strings.ReplaceAll(credentials.CPF, ".", "")
	FCredentials = strings.ReplaceAll(FCredentials, "-", "")
	FCredentials = strings.ReplaceAll(FCredentials, " ", "")

	if len(FCredentials) != 11 {
		log.Printf("Erro, cpf '%s' inválido!", FCredentials)
		err = fmt.Errorf("error, cpf '%s' inválido", FCredentials)
		return "", err
	}

	if P_user, err = s.pacienteRepository.FindPatientByCPF(c, &FCredentials); err != nil {
		return "", err
	}

	if err = bcrypt.CompareHashAndPassword([]byte(P_user.Senha), []byte(credentials.Password)); err != nil {
		if errors.Is(err, bcrypt.ErrMismatchedHashAndPassword) {
			return "", fmt.Errorf("credencial inválida: %v", err.Error())
		}
		return "", fmt.Errorf("erro ao validar credenciais: %v", err.Error())
	}

	if token, err = s.GerarToken(P_user); err != nil {
		return "", fmt.Errorf("erro ao gerar token: %v", err.Error())
	}

	return token, nil
}