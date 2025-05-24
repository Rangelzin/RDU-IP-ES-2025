package handlers

import (
	"github.com/gin-gonic/gin"
)

// Responde com "pong"
func PingHandler (c *gin.Context) {
	c.JSON(200, gin.H{"message": "pong"})
}