package httpapi

import (
	"net/http"
	"qlvb-server/service"

	"github.com/gin-gonic/gin"
)

type TimVanBanDenRequest struct {
	LoaiTaiLieuID   string `json:"loai_tai_lieu_id"`
	VanBanDenID     string `json:"van_ban_den_id"`
	VanBanDenSo     string `json:"van_ban_den_so"`
	TenDonVi        string `json:"ten_don_vi"`
	SoVanBan        string `json:"so_van_ban"`
	NgayBanHanh1    string `json:"ngay_ban_hanh_1"`
	NgayBanHanh2    string `json:"ngay_ban_hanh_2"`
	NgayTiepNhan1   string `json:"ngay_tiep_nhan_1"`
	NgayTiepNhan2   string `json:"ngay_tiep_nhan_2"`
	DoMat           string `json:"do_mat"`
	DoKhan          string `json:"do_khan"`
	NoiDungVanBan   string `json:"noi_dung_van_ban"`
	NgayHetHan1     string `json:"ngay_het_han_1"`
	NgayHetHan2     string `json:"ngay_het_han_2"`
	NoiNhan         string `json:"noi_nhan"`
	TrangThaiVanBan string `json:"trang_thai_van_ban"`
}

type caseApiController struct {
	service service.ICaseUseCase
}

func NewCaseAPIController(s service.ICaseUseCase) caseApiController {
	return caseApiController{service: s}
}

