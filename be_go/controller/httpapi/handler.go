package httpapi

import (
	"qlvb-server/service"

	"github.com/gin-gonic/gin"
)

type apiController struct {
	service service.TranslateUseCase
}

func NewAPIController(s service.TranslateUseCase) apiController {
	return apiController{service: s}
}

func (api apiController) SetUpRoute(group *gin.RouterGroup) {

	configGroup := group.Group("/config")
	configGroup.GET("/", api.getConfigs())

	group.POST("/translate", api.translate())
	group.GET("/histories", api.history())
}
