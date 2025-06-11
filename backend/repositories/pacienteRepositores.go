package repositories

import (
	"backend/database"
	"backend/models"
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
