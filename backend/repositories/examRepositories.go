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
	query := `INSERT INTO etapa1_anamnese (
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

func (r *ExamRepository) FindAnamneseByExamID(ctx context.Context, examID int) (*models.Etapa01Anamnese, error) {
	query := `
		SELECT 
			a.id, a.exame_id, a.responsavel_id, u.nome, u.cpf, a.motivo_exame, 
			a.fez_preventivo, a.ano_ultimo_exame, a.usa_diu, a.gravida, a.usa_pilula, 
			a.usa_hormonio, a.radioterapia, a.ultima_menstruacao, a.sangramento_relacao, 
			a.sangramento_menopausa, a.created_at
		FROM etapa1_anamnese a
		INNER JOIN users u ON a.responsavel_id = u.id
		WHERE a.exame_id = $1`

	var anamnese models.Etapa01Anamnese
	err := r.db.DB.QueryRowContext(ctx, query, examID).Scan(
		&anamnese.Id, 
		&anamnese.Exame_id,
		&anamnese.NomeResponsavel,
		&anamnese.CpfResponsavel,
		&anamnese.Responsavel_id,
		&anamnese.Motivo_exame,
		&anamnese.Fez_preventivo,
		&anamnese.Ano_ultimo_exame,
		&anamnese.Usa_diu,
		&anamnese.Gravida,
		&anamnese.Usa_pilula,
		&anamnese.Usa_hormonio,
		&anamnese.Radioterapia,
		&anamnese.Ultima_menstruacao,
		&anamnese.Sangramento_relacao,
		&anamnese.Sangramento_menopausa,
		&anamnese.Created_at,
	)
	if err != nil {
		return nil, err
	}
	return &anamnese, nil
}

func (r *ExamRepository) FindClinicoByExamID(ctx context.Context, examID int) (*models.Etapa02Clinico, error) {
	query := `
		SELECT 
			c.id, c.exame_id, c.responsavel_id, u.nome, u.cpf, c.inspecao_colo, 
			c.sinais_dst, c.data_coleta, c.created_at
		FROM etapa2_clinico c
		INNER JOIN users u ON c.responsavel_id = u.id
		WHERE c.exame_id = $1`


	var clinico models.Etapa02Clinico
	err := r.db.DB.QueryRowContext(ctx, query, examID).Scan(
		&clinico.Id,
		&clinico.Exame_id,
		&clinico.Responsavel_id,
		&clinico.NomeResponsavel,
		&clinico.CpfResponsavel,
		&clinico.Inspecao_colo,
		&clinico.Sinais_dst,
		&clinico.Data_coleta,
		&clinico.Created_at,
	)
	if err != nil {
		return nil, err
	}
	return &clinico, nil
}

func (r *ExamRepository) FindLaboratorioByExamID(ctx context.Context, examID int) (*models.Etapa03Lab, error) {
	query := `
		SELECT 
			l.id, l.exame_id, l.responsavel_id, 
			u.nome AS nome_responsavel, u.cpf AS cpf_responsavel, -- Renomeado com AS
			l.laboratorio_nome, l.laboratorio_cnes, l.numero_exame, l.recebido_em, l.created_at
		FROM etapa3_laboratorio l
		INNER JOIN users u ON l.responsavel_id = u.id
		WHERE l.exame_id = $1`


	var lab models.Etapa03Lab
	err := r.db.DB.QueryRowContext(ctx, query, examID).Scan(
		&lab.Id,
		&lab.Exame_id,
		&lab.Responsavel_id,
		&lab.NomeResponsavel,
		&lab.CpfResponsavel,
		&lab.Laboratorio_nome,
		&lab.Laboratorio_cnes,
		&lab.Numero_exame,
		&lab.Recebido_em,
		&lab.Created_at,
	)
	if err != nil {
		return nil, err
	}
	return &lab, nil
}

func (r *ExamRepository) FindResultadoByExamID(ctx context.Context, examID int) (*models.Etapa04Resultado, error) {
	query := `
		SELECT 
			r.id, r.exame_id, r.responsavel_id, 
			u.nome AS nome_responsavel, u.cpf AS cpf_responsavel, -- Renomeado com AS
			r.amostra_rejeitada, r.epitelios_representados, r.adequabilidade_material, 
			r.insatisfatoria_por, r.dentro_limites_normalidade, r.alteracao_celulas_benignas, 
			r.microbiologia, r.celulas_atipicas_significado_indeterminado, r.atipias_celulas_escamosas, 
			r.atipias_celulas_glandulares, r.outras_neoplasias_malignas,
			r.celulas_endometriais_pos_menopausa_ou_mais40, r.observacoes_gerais, 
			r.screening_citotecnico, r.responsavel, r.data_resultado, r.created_at
		FROM etapa4_resultado r
		INNER JOIN users u ON r.responsavel_id = u.id
		WHERE r.exame_id = $1`

	var res models.Etapa04Resultado
	err := r.db.DB.QueryRowContext(ctx, query, examID).Scan(
		&res.Id,
		&res.Exame_id,
		&res.Responsavel_id,
		&res.NomeResponsavel,
		&res.CpfResponsavel,
		&res.Amostra_rejeitada,
		&res.Epitelios_representados,
		&res.Adequabilidade_material,
		&res.Insatisfatoria_por,
		&res.Dentro_limites_normalidade,
		&res.Alteracao_celulas_benignas,
		&res.Microbiologia,
		&res.Celulas_atipicas_significado_indeterminado,
		&res.Atipias_celulas_escamosas,
		&res.Atipias_celulas_glandulares,
		&res.Outras_neoplasias_malignas,
		&res.Celulas_endometriais_pos_menopausa_ou_mais40,
		&res.Observacoes_gerais,
		&res.Screening_citotecnico,
		&res.Responsavel,
		&res.Data_resultado,
		&res.Created_at,
	)
	if err != nil {
		return nil, err
	}
	return &res, nil
}