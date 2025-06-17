package auth

import (
	"backend/dto"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

type AuthHandler struct {
	authService *AuthService
}

func NewAuthHandler(authService *AuthService) *AuthHandler {
	return &AuthHandler{authService: authService}
}

func (h *AuthHandler) Login(c *gin.Context) {
	var credentials dto.UserCredentials
	var	token		string
	var err			error

	if err := c.ShouldBindJSON(&credentials); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"erro": "Requisição inválidas"})
		return
	}

	if token, err = h.authService.UserAuth(c, credentials); err != nil {
		if strings.Contains(err.Error(), "Credencial inválida:"){
			c.JSON(http.StatusUnauthorized, gin.H{"erro": "Credenciais inválidas"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"erro": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"token": token})
}

