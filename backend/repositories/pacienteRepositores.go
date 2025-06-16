package repositories

import (
	"backend/database"
	"backend/models"
	"database/sql"
	"fmt"
	"log"

	"github.com/gin-gonic/gin"
)

type PacienteRepository struct {
	db *database.DatabaseCliente
}

func NewPacienteRepository(db *database.DatabaseCliente) *PacienteRepository {
	return &PacienteRepository{db: db}
}

func (r *PacienteRepository) FindAllPatients() (*[]models.Paciente, error) {
	rows, err := r.db.DB.Query("SELECT * FROM pacientes ORDER BY nome_completo ASC;")
	if err != nil{
		return nil, err
	}
	defer rows.Close()

	var patients []models.Paciente
	for rows.Next() {
		var p models.Paciente
		if err := rows.Scan(
			&p.Id,
			&p.Nome_completo,
			&p.Nome_mae,
			&p.Apelido,
			&p.Cpf,
			&p.Senha,
			&p.Data_nascimento,
			&p.Idade,
			&p.Logradouro,
			&p.Numero,
			&p.Complemento,
			&p.Bairro, &p.Municipio,
			&p.Uf,
			&p.Cep,
			&p.Telefone,
			&p.Ponto_referencia,
			&p.Escolaridade,
			&p.Cartao_sus,
			&p.Raca_cor,
			&p.Nacionalidade,
			&p.Ubs_id,
			&p.Created_at); 
			err != nil {return nil, err}
		patients = append(patients, p)
	}

	return &patients, nil
}

func (r *PacienteRepository) FindPatientByCPF(c *gin.Context, cpf *string) (*models.Paciente, error) {
	ctx := c.Request.Context()
	var p models.Paciente

	row := r.db.DB.QueryRowContext(ctx, "SELECT * FROM pacientes WHERE cpf = $1", cpf)
	err := row.Scan(
		&p.Id,
		&p.Nome_completo,
		&p.Nome_mae,
		&p.Apelido,
		&p.Cpf,
		&p.Senha,
		&p.Data_nascimento,
		&p.Idade,
		&p.Logradouro,
		&p.Numero,
		&p.Complemento,
		&p.Bairro, &p.Municipio,
		&p.Uf,
		&p.Cep,
		&p.Telefone,
		&p.Ponto_referencia,
		&p.Escolaridade,
		&p.Cartao_sus,
		&p.Raca_cor,
		&p.Nacionalidade,
		&p.Ubs_id,
		&p.Created_at); 
		fmt.Print(p)
	
	switch{
	case err == sql.ErrNoRows:
		log.Printf("No Pacient with CPF %v", cpf)
		return nil, err
	case err != nil:
		return nil, err
	default:
		return &p, nil
	}
}
