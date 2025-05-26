package handlers

import (
	"github.com/gin-gonic/gin"
)

func LoginHandler(c *gin.Context) {
    login := c.PostForm("login")
    senha := c.PostForm("senha")

    c.JSON(200, gin.H{"login": login, "senha": senha})
}
