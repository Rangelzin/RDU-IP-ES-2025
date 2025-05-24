package server

import (
	"github.com/gin-gonic/gin"
	"backend/middleware"
	"backend/routes"
)

func SetupRouter () *gin.Engine {
	r := gin.Default()

	// Middlewares
	r.Use(middleware.CORSMiddleware())
	r.Use(middleware.TimingMiddleware())
//	r.Use(middleware.AuthMiddleware()) no futuro | json web token

	// Registra os grupos de rotas importadas da pasta routes
	rg := r.Group("/api")
	routes.RegisterAPIRoutes(rg)

	return r
}