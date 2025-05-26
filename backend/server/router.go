package server

import (
	"backend/middleware"
	"backend/routes"
	"github.com/gin-gonic/gin"
)

func SetupRouter () *gin.Engine {
	r := gin.Default()

	// Serve o diretório dos arquivos estáticos da aplicação
	r.Static("/assets", "../frontend/public/assets")

	// Middlewares
	r.Use(middleware.CORSMiddleware())
	r.Use(middleware.TimingMiddleware())
//	r.Use(middleware.AuthMiddleware()) no futuro | json web token

	// Registra os grupos de rotas importadas da pasta routes
	rg := r.Group("/api")
	routes.RegisterAPIRoutes(rg)

	rg = r.Group("/")
	routes.LoginRoutes(rg)

	// ERROR Pages

	return r
}