package routes

import (
	"backend/auth"

	"github.com/gin-gonic/gin"
)

func RegisterAuthRoutes(rg *gin.RouterGroup, authHandler *auth.AuthHandler) {
	rg.POST("/login", authHandler.Login)
}

func RegisterAuthPages(rg *gin.RouterGroup) {
	rg.GET("/login", func(c *gin.Context) {c.File("../frontend/public/pages/login.html")})
}