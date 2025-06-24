package routes

import (
	"github.com/gin-gonic/gin"
)

func RegisterAdminPages(rg *gin.RouterGroup) {
	rg.GET("/", func(c *gin.Context) { c.File("../frontend/public/pages/main/main_admin.html") })
	rg.GET("/paciente", func(c *gin.Context) { c.File("../frontend/public/pages/main/admin/admin_paciente.html") })
	rg.GET("/dashboard", func(c *gin.Context) { c.File("../frontend/public/pages/main/admin/dashboard_admin.html") })
	rg.GET("/usuario", func(c *gin.Context) { c.File("../frontend/public/pages/main/admin/admin_usuario.html") })
	rg.GET("/usuario/criar", func(c *gin.Context) { c.File("../frontend/public/pages/main/admin/criar_usuario.html") })
	rg.GET("/usuario/editar", func(c *gin.Context) { c.File("../frontend/public/pages/main/admin/editar_usuario.html") })
}

func RegisterUserPages(rg *gin.RouterGroup) {
	rg.GET("/", func(c *gin.Context) {c.File("../frontend/public/pages/main/main_geral.html")})
	rg.GET("/usuario/exame", func(c *gin.Context) {c.File("../frontend/public/pages/main/users/exam_page_starterInfo.html")})
	rg.GET("/usuario/search_exam", func(c *gin.Context) {c.File("../frontend/public/pages/main/users/search_exam.html")})
	rg.GET("/usuario/exam_status", func(c *gin.Context) {c.File("../frontend/public/pages/main/paciente/examStatus.html")})
	rg.GET("/ACS", func(c *gin.Context) { c.File("../frontend/public/pages/main/main_agenteComunitario.html") })

	rg.GET("/anamnese", func(c *gin.Context) { c.File("../pags_app/anamnese.html") })
}

func RegisterPatientPages(rg *gin.RouterGroup) {
	rg.GET("/", func(c *gin.Context) { c.File("../frontend/public/pages/main/main_paciente.html") })
}
