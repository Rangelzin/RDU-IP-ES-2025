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
<<<<<<< HEAD
	authMiddleware := deps.Middleware.AuthenticatorMiddleware()
=======
	r.Use(deps.Middleware.AuthenticatorMiddleware())	
>>>>>>> a722d8d35acb0e7a71b902ef3e52f03ab4189f7d

	rg := r.Group("/login")
	routes.RegisterAuthPages(rg)

	rg = r.Group("/auth")
	routes.RegisterAuthRoutes(rg, deps.AuthHandler)


	rg = r.Group("/api")
	rg.Use(authMiddleware)
	routes.RegisterAPIPacienteRoutes(rg, deps.PacienteHandler)
	routes.RegisterAPIUserRoutes(rg, deps.UserHandler)
	routes.RegisterAPIExamRoutes(rg, deps.ExamHandler)
	
	r.NoRoute(func(c *gin.Context) {c.File("../frontend/public/pages/404.html")})

	return r
}
