package middleware

import(
	"github.com/gin-gonic/gin"
)

// configuração headers CORS // Permite que o frontend acesse a API
func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Permite o acesso de qualquer origem
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*") // alterar no futuro
		// Permite o uso dos métodos GET, POST, PUT, DELETE e OPTIONS
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		// Permite o envio de dados no corpo da requisição e o envio de token de autenticação
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-type, Authorization")
	
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}