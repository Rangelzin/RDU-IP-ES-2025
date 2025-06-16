package server

import (
	"backend/middleware"
	"backend/routes"
	"github.com/gin-gonic/gin"
)

func SetupRouter (deps *Dependencies) *gin.Engine {
	r := gin.Default()


	r.Static("/assets", "../frontend/public/assets")

	r.Use(middleware.CORSMiddleware())
	r.Use(middleware.TimingMiddleware())
	r.Use(deps.Middleware.AuthenticatorMiddleware())

	rg := r.Group("/auth")
	routes.RegisterAuthRoutes(rg, deps.AuthHandler)


	rg = r.Group("/api")
	routes.RegisterAPIPacienteRoutes(rg, deps.PacienteHandler)
	routes.RegisterAPIUserRoutes(rg, deps.UserHandler)
	routes.RegisterAPIExamRoutes(rg, deps.ExamHandler)
	
	

	rg = r.Group("/")
	routes.LoginRoutes(rg)

	r.NoRoute(func(c *gin.Context) {c.File("../frontend/public/pages/404.html")})

	return r
}