package repositories 
import (
	"backend/database"
	"backend/models"
	"log"
	"github.com/gin-gonic/gin")

	type AnamneseRepository struct {
		db *database.DatabaseCliente
	}

	func NewAnamneseRepository(db *database.DatabaseCliente) *AnamneseRepository {
		return &AnamneseRepository{db: db}
	}

	func (r *AnamneseRepository) InsertAnamnese(c *gin.Context, anamnese *models.Etapa01Anamnese) error {
	 query := `INSERT INTO anamnese (
    exame_id, responsavel_id, motivo_exame, fez_preventivo, ano_ultimo_exame,
    usa_diu, gravida, usa_pilula, usa_hormonio, radioterapia,
    ultima_menstruacao, sangramento_relacao, sangramento_menopausa
) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`

	ctx := c.Request.Context()

	res, err := r.db.DB.ExecContext(ctx, query,
		anamnese.Exame_id,
		anamnese.Responsavel_id,
		anamnese.Motivo_exame,
		anamnese.Fez_preventivo,
		anamnese.Ano_ultimo_exame,
		anamnese.Usa_diu,
		anamnese.Gravida,
		anamnese.Usa_pilula,
		anamnese.Usa_hormonio,
		anamnese.Radioterapia,
		anamnese.Ultima_menstruacao,
		anamnese.Sangramento_relacao,
		anamnese.Sangramento_menopausa,
	)

	if err != nil {
		log.Println("Erro no ExecContext: ", err)
		return err
	}

	if rowsAffected, err := res.RowsAffected(); err == nil {
		log.Println("Linhas afetadas:", rowsAffected)
	}

	return nil
}	



	