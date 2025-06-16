package handlers

import (
	"backend/services"
	"backend/models"
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

 func (h *UserHandler) CreateUserHandler(c *gin.Context) {
    var user models.Users

    if err := c.ShouldBindJSON(&user); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"erro": "JSON inválido"})
        return
    }

    if err := h.userService.CadastraUsuario(c, &user); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"erro": "Erro ao cadastrar usuário"})
        return
    }

    c.JSON(http.StatusCreated, gin.H{
        "mensagem": "Usuário criado com sucesso",
    })
}