package routes

import (
	"github.com/gin-gonic/gin"
)


func RegisterAdminPages(rg *gin.RouterGroup) {
	rg.GET("/", func(c *gin.Context) {c.File("../frontend/public/pages/login.html")})
}

func RegisterUserPages(rg *gin.RouterGroup) {
	rg.GET("/", func(c *gin.Context) {c.File("../frontend/public/pages/main/main_admin.html")})
}


