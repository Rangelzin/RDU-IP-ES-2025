package repositories

import (
	"backend/database"
	"backend/models"
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
