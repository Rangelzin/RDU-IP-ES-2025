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

func (s *AuthService) GerarToken(user any) (string, error) {
	var	tokenAss 	string
	var	err			error
	var claim		*Claim
	expirationTime := time.Now().Add(999999 * time.Hour)

	switch u := user.(type) {
	case *models.Paciente:
		claim = &Claim{
			Nome: u.Nome_completo,
			CPF:  u.Cpf,
			Role: "000000",
			Ubs_id: "01",
			RegisteredClaims: jwt.RegisteredClaims{
				ExpiresAt: jwt.NewNumericDate(expirationTime),
			},
		}
	case *models.Users:
		claim = &Claim{
			Nome: u.Nome,
			CPF:  u.CPF,
			Role: u.Role,
			Ubs_id: "01",
			RegisteredClaims: jwt.RegisteredClaims{
				ExpiresAt: jwt.NewNumericDate(expirationTime),
			},
		}
	default:
		return "", fmt.Errorf("tipo de usuário não suportado")
	}

//	token := jwt.NewWithClaims(jwt.SigningMethodES256, claim)
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claim)
	

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
	var err		error
	var token	string

	FCredentials := strings.ReplaceAll(credentials.CPF, ".", "")
	FCredentials = strings.ReplaceAll(FCredentials, "-", "")
	FCredentials = strings.ReplaceAll(FCredentials, " ", "")

	var user any

	for i := 1; i <= 2; i++ {
		if len(FCredentials) != 11 {
			log.Printf("Erro, CPF '%s' inválido!", FCredentials)
			err = fmt.Errorf("error, CPF '%s' inválido", FCredentials)
			continue
		}

		switch i {
		case 1:
			user, err = s.pacienteRepository.FindPatientByCPF(c, &FCredentials)
		case 2:
			user, err = s.userRepository.GetUserbyCPF(c, FCredentials)
		}

		if err != nil {
			continue
		}

		var senha string
		switch u := user.(type) {
		case *models.Paciente:
			senha = u.Senha		
		case *models.Users:
			senha = u.Senha
		default:
			err = fmt.Errorf("tipo de usuário desconhecido")
			continue
		}

		if err = bcrypt.CompareHashAndPassword([]byte(senha), []byte(credentials.Password)); err != nil {
			if errors.Is(err, bcrypt.ErrMismatchedHashAndPassword) {
				return "", fmt.Errorf("credencial inválida: %v", err.Error())
			}
			err = fmt.Errorf("erro ao validar credenciais: %v", err.Error())
			continue
		}

		if token, err = s.GerarToken(user); err != nil {
			err = fmt.Errorf("erro ao gerar token: %v", err.Error())
			continue
		}

		err = nil
		break
	}

	log.Println(err)

	if err != nil {
		return "", err
	}

	return token, nil
}