package repositories

import (
	"backend/database"
	"backend/models" 
	"database/sql"
	"fmt"
	"log"
)

type FindExamRepository struct {
	db *database.DatabaseCliente
}

func NewFindExamRepository(dbClient *database.DatabaseCliente) *FindExamRepository {
	return &FindExamRepository{db: dbClient}
}


func (r *FindExamRepository) FindExamByID(id int) (*models.FindExames, error) { 
	query := `
		SELECT
			id, paciente_id, paciente_name, protocolo, prontuario, data_resultado, created_at
		FROM exames
		WHERE id = $1;`

	var exam models.FindExames 
	row := r.db.DB.QueryRow(query, id)
	err := row.Scan(
		&exam.Id,
		&exam.Paciente_id,
		&exam.Paciente_name,
		&exam.Protocolo,
		&exam.Prontuario,
		&exam.Data_resultado,
		&exam.Created_at,
	)

	switch {
	case err == sql.ErrNoRows:
		log.Printf("No exam found with ID %d", id)
		return nil, sql.ErrNoRows
	case err != nil:
		log.Printf("Error scanning exam with ID %d: %v", id, err)
		return nil, fmt.Errorf("failed to scan exam: %w", err)
	default:
		return &exam, nil
	}
}