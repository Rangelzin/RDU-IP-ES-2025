package server

import (
	"backend/middleware"
	"backend/routes"
	"github.com/gin-gonic/gin"
)

func SetupRouter (deps *Dependencies) *gin.Engine {
	r := gin.Default()

	// Serve o diretório dos arquivos estáticos da aplicação
	r.Static("/assets", "../frontend/public/assets")

	// Middlewares
	r.Use(middleware.CORSMiddleware())
	r.Use(middleware.TimingMiddleware())
//	r.Use(middleware.AuthMiddleware()) no futuro | json web token

	// Registra os grupos de rotas importadas da pasta routes
	rg := r.Group("/api")
	routes.RegisterAPIRoutes(rg, deps.PacienteHandler)

	rg = r.Group("/")
	routes.LoginRoutes(rg)

	// ERROR Pages
	r.NoRoute(func(c *gin.Context) {c.File("../frontend/public/pages/404.html")})

	return r
}