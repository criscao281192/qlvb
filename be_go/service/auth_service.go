package service

import (
	"context"
	"qlvb-server/service/entity"
)

type IAuthUseCase interface {
	FindUser(ctx context.Context, username string, id int) (entity.User, error)
	Register(ctx context.Context, user entity.User) error
	CheckUser(ctx context.Context, username string) (entity.User, error)
}

type IAuthService interface {
	FindUser(ctx context.Context, username string, id int) (entity.User, error)
	Register(ctx context.Context, user entity.User) error
	CheckUser(ctx context.Context, username string) (entity.User, error)
}

type IAuthRepository interface {
	FindUser(ctx context.Context, username string, id int) (entity.User, error)
	InsertUser(ctx context.Context, user entity.User) error
	CheckUser(ctx context.Context, username string) (entity.User, error)
}

type authservice struct {
	repository IAuthRepository
}

func NewAuthService(repository IAuthRepository) authservice {
	return authservice{repository: repository}
}

func (s authservice) FindUser(ctx context.Context, username string, id int) (entity.User, error) {
	return s.repository.FindUser(ctx, username, id)
}

func (s authservice) Register(ctx context.Context, user entity.User) error {
	return s.repository.InsertUser(ctx, user)
}

func (s authservice) CheckUser(ctx context.Context, username string) (entity.User, error) {
	return s.repository.CheckUser(ctx, username)
}
