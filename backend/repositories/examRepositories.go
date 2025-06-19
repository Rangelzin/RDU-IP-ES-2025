package repositories

import (
	"backend/database"
	"backend/models"
	"database/sql"
	"fmt"
	"log"
	"github.com/gin-gonic/gin"
	"context"
	"strings"
)

type ExamRepository struct {
	db *database.DatabaseCliente
}

func NewExamRepository(dbClient *database.DatabaseCliente) *ExamRepository {
	return &ExamRepository{db:dbClient}
}

func (r *ExamRepository) GetAllExams() (*[]models.Exames, error) {
	rows, err := r.db.DB.Query("SELECT e.id, e.paciente_id, p.nome_completo, p.cpf, e.protocolo, e.prontuario, e.data_resultado, e.created_at FROM exames e INNER JOIN pacientes p ON e.paciente_id = p.id;")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var exam []models.Exames
	for rows.Next(){
		var e models.Exames
		if err := rows.Scan(
			&e.Id,
			&e.Paciente_id,
			&e.Paciente_name,
			&e.Cpf,
			&e.Protocolo,
			&e.Prontuario,
			&e.Data_resultado,
			&e.Created_at,);
			err != nil {return nil, err}
		exam = append(exam, e)	
	}

	return &exam, nil
}

func (r *ExamRepository) FindExamByPROTOCOLO(ctx context.Context, protocolo string) (*models.Exames, error) {
    protocolo = strings.TrimSpace(protocolo)
	query := `
        SELECT
            e.id,
            e.paciente_id,
            p.nome_completo,
            p.cpf,
            e.protocolo,
            e.prontuario,
            e.data_resultado,
            e.created_at
        FROM
            exames e
        INNER JOIN
            pacientes p ON e.paciente_id = p.id
        WHERE
            e.protocolo = $1;`

    var e models.Exames

    row := r.db.DB.QueryRowContext(ctx, query, protocolo)

    err := row.Scan(
        &e.Id,
        &e.Paciente_id,
        &e.Paciente_name,
        &e.Cpf,
        &e.Protocolo,
        &e.Prontuario,
        &e.Data_resultado,
        &e.Created_at,
    )

    switch {
    case err == sql.ErrNoRows:
        log.Printf("Nenhum exame encontrado com protocolo: %s", protocolo)
        return nil, sql.ErrNoRows
    case err != nil:
        log.Printf("Erro ao escanear exame com protocolo %s: %v", protocolo, err)
        return nil, fmt.Errorf("falha ao escanear exame: %w", err)
    default:
        return &e, nil
    }
}



func (r *ExamRepository) InsertExam(c *gin.Context, exam *models.Exames) error {
	query := `INSERT INTO exames (paciente_id, protocolo, prontuario, data_resultado) VALUES ($1,$2,$3,$4)`
	ctx := c.Request.Context()

	res, err := r.db.DB.ExecContext(ctx, query, exam.Paciente_id, exam.Protocolo, exam.Prontuario, exam.Data_resultado)

	if res != nil {
		if rowsaffected, err := res.RowsAffected(); err != nil {
			log.Println("Linhas Afetadas: ", rowsaffected)
			return err
		}
		log.Println("Erro no ExecContext: ", err)
		return err
	}

	return nil
}