package handlers

import (
	"backend/models"
	"backend/services"
	"database/sql"
	"fmt"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"strings"
)

type ExamHandler struct {
	examServ *services.ExamService
}

func NewExamHandler(svc *services.ExamService) *ExamHandler {
	return &ExamHandler{examServ: svc}
}

// GET
func (h *ExamHandler) GetExamsHandler(c *gin.Context) {
	exames, err := h.examServ.GetExamService()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao buscar exame"})
		log.Println("Erro ao buscar exame: ", err)
		return
	}
	c.JSON(http.StatusOK, exames)
}

func (h *ExamHandler) GetExamByPROTOCOLOHandler(c *gin.Context) {
	protocolo := c.Param("Protocolo")

	if protocolo == "" {

		c.JSON(http.StatusBadRequest, gin.H{"error": "Número de protocolo não fornecido na URL."})
		return
	}

	exam, err := h.examServ.GetExamByPROTOCOLO(c.Request.Context(), protocolo)
	if err != nil {
		if err == sql.ErrNoRows {
			c.JSON(http.StatusNotFound, gin.H{"error": "Exame não encontrado."})
		} else {

			log.Printf("Erro ao buscar exame por protocolo '%s': %v", protocolo, err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao buscar exame", "details": err.Error()})
		}
		return
	}

	c.JSON(http.StatusOK, exam)
}

func (h *ExamHandler) CreateExamHandler(c *gin.Context) {
	cpf := c.Param("cpf")
	var exam models.Exames

	if err := c.ShouldBindJSON(&exam); err != nil {
		log.Println("Erro ao fazer bind do JSON:", err)
		c.JSON(http.StatusBadRequest, gin.H{"erro": "JSON inválido"})
		return
	}

		exam.Cpf = cpf

	if err := h.examServ.CreateExam(c, &exam); err != nil {
		err = fmt.Errorf("erro ao cadastrar usuário: ", err)
		log.Println(err)
		c.JSON(http.StatusInternalServerError, gin.H{"erro": err})
		return
	}
	c.JSON(http.StatusCreated, gin.H{
		"mensagem": "Exame criado com sucesso",
	})
}

func (h *ExamHandler) CreateAnamneseHandler(c *gin.Context) {
	// 1. Pegar o PROTOCOLO do exame da URL (que está no parâmetro ":id")
	protocolo := c.Param("id") // O parâmetro na URL é ":id", mas estamos interpretando-o como protocolo
	if protocolo == "" {
		c.JSON(http.StatusBadRequest, gin.H{"erro": "Protocolo do exame não fornecido na URL."})
		return
	}
	var anamnese models.Etapa01Anamnese
	if err := c.ShouldBindJSON(&anamnese); err != nil {
		log.Println("Erro ao fazer bind do JSON da anamnese:", err)
		c.JSON(http.StatusBadRequest, gin.H{"erro": "Dados da anamnese inválidos", "detalhes": err.Error()})
		return
	}
	if err := h.examServ.CadastraAnamnese(c, protocolo, &anamnese); err != nil {
		if err.Error() == "exame não encontrado para o protocolo fornecido. Não é possível cadastrar anamnese." ||
			err.Error() == "responsável não encontrado." {
			c.JSON(http.StatusBadRequest, gin.H{"erro": err.Error()})
		} else {
			log.Printf("Erro inesperado ao cadastrar anamnese: %v", err)
			c.JSON(http.StatusInternalServerError, gin.H{"erro": "Erro ao cadastrar anamnese", "detalhes": err.Error()})
		}
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"mensagem": "Anamnese criada com sucesso",
	})
}

