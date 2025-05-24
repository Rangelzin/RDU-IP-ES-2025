package middleware

import (
	"time"
	"github.com/gin-gonic/gin"
	"log"
)

// middleware de tempo // Calcula o tempo que uma requisição leva para rodar
func TimingMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Marca o tempo inicial da requisição
		start := time.Now()

		c.Next()
		// Calcula quanto tempo levou após o c.Next()
		duration := time.Since(start)
		log.Printf("Request %s took %v", c.Request.URL.Path, duration) // Loga o tempo da requisição
	}
}