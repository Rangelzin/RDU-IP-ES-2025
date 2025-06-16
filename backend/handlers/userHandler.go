package handlers

import (
	"backend/models"
	"backend/services"
	"log"
	"net/http"
	"strconv"
    "strings"
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
		log.Println("Erro ao fazer bind do JSON:", err)
        c.JSON(http.StatusBadRequest, gin.H{"erro": "JSON inválido"})
        return
    }

    if err := h.userService.CadastraUsuario(c, &user); err != nil {
		log.Println("Erro ao cadastrar usuário: ", err)
        c.JSON(http.StatusInternalServerError, gin.H{"erro": "Erro ao cadastrar usuário"})
        return
    }

    c.JSON(http.StatusCreated, gin.H{
        "mensagem": "Usuário criado com sucesso",
    })
}

func (h *UserHandler) DeleteUserHandler(c *gin.Context) {
	idStr := c.Param("id")
    id, err := strconv.Atoi(idStr)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"erro": "ID inválido, deve ser um número inteiro"})
        return
    }

    // Chama o serviço para deletar o usuário
    err = h.userService.DeletarUsuario(id)
    if err != nil {
        
        if strings.Contains(err.Error(), "não encontrado") {
            c.JSON(http.StatusNotFound, gin.H{"erro": err.Error()})
        } else {
            log.Println("Erro ao deletar usuário: ", err)
            c.JSON(http.StatusInternalServerError, gin.H{"erro": "Erro interno ao deletar usuário"})
        }
        return
    }

    c.JSON(http.StatusOK, gin.H{"mensagem": "Usuário deletado com sucesso"})
}