func (api caseApiController) timVanBanDen() func(c *gin.Context) {
	return func(c *gin.Context) {
		var req TimVanBanDenRequest

		if err := c.ShouldBindJSON(&req); err != nil {
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		result, err := api.service.FindVanBanDen(c.Request.Context())
		if err != nil {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, result)
	}
}

func (api caseApiController) timVanBanDi() func(c *gin.Context) {
	return func(c *gin.Context) {
		// result, err := api.service.FetchHistories(c.Request.Context())

		// if err != nil {
		// 	c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		// 	return
		// }

		c.JSON(http.StatusOK, gin.H{"message": "Tìm văn bản đi"})
	}
}

func (api caseApiController) download() func(c *gin.Context) {
	return func(c *gin.Context) {
		// result, err := api.service.FetchHistories(c.Request.Context())

		// if err != nil {
		// 	c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		// 	return
		// }

		c.JSON(http.StatusOK, gin.H{"message": "Download"})
	}
}

func (api caseApiController) countVanBanDen() func(c *gin.Context) {
	return func(c *gin.Context) {
		// result, err := api.service.FetchHistories(c.Request.Context())

		// if err != nil {
		// 	c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		// 	return
		// }

		c.JSON(http.StatusOK, gin.H{"message": "Count văn bản đến"})
	}
}

func (api caseApiController) countVanBanDenFor12Months() func(c *gin.Context) {
	return func(c *gin.Context) {
		// result, err := api.service.FetchHistories(c.Request.Context())

		// if err != nil {
		// 	c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		// 	return
		// }

		c.JSON(http.StatusOK, gin.H{"message": "Count văn bản đến for 12 months"})
	}
}

func (api caseApiController) countVanBanDenForComparison() func(c *gin.Context) {
	return func(c *gin.Context) {
		// result, err := api.service.FetchHistories(c.Request.Context())

		// if err != nil {
		// 	c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		// 	return
		// }

		c.JSON(http.StatusOK, gin.H{"message": "Count văn bản đến for comparison"})
	}
}

func (api caseApiController) countVanBanDenForRecentDays() func(c *gin.Context) {
	return func(c *gin.Context) {
		// result, err := api.service.FetchHistories(c.Request.Context())

		// if err != nil {
		// 	c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		// 	return
		// }

		c.JSON(http.StatusOK, gin.H{"message": "Count văn bản đến for recent days"})
	}
}

func (api caseApiController) countVanBanDi() func(c *gin.Context) {
	return func(c *gin.Context) {
		// result, err := api.service.FetchHistories(c.Request.Context())

		// if err != nil {
		// 	c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		// 	return
		// }

		c.JSON(http.StatusOK, gin.H{"message": "Count văn bản đi"})
	}
}

func (api caseApiController) countVanBanDiFor12Months() func(c *gin.Context) {
	return func(c *gin.Context) {
		// result, err := api.service.FetchHistories(c.Request.Context())

		// if err != nil {
		// 	c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		// 	return
		// }

		c.JSON(http.StatusOK, gin.H{"message": "Count văn bản đi for 12 months"})
	}
}

func (api caseApiController) countVanBanDiForComparison() func(c *gin.Context) {
	return func(c *gin.Context) {
		// result, err := api.service.FetchHistories(c.Request.Context())

		// if err != nil {
		// 	c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		// 	return
		// }

		c.JSON(http.StatusOK, gin.H{"message": "Count văn bản đi for comparison"})
	}
}

func (api caseApiController) laysoVanBanDen() func(c *gin.Context) {
	return func(c *gin.Context) {
		// result, err := api.service.FetchHistories(c.Request.Context())

		// if err != nil {
		// 	c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		// 	return
		// }

		c.JSON(http.StatusOK, gin.H{"message": "Lấy số văn bản đến"})
	}
}

func (api caseApiController) laysoVanBanDi() func(c *gin.Context) {
	return func(c *gin.Context) {
		// result, err := api.service.FetchHistories(c.Request.Context())

		// if err != nil {
		// 	c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		// 	return
		// }

		c.JSON(http.StatusOK, gin.H{"message": "Lấy số văn bản đi"})
	}
}

func (api caseApiController) bangVanBanDenHan() func(c *gin.Context) {
	return func(c *gin.Context) {
		// result, err := api.service.FetchHistories(c.Request.Context())

		// if err != nil {
		// 	c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		// 	return
		// }

		c.JSON(http.StatusOK, gin.H{"message": "Bảng văn bản đến hạn"})
	}
}

func (api caseApiController) bangVanBanDen() func(c *gin.Context) {
	return func(c *gin.Context) {
		// result, err := api.service.FetchHistories(c.Request.Context())

		// if err != nil {
		// 	c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		// 	return
		// }

		c.JSON(http.StatusOK, gin.H{"message": "Bảng văn bản đến"})
	}
}

func (api caseApiController) bangVanBanBanHanh() func(c *gin.Context) {
	return func(c *gin.Context) {
		// result, err := api.service.FetchHistories(c.Request.Context())

		// if err != nil {
		// 	c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		// 	return
		// }

		c.JSON(http.StatusOK, gin.H{"message": "Bảng văn bản ban hành"})
	}
}

func (api caseApiController) getCase() func(c *gin.Context) {
	return func(c *gin.Context) {
		// result, err := api.service.FetchHistories(c.Request.Context())

		// if err != nil {
		// 	c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		// 	return
		// }

		c.JSON(http.StatusOK, gin.H{"message": "Get case"})
	}
}

func (api caseApiController) createCase() func(c *gin.Context) {
	return func(c *gin.Context) {
		// result, err := api.service.FetchHistories(c.Request.Context())

		// if err != nil {
		// 	c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		// 	return
		// }

		c.JSON(http.StatusOK, gin.H{"message": "Create case"})
	}
}

func (api caseApiController) deleteCase() func(c *gin.Context) {
	return func(c *gin.Context) {
		// result, err := api.service.FetchHistories(c.Request.Context())

		// if err != nil {
		// 	c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		// 	return
		// }

		c.JSON(http.StatusOK, gin.H{"message": "Delete case"})
	}
}

func (api caseApiController) SetUpRoute(group *gin.RouterGroup) {
	group.GET("/timVanBanDen", api.timVanBanDen())
	group.GET("/timVanBanDi", api.timVanBanDi())
	group.GET("/download", api.download())
	group.GET("/countVanBanDen", api.countVanBanDen())
	group.GET("/countVanBanDenFor12Months", api.countVanBanDenFor12Months())
	group.GET("/countVanBanDenForComparison", api.countVanBanDenForComparison())
	group.GET("/countVanBanDenForRecentDays", api.countVanBanDenForRecentDays())
	group.GET("/countVanBanDi", api.countVanBanDi())
	group.GET("/countVanBanDiFor12Months", api.countVanBanDiFor12Months())
	group.GET("/countVanBanDiForComparison", api.countVanBanDiForComparison())
	group.GET("/laysoVanBanDen", api.laysoVanBanDen())
	group.GET("/laysoVanBanDi", api.laysoVanBanDi())
	group.GET("/bangVanBanDenHan", api.bangVanBanDenHan())
	group.GET("/bangVanBanDen", api.bangVanBanDen())
	group.GET("/bangVanBanBanHanh", api.bangVanBanBanHanh())
	group.GET("/getCase", api.getCase())
	group.POST("/createCase", api.createCase())
	group.DELETE("/deleteCase", api.deleteCase())
}
