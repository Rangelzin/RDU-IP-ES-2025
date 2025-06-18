package repositories

import (
	"backend/database"
	"backend/models"
	"context"
	"database/sql"
	"github.com/gin-gonic/gin"
	"log"
	"time"
)

type PacienteRepository struct {
	db *database.DatabaseCliente
}

func NewPacienteRepository(db *database.DatabaseCliente) *PacienteRepository {
	return &PacienteRepository{db: db}
}

func (r *PacienteRepository) FindAllPatients() (*[]models.Paciente, error) {
	rows, err := r.db.DB.Query("SELECT * FROM pacientes ORDER BY nome_completo ASC;")
	if err != nil {
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
			&p.Created_at); err != nil {
			return nil, err
		}
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
		&p.Created_at)

	switch {
	case err == sql.ErrNoRows:
		log.Println("No Pacient with CPF ", *cpf)
		return nil, err
	case err != nil:
		return nil, err
	default:
		return &p, nil
	}
}

func (r *PacienteRepository) Create(ctx context.Context, p models.Paciente) error {
	query := `
        INSERT INTO pacientes (
            nome_completo, nome_mae, apelido, cpf, senha, data_nascimento,
            idade, logradouro, numero, complemento, bairro, municipio, uf,
            cep, telefone, ponto_referencia, escolaridade, cartao_sus,
            raca_cor, nacionalidade, ubs_id, created_at
        ) VALUES (
            $1, $2, $3, $4, $5, $6,
            $7, $8, $9, $10, $11, $12, $13,
            $14, $15, $16, $17, $18,
            $19, $20, $21, $22
        )
    `

	res, err := r.db.DB.ExecContext(ctx, query,
		p.Nome_completo, p.Nome_mae, p.Apelido, p.Cpf, p.Senha, p.Data_nascimento,
		p.Idade, p.Logradouro, p.Numero, p.Complemento, p.Bairro, p.Municipio, p.Uf,
		p.Cep, p.Telefone, p.Ponto_referencia, p.Escolaridade, p.Cartao_sus,
		p.Raca_cor, p.Nacionalidade, p.Ubs_id, time.Now())
	if err != nil {
		log.Printf("Erro ao executar INSERT para paciente: %v", err)
		return err
	}
	if rowsAffected, err := res.RowsAffected(); err != nil {
		log.Printf("Erro ao verificar após inserir paciente: %v", err)
	} else {
		log.Printf("Paciente inserido com sucesso. Linhas afetadas: %d", rowsAffected)
	}

	return nil
}

func (r *PacienteRepository) DeletePatientByID(id int) (int64, error) {
	query := `DELETE FROM pacientes WHERE id = $1`
	res, err := r.db.DB.Exec(query, id)

	if err != nil {
		log.Printf("Erro ao executar a query de deleção para o id %d: %v", id, err)
		return 0, err
	}

	rowsAffected, err := res.RowsAffected()
	if err != nil {
		log.Printf("Erro ao obter linhas afetadas: %v", err)
		return 0, err
	}

	return rowsAffected, nil
}

func (r *PacienteRepository) UptadePatient(id int, ctx context.Context, p models.Paciente) error {
	query := ` 
	
	UPDATE pacientes
	SET nome_completo = $1, 
		nome_mae = $2, 
		apelido = $3, 
		data_nascimento = $4, 
		logradouro = $5, 
		numero  = $6, 
		complemento = $7, 
		bairro = $8, 
		municipio = $9, 
		uf = $10,
		cep = $11, 
		telefone = $12, 
		ponto_referencia = $13, 
		escolaridade = $14, 
		cartao_sus = $15,
		raca_cor = $16, 
		nacionalidade = $17, 
		ubs_id = $18
	WHERE id = $19
	`

	res, err := r.db.DB.ExecContext(ctx, query,
		p.Nome_completo, p.Nome_mae, p.Apelido, p.Data_nascimento, p.Logradouro,
		p.Numero, p.Complemento, p.Bairro, p.Municipio, p.Uf,
		p.Cep, p.Telefone, p.Ponto_referencia, p.Escolaridade, p.Cartao_sus,
		p.Raca_cor, p.Nacionalidade, p.Ubs_id, id)

	if err != nil {
		log.Printf("Erro ao executar UPTADE para paciente: %v", err)
		return err
	}
	if rowsAffected, err := res.RowsAffected(); err != nil {
		log.Printf("Erro ao verificar após inserir paciente: %v", err)
	} else {
		log.Printf("Paciente inserido com sucesso. Linhas afetadas: %d", rowsAffected)
	}

	return nil
}
