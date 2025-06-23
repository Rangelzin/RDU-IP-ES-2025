package server

import (
	"backend/middleware"
	"backend/routes"
	"github.com/gin-gonic/gin"
)

func SetupRouter(deps *Dependencies) *gin.Engine {
	r := gin.Default()

	r.Static("/assets", "../frontend/public/assets")
	r.Static("/app", "../frontend/app")
	r.Static("/environment", "../frontend/environment")
	r.Static("/src", "../frontend/src")
	r.Static("/configs", "../configs")
	
	r.Use(middleware.CORSMiddleware())
	r.Use(middleware.TimingMiddleware())
	authMiddleware := deps.Middleware.AuthenticatorMiddleware()

	rg := r.Group("/")
	routes.RegisterAuthPages(rg)

	rg = r.Group("/api/auth")
	routes.RegisterAuthRoutes(rg, deps.AuthHandler)

	rg = r.Group("/admin")
	routes.RegisterAdminPages(rg)

	rg = r.Group("/main")
	routes.RegisterUserPages(rg)

	rg = r.Group("/paciente")
	routes.RegisterPatientPages(rg)

	rg = r.Group("/api")
	rg.Use(authMiddleware)
	routes.RegisterAPIPacienteRoutes(rg, deps.PacienteHandler)
	routes.RegisterAPIUserRoutes(rg, deps.UserHandler)
	routes.RegisterAPIExamRoutes(rg, deps.ExamHandler)

	r.NoRoute(func(c *gin.Context) { c.File("../frontend/public/pages/404.html") })
	return r
}
