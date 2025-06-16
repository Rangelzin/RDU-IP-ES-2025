package repositories

import (
	"backend/database"
	"backend/models"

	"github.com/gin-gonic/gin"
	"log"

)

type UserRepository struct {
	db *database.DatabaseCliente
}

func NewUserRepository(db *database.DatabaseCliente) *UserRepository {
	return &UserRepository{db: db}
}

func (r *UserRepository) FindAllUsers() (*[]models.Users, error) {
	rows, err := r.db.DB.Query("SELECT * FROM users ORDER BY nome;")
	if err != nil{
		return nil, err
	}
	defer rows.Close()

	var users []models.Users
	for rows.Next() {
		var u models.Users
		if err := rows.Scan(
			&u.Id,
			&u.Nome,
			&u.CPF,
			&u.Crm,
			&u.Email,
			&u.Senha,
			&u.Role,
			&u.Ubs_id,
			&u.Created_at); 
			err != nil {return nil, err}
		users = append(users, u)
	}

	return &users, nil
}

func (r *UserRepository) InsertUser(c *gin.Context, user *models.Users) error {
	query := `INSERT INTO users (nome, cpf, crm, email, senha, role, ubs_id) VALUES ($1, $2, $3, $4, $5, $6, $7)`
	ctx := c.Request.Context()

	res, err := r.db.DB.ExecContext(ctx, query, user.Nome, user.CPF, user.Crm, user.Email, user.Senha, user.Role, user.Ubs_id)
	if err != nil {
		log.Println("Erro no ExecContext: ", err)
	}

	if res != nil {
		if rowsaffected, err := res.RowsAffected(); err != nil {
			log.Println("Linhas Afetadas: ", rowsaffected)
		}
	}
	
	return err
}

func (r *UserRepository) DeleteUser(id int) (int64, error) {
    query := `DELETE FROM users WHERE id = $1`

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