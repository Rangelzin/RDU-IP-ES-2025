package repositories

import (
	"backend/database"
	"backend/models"
	"context"
	"database/sql"
	"fmt"
	"log"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/lib/pq"
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

func (r *ExamRepository) InsertAnamnese(c *gin.Context, anamnese *models.Etapa01Anamnese) error {
	query := `INSERT INTO etapa01_anamnese (
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

func (r *ExamRepository) InsertClinico(c *gin.Context, clinico *models.Etapa02Clinico) error {
	query := `
	INSERT INTO etapa2_clinico (exame_id, responsavel_id, inspeção_colo,sinais_dst, data_coleta, created_at) 
	VALUES ($1, $2, $3, $4, $5, $6)
	`

	ctx := c.Request.Context()

	res, err := r.db.DB.ExecContext(ctx, query,
		clinico.Exame_id,
		clinico.Responsavel_id,
		clinico.Inspecao_colo,
		clinico.Sinais_dst,
		clinico.Data_coleta,
		clinico.Created_at,
	)

	if err != nil {
        if pgErr, ok := err.(*pq.Error); ok {    
            if pgErr.Code == "23505" {
                return fmt.Errorf("conflito: etapa clínica já existe para este exame")
            }
        }
        log.Println("Erro no ExecContext: ", err)
        return err
	}
	
	if rowsAffected, err := res.RowsAffected(); err == nil {
		log.Println("Linhas afetadas:", rowsAffected)
	}
	return nil
}

func (r *ExamRepository) InsertLaboratorio(c *gin.Context, lab *models.Etapa03Lab) error {
	query := `INSERT INTO etapa3_laboratorio (
		exame_id, responsavel_id, laboratorio_nome, laboratorio_cnes, numero_exame, recebido_em
	) VALUES ($1, $2, $3, $4, $5, $6)`

	ctx := c.Request.Context()

	res, err := r.db.DB.ExecContext(ctx, query,
		lab.Exame_id,
		lab.Responsavel_id,
		lab.Laboratorio_nome,
		lab.Laboratorio_cnes,
		lab.Numero_exame,
		lab.Recebido_em,
	)

	if err != nil {
		log.Println("Erro no ExecContext para laboratório: ", err)
		return err
	}

	if rowsAffected, err := res.RowsAffected(); err == nil {
		log.Println("Linhas afetadas em etapa3_laboratorio:", rowsAffected)
	}

	return nil
}

func (r *ExamRepository) InsertResultado(c *gin.Context, res *models.Etapa04Resultado) error {
	query := `INSERT INTO etapa4_resultado (
		exame_id, responsavel_id, amostra_rejeitada, epitelios_representados, adequabilidade_material,
		insatisfatoria_por, dentro_limites_normalidade, alteracao_celulas_benignas, microbiologia,
		celulas_atipicas_significado_indeterminado, atipias_celulas_escamosas, atipias_celulas_glandulares,
		outras_neoplasias_malignas, celulas_endometriais_pos_menopausa_ou_mais40, observacoes_gerais,
		screening_citotecnico, responsavel, data_resultado
	) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)`

	ctx := c.Request.Context()

	_, err := r.db.DB.ExecContext(ctx, query,
		res.Exame_id,
		res.Responsavel_id,
		res.Amostra_rejeitada,
		res.Epitelios_representados,
		res.Adequabilidade_material,
		res.Insatisfatoria_por,
		res.Dentro_limites_normalidade,
		res.Alteracao_celulas_benignas,
		res.Microbiologia,
		res.Celulas_atipicas_significado_indeterminado,
		res.Atipias_celulas_escamosas,
		res.Atipias_celulas_glandulares,
		res.Outras_neoplasias_malignas,
		res.Celulas_endometriais_pos_menopausa_ou_mais40,
		res.Observacoes_gerais,
		res.Screening_citotecnico,
		res.Responsavel,
		res.Data_resultado,
	)

	if err != nil {
		log.Println("Erro no ExecContext para resultado: ", err)
		return err
	}

	return nil
}