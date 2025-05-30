package routes

import (
	"backend/handlers"
	"github.com/gin-gonic/gin"
)

func LoginRoutes (rg *gin.RouterGroup) {
	rg.GET("/login", func(c *gin.Context) {c.File("../frontend/public/pages/login.html")})
	rg.POST("/login", handlers.LoginHandler)
}
