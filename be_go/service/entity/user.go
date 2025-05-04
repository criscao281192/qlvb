package entity

type User struct {
	UserName  string `json:"username" gorm:"unique;not null;column:username"`
	Password  string `json:"password" gorm:"not null;column:password"`
	FullName  string `json:"fullname" gorm:"column:fullname"`
	ChucVu    string `json:"chuc_vu" gorm:"column:chuc_vu"`
	DonVi     string `json:"don_vi" gorm:"column:don_vi"`
	PhanQuyen string `json:"phan_quyen" gorm:"column:phan_quyen"`
	PhoneUser string `json:"phoneuser" gorm:"column:phoneuser"`
}
