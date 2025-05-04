package service

import (
	"context"
	"qlvb-server/service/entity"
)

type ICaseUseCase interface {
	FindVanBanDen(ctx context.Context) ([]entity.TaiLieu, error)
}

type ICaseService interface {
	FindVanBanDen(ctx context.Context) ([]entity.TaiLieu, error)
}

type ICaseRepository interface {
	FindVanBanDen(ctx context.Context) ([]entity.TaiLieu, error)
}

type caseservice struct {
	repository ICaseRepository
}

func NewCaseService(repository ICaseRepository) caseservice {
	return caseservice{repository: repository}
}

func (s caseservice) FindVanBanDen(ctx context.Context) ([]entity.TaiLieu, error) {
	return s.repository.FindVanBanDen(ctx)
}
