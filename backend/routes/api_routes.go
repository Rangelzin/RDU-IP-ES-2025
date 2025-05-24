package routes

import (
	"github.com/gin-gonic/gin"
	"backend/handlers"
)

func RegisterAPIRoutes (rg *gin.RouterGroup) {
	rg.GET("/ping", handlers.PingHandler)
}