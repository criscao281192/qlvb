package mysql

import (
	"context"
	"qlvb-server/service"
	"qlvb-server/service/entity"

	"gorm.io/gorm"
)

type mysqlAuthRepo struct {
	db *gorm.DB
}

func NewMySQLAuthRepo(db *gorm.DB) service.IAuthRepository {
	return mysqlAuthRepo{db: db}
}

var userTableName = "user_logins"

func (repo mysqlAuthRepo) FindUser(ctx context.Context, username string, id int) (entity.User, error) {
	var user entity.User

	whereCon := map[string]interface{}{
		"username": username,
	}

	if id != 0 {
		whereCon["id"] = id
	}

	if err := repo.db.Table(userTableName).
		Where(whereCon).First(&user).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return entity.User{}, entity.ErrNotFound
		}

		return entity.User{}, err
	}

	return user, nil
}

func (repo mysqlAuthRepo) InsertUser(ctx context.Context, user entity.User) error {
	return repo.db.Create(&user).Error
}

func (repo mysqlAuthRepo) CheckUser(ctx context.Context, username string) (entity.User, error) {
	var user entity.User

	repo.db = repo.db.Debug()

	if err := repo.db.Table(userTableName).
		Where(map[string]interface{}{
			"username": username,
		}).First(&user).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return entity.User{}, entity.ErrNotFound
		}

		return entity.User{}, err
	}

	return user, nil
}
