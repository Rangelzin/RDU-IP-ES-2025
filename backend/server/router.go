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
	authMiddleware := deps.Middleware.AuthenticatorMiddleware()

	rg := r.Group("/")
	routes.RegisterAuthPages(rg)

	rg = r.Group("/api/auth")
	routes.RegisterAuthRoutes(rg, deps.AuthHandler)


	rg = r.Group("/api")
	rg.Use(authMiddleware)
	routes.RegisterAPIPacienteRoutes(rg, deps.PacienteHandler)
	routes.RegisterAPIUserRoutes(rg, deps.UserHandler)
	routes.RegisterAPIExamRoutes(rg, deps.ExamHandler)

	rg = r.Group("/admin")
	rg.Use(authMiddleware)
	routes.RegisterAdminPages(rg)

	rg = r.Group("/main")
	rg.Use(authMiddleware)
	routes.RegisterUserPages(rg)

	// rg = r.Group("/paciente")
	
	r.NoRoute(func(c *gin.Context) {c.File("../frontend/public/pages/404.html")})

	return r
}
