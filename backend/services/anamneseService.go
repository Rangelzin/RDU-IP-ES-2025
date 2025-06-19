package services 
import (
	"backend/models"
	"backend/repositories"
	"github.com/gin-gonic/gin"
)

type AnamneseService struct {
	anamneseRepository *repositories.AnamneseRepository
}

func NewAnamneseService(anamneseRepository *repositories.AnamneseRepository) *AnamneseService {
	return &AnamneseService{anamneseRepository: anamneseRepository}
}

func (s *AnamneseService) CadastraAnamnese(c *gin.Context, anamnese *models.Etapa01Anamnese) error {
	err := s.anamneseRepository.InsertAnamnese(c, anamnese)
	if err != nil {
		return err
	}
	return nil
}

