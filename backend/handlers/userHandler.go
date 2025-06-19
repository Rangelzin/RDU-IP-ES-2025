package handlers

import (
	"backend/models"
	"backend/services"
	"log"
	"net/http"
	"strconv"
    "strings"
	"errors"
	"database/sql"
	"fmt"
	"github.com/gin-gonic/gin"
)

type UserHandler struct {
	userService *services.UserService
}

func NewUserHandler (userService *services.UserService) *UserHandler {
	return &UserHandler{userService: userService}
}
// GET
func (h *UserHandler) GetUsersHandler(c *gin.Context) {
	usuarios, err := h.userService.GetAllUsers()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao buscar Usuário"})
		log.Println("Erro ao buscar Usuário: ", err)
		return
	}
	c.JSON(http.StatusOK, usuarios)
}

func (h *UserHandler) GetUserbyCPFHandler(c *gin.Context) {
	cpf := c.Param("cpf")

	userC, err := h.userService.GetUserbyCPF(c, cpf)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			c.JSON(http.StatusNotFound, gin.H{"error": "Usuário não encontrado"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao buscar usuário"})
		log.Println("Erro ao buscar usuário: ", err)
		return
	}

	c.JSON(http.StatusOK, userC)
}

// POST
 func (h *UserHandler) CreateUserHandler(c *gin.Context) {
    var user models.Users

    if err := c.ShouldBindJSON(&user); err != nil {
		log.Println("Erro ao fazer bind do JSON:", err)
        c.JSON(http.StatusBadRequest, gin.H{"erro": "JSON inválido"})
        return
    }

    if err := h.userService.CadastraUsuario(c, &user); err != nil {
		err = fmt.Errorf("erro ao cadastrar usuário: ", err)
		log.Println(err)
        c.JSON(http.StatusInternalServerError, gin.H{"erro": err})
        return
    }

    c.JSON(http.StatusCreated, gin.H{
        "mensagem": "Usuário criado com sucesso",
    })
}

// DELET
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

func (h *UserHandler) UpdateUserHandler(c *gin.Context) {
	cpf := c.Param("cpf")
	
	var user models.Users
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "JSON Inválido: " + err.Error()})
		return
	}

	if err := h.userService.UpdateUser(c, cpf, &user); err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			c.JSON(http.StatusNotFound, gin.H{"error": "Usuário não encontrado"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Falha ao atualizar usuário"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Usuário atualizado com sucesso"})
	
}
