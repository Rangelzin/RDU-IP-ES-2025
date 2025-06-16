package repositories

import (
	"backend/database"
	"backend/models"
	"database/sql"
	"fmt"
	"log"
)

type ExamRepository struct {
	db *database.DatabaseCliente
}

func NewExamRepository(dbClient *database.DatabaseCliente) *ExamRepository {
	return &ExamRepository{db:dbClient}
}

func (r *ExamRepository) GetAllExams() (*[]models.Exames, error) {
	rows, err := r.db.DB.Query("SELECT * FROM exames;")
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
			&e.Protocolo,
			&e.Prontuario,
			&e.Data_resultado,
			&e.Created_at,);
			err != nil {return nil, err}
		exam = append(exam, e)	
	}

	return &exam, nil
}

func (r *ExamRepository) FindExamByPROTOCOLO(protocolo string) (*models.Exames, error) {
	query := `
		SELECT
			id, paciente_id, paciente_name, protocolo, prontuario, data_resultado, created_at
		FROM exames
		WHERE protocolo = $1;` 

	var e models.Exames
	row := r.db.DB.QueryRow(query, protocolo) 
	err := row.Scan(
		&e.Id,
		&e.Paciente_id,
		&e.Paciente_name,
		&e.Protocolo,
		&e.Prontuario,
		&e.Data_resultado,
		&e.Created_at,
	)

	switch {
	case err == sql.ErrNoRows:
		log.Printf("No exam found with protocolo:", protocolo) 
		return nil, sql.ErrNoRows
	case err != nil:
		log.Printf("Error scanning exam with protocolo: ", protocolo) 
		return nil, fmt.Errorf("failed to scan exam: %w", err)
	default:
		return &e, nil
	}
}