package routes

import (
	"backend/auth"

	"github.com/gin-gonic/gin"
)

func RegisterAuthRoutes(rg *gin.RouterGroup, authHandler *auth.AuthHandler) {
	rg.POST("/login", authHandler.Login)
}