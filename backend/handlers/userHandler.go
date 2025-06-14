package handlers

import (
	"backend/services"
	"log"
	"net/http"
	
	"github.com/gin-gonic/gin"
)

type UserHandler struct {
	userService *services.UserService
}

func NewUserHandler (userService *services.UserService) *UserHandler {
	return &UserHandler{userService: userService}
}

func (h *UserHandler) GetUsersHandler(c *gin.Context) {
	usuarios, err := h.userService.GetAllUsers()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao buscar Usuário"})
		log.Println("Erro ao buscar Usuário: ", err)
		return
	}
	c.JSON(http.StatusOK, usuarios)
}
