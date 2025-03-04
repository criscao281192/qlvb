package main

import (
	"log"
	"net/http"
	"os"
	"qlvb-server/controller/httpapi"
	mysqlRepo "qlvb-server/infras/mysql"
	"qlvb-server/service"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	db, err := connectDBWithRetry(5)

	if err != nil {
		log.Fatalln(err)
	}

	// Setup Dependencies
	// repository := mysqlRepo.NewMySQLRepo(db)
	// googleTranslate := googlesv.New()
	// translateService := service.NewService(repository, googleTranslate)
	// controller := httpapi.NewAPIController(translateService)

	engine := gin.Default()

	engine.Static("/static", "./public/static")
	engine.LoadHTMLGlob("public/*.html")
	engine.GET("/", func(c *gin.Context) {
		c.Header("Content-Type", "text/html")
		c.HTML(http.StatusOK, "index.html", gin.H{})
	})

	engine.Use(cors.Default())

	authGroup := engine.Group("/auth")
	authRepository := mysqlRepo.NewMySQLAuthRepo(db)
	authService := service.NewAuthService(authRepository)
	authController := httpapi.NewAuthAPIController(authService)
	authController.SetUpRoute(authGroup)

	apiGroup := engine.Group("/api")

	v1Group := apiGroup.Group("/v1")
	caseRepository := mysqlRepo.NewMySQLCaseRepo(db)
	caseService := service.NewCaseService(caseRepository)
	caseController := httpapi.NewCaseAPIController(caseService)
	caseController.SetUpRoute(v1Group)

	if err := engine.Run(":8000"); err != nil {
		log.Fatalln(err)
	}

}

func connectDBWithRetry(times int) (*gorm.DB, error) {
	var e error

	for i := 1; i <= times; i++ {
		dsn := os.Getenv("DB_DSN")
		db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

		if err == nil {
			return db, nil
		}

		e = err

		time.Sleep(time.Second * 2)
	}

	return nil, e
}
