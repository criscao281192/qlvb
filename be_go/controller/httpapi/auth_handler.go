package httpapi

import (
	"fmt"
	"net/http"
	"qlvb-server/service"
	"qlvb-server/service/entity"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

var jwtSecret = []byte("qlvb_secret_key")

type authApiController struct {
	service service.IAuthUseCase
}

func NewAuthAPIController(s service.IAuthUseCase) authApiController {
	return authApiController{service: s}
}

type WhoAmIRequestBody struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func HashPassword(password string) (string, error) {
	hashedBytes, err := bcrypt.GenerateFromPassword([]byte(password), 10)
	return string(hashedBytes), err
}

// GenerateJWT generates a new JWT token
func GenerateJWT(username string) (string, error) {
	// Define claims (payload)
	claims := jwt.MapClaims{
		"username": username,                             // Custom claim
		"exp":      time.Now().Add(time.Hour * 2).Unix(), // Token expires in 2 hours
	}

	// Create the token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Sign the token with the secret key
	tokenString, err := token.SignedString(jwtSecret)
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

func (api authApiController) whoami() func(c *gin.Context) {
	return func(c *gin.Context) {
		ctx := c.Request.Context()
		var requestBody WhoAmIRequestBody
		if err := c.ShouldBindJSON(&requestBody); err != nil {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
				"message": "ĐÃ XẢY RA LỖI.",
			})
			return
		}

		result, err := api.service.CheckUser(ctx, requestBody.Username)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"message": "TÀI KHOẢN KHÔNG TỒN TẠI.",
			})
			return
		}

		if bcrypt.CompareHashAndPassword([]byte(result.Password), []byte(requestBody.Password)) != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"message": "MẬT KHẨU KHÔNG ĐÚNG.",
			})
			return
		}

		if result.PhanQuyen == "1" {
			token, err := GenerateJWT("testuser")
			if err != nil {
				fmt.Println("Error generating token:", err)
				return
			}

			c.JSON(http.StatusOK, gin.H{
				"success": true,
				"message": "XIN CHÀO! BẠN ĐÃ ĐĂNG NHẬP THÀNH CÔNG",
				"token":   token,
			})
			return
		}

		c.JSON(http.StatusUnauthorized, gin.H{"message": "BẠN CHƯA ĐƯỢC CẤP QUYỀN ĐĂNG NHẬP"})
	}
}

func (api authApiController) register() func(c *gin.Context) {
	return func(c *gin.Context) {
		var user entity.User

		if err := c.ShouldBindJSON(&user); err != nil {
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		err := api.service.Register(c.Request.Context(), user)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "Register"})
	}
}

type CheckUserRequestBody struct {
	Username string `json:"username"`
	ID       int    `json:"id"`
}

func (api authApiController) checkUser() func(c *gin.Context) {
	return func(c *gin.Context) {
		ctx := c.Request.Context()
		var requestBody CheckUserRequestBody
		if err := c.ShouldBindJSON(&requestBody); err != nil {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
				"error": "XẢY RA LỖI.",
			})

			return
		}
		_, err := api.service.FindUser(ctx, requestBody.Username, requestBody.ID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "XẢY RA LỖI.",
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"result": true,
		})
	}
}

func (api authApiController) SetUpRoute(group *gin.RouterGroup) {
	group.POST("/whoami", api.whoami())
	group.POST("/register", api.register())
	group.GET("/checkUser", api.checkUser())
}
