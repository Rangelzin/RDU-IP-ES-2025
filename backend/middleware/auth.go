package middleware

import (
	"backend/auth"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

type AuthMiddleware struct {
	authService *auth.AuthService
}

func NewMiddlewareAuth(authService *auth.AuthService) *AuthMiddleware {
	return &AuthMiddleware{authService: authService}
}

func (m *AuthMiddleware) AuthenticatorMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		var token	string

		if token = c.GetHeader("Authorization"); token == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"erro": "Token não fornecido"})
			c.Abort()
			return
		}

		token = strings.TrimSpace(strings.TrimPrefix(token, "Bearer"))

		claim, err := m.authService.AuthToken(token)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"erro": "token inválido: " + err.Error()})
			c.Abort()
			return
		}

		c.Set("usuarioAutenticado", claim)
		c.Next()
	}
}