package httpapi

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func (api apiController) getConfigs() func(c *gin.Context) {
	return func(c *gin.Context) {
		result, err := api.service.FetchHistories(c.Request.Context())

		if err != nil {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, result)
	}
}
