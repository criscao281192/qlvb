package mysql

import (
	"context"
	"qlvb-server/service"
	"qlvb-server/service/entity"

	"gorm.io/gorm"
)

type mysqlCaseRepo struct {
	db *gorm.DB
}

func NewMySQLCaseRepo(db *gorm.DB) service.ICaseRepository {
	return mysqlCaseRepo{db: db}
}

var taiLieuTableName = "tai_lieus"

func (repo mysqlCaseRepo) FindVanBanDen(ctx context.Context) ([]entity.TaiLieu, error) {
	var taiLieus []entity.TaiLieu

	if err := repo.db.Table(taiLieuTableName).
		Find(&taiLieus).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return []entity.TaiLieu{}, entity.ErrNotFound
		}

		return []entity.TaiLieu{}, err
	}

	return taiLieus, nil
}