func (h *ExamHandler) CreateClinicoHandler(c *gin.Context) {
	var exam models.Etapa02Clinico
	protocolo := c.Param("id")

	if protocolo == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Número de protocolo não fornecido na URL."})
		return
	}

	if err := c.ShouldBindJSON(&exam); err != nil {
		log.Println("Erro ao fazer bind do JSON:", err)
		c.JSON(http.StatusBadRequest, gin.H{"erro": "JSON inválido"})
		return
	}

	if err := h.examServ.CadastraClinicalStage(c, &exam,protocolo); err != nil {
        if strings.Contains(err.Error(), "conflito") {
            c.JSON(http.StatusConflict, gin.H{"erro": "Etapa clínica já cadastrada para este exame."})
        } else if strings.Contains(err.Error(), "exame não encontrado") {
            c.JSON(http.StatusNotFound, gin.H{"erro": "Exame não encontrado para associar a etapa clínica."})
        } else {
            log.Printf("Erro ao cadastrar etapa clinica: %v", err)
            c.JSON(http.StatusInternalServerError, gin.H{"erro": "Erro interno ao cadastrar etapa clínica."})
        }
        return
	}

	c.JSON(http.StatusCreated, gin.H{
		"mensagem": "Etapa clinica do exame criada com sucesso",
	})
}

func (h *ExamHandler) CreateLaboratorioHandler(c *gin.Context) {
	protocolo := c.Param("id")
	if protocolo == "" {
		c.JSON(http.StatusBadRequest, gin.H{"erro": "Protocolo do exame não fornecido na URL."})
		return
	}

	var lab models.Etapa03Lab
	if err := c.ShouldBindJSON(&lab); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"erro": "Dados de laboratório inválidos", "detalhes": err.Error()})
		return
	}

	if err := h.examServ.CadastraLaboratorio(c, protocolo, &lab); err != nil {
		if strings.Contains(err.Error(), "exame não encontrado") || strings.Contains(err.Error(), "responsável não encontrado") {
			c.JSON(http.StatusBadRequest, gin.H{"erro": err.Error()})
		} else {
			log.Printf("Erro ao cadastrar informações do laboratório: %v", err)
			c.JSON(http.StatusInternalServerError, gin.H{"erro": "Erro ao cadastrar informações do laboratório", "detalhes": err.Error()})
		}
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"mensagem": "Informações do laboratório criadas com sucesso",
	})
}

func (h *ExamHandler) CreateResultadoHandler(c *gin.Context) {
	protocolo := c.Param("id")
	if protocolo == "" {
		c.JSON(http.StatusBadRequest, gin.H{"erro": "Protocolo do exame não fornecido na URL."})
		return
	}

	var res models.Etapa04Resultado
	if err := c.ShouldBindJSON(&res); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"erro": "Dados de resultado inválidos", "detalhes": err.Error()})
		return
	}

	if err := h.examServ.CadastraResultado(c, protocolo, &res); err != nil {
		if strings.Contains(err.Error(), "exame não encontrado") || strings.Contains(err.Error(), "responsável não encontrado") {
			c.JSON(http.StatusBadRequest, gin.H{"erro": err.Error()})
		} else {
			log.Printf("Erro ao cadastrar resultado do exame: %v", err)
			c.JSON(http.StatusInternalServerError, gin.H{"erro": "Erro ao cadastrar resultado do exame", "detalhes": err.Error()})
		}
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"mensagem": "Resultado do exame criado com sucesso",
	})
}

func (h *ExamHandler) GetFichaCompletaHandler(c *gin.Context) {
	protocolo := c.Param("protocolo")
	if protocolo == "" {
		c.JSON(http.StatusBadRequest, gin.H{"erro": "O protocolo do exame é obrigatório"})
		return
	}

	ficha, err := h.examServ.GetFichaCompletaByProtocolo(c, protocolo)
	if err != nil {
		
		if err == sql.ErrNoRows {
			c.JSON(http.StatusNotFound, gin.H{"erro": "Exame não encontrado"})
			return
		}
		log.Printf("Erro ao processar a requisição da ficha completa para o protocolo %s: %v", protocolo, err)
		c.JSON(http.StatusInternalServerError, gin.H{"erro": "Erro ao buscar a ficha completa do exame"})
		return
	}

	c.JSON(http.StatusOK, ficha)
}